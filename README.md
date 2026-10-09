# HelpDesk Web

Aplicação web de **gerenciamento de chamados de suporte**, com interface própria para três perfis: **Administrador, Técnico e Cliente**. Consome a mesma API REST usada pelo aplicativo mobile.

> **Demo online:** [helpdesk-web-sage.vercel.app](https://helpdesk-web-sage.vercel.app/)
> Na tela de login, use os botões **Entrar como Admin / Técnico / Cliente** para explorar sem cadastro.
> A API fica no plano gratuito do Render e "dorme" por inatividade. O primeiro login pode levar cerca de 1 minuto.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

## Ecossistema

| Repositório | Descrição |
|---|---|
| [helpdesk-web](https://github.com/guilhermeborim/helpdesk-web) | Esta aplicação |
| [helpdesk-api](https://github.com/guilhermeborim/helpdesk-api) | API REST (Fastify + Prisma + PostgreSQL) |
| [helpdesk-app](https://github.com/guilhermeborim/helpdesk-app) | Aplicativo mobile (React Native) |

## Funcionalidades

| Perfil | Rotas | O que faz |
|---|---|---|
| **Cliente** | `/cliente/chamados` | Abre chamados escolhendo um serviço e acompanha o status |
| **Técnico** | `/tecnico/chamados` | Vê os chamados atribuídos a ele e os conduz: **Iniciar** atendimento e **Encerrar** |
| **Administrador** | `/admin/chamados`, `/tecnicos`, `/clientes`, `/servicos` | Visão geral dos chamados, lista de técnicos e clientes e gestão do catálogo de serviços |

Também há login, cadastro, rotas protegidas por perfil e layout responsivo (tabelas se adaptam a telas pequenas).

## Regras de negócio refletidas na interface

- **Atribuição automática.** O cliente não escolhe técnico. A API sorteia um. Se não houver técnicos, a API recusa a abertura com "No momento não temos técnicos disponíveis."
- **Status só avança.** O técnico vê apenas a próxima ação possível: `Aberto` → **Iniciar** → `Em atendimento` → **Encerrar** → `Encerrado`. Chamados encerrados não têm ação, pois não são reabertos. A mesma regra é imposta no back-end, então a interface é conveniência e não a única barreira.
- **Só o técnico responsável atualiza o chamado.** A UI mostra a ação apenas na tabela do técnico, e a API valida de novo.
- **Preço congelado.** O valor exibido do chamado é o do momento da abertura, mesmo que o serviço mude depois.

## Decisões técnicas

**TanStack Query para dados do servidor.** Cache, estados de carregamento e invalidação ficam fora dos componentes. Após atualizar um status, a mutation invalida a query `call_tech` e a tabela se atualiza sozinha, sem estado duplicado.

**Uma query por perfil, ativada pelo `role` do token.** `useCall` mantém consultas separadas (`/calls`, `/calls/:sub`, `/calls/tech/:sub`) e cada uma só busca se o perfil bater. Um único hook serve às três telas.

**React Hook Form + Zod.** Formulários não controlados, com poucos re-renders. O schema Zod valida no cliente e dá os tipos TypeScript, mantendo o contrato consistente com o do back-end.

**TanStack Table.** Colunas declarativas, paginação pronta e células personalizadas, como a tag de status e a coluna de ação.

**Autenticação com JWT em cookie.** O `AuthProvider` faz o login, guarda o token em cookie (`secure`, `sameSite: strict`), decodifica com `jwt-decode` e injeta o `Authorization` no axios. O `ProtectedRoute` bloqueia rotas por perfil e a rota `/` redireciona para a área do perfil logado.

**Organização por domínio.** Cada contexto concentra seus componentes, hooks, modelos e schemas. Quem mexe em "chamados" encontra tudo no mesmo lugar.

```text
src/
├── contexts/
│   ├── call/  clients/  services/  sign/  signup/  tech/
│   │   ├── components/   # UI do domínio
│   │   ├── hooks/        # React Query (use-*.ts)
│   │   ├── models/       # tipos da API
│   │   └── schemas.ts    # Zod dos formulários
├── components/           # componentes genéricos; ui/ no estilo shadcn
├── pages/                # admin/, tech/, client/
├── layouts/              # um layout por perfil
├── routes/               # ProtectedRoute
├── helpers/api.ts        # axios + fetcher
└── lib/utils.ts          # helper cn
```

**Tailwind v4 + Tailwind Variants.** Componentes reutilizáveis (botões, tags, textos) com variantes tipadas, em vez de classes repetidas. Os ícones SVG viram componentes via `vite-plugin-svgr`.

**Radix UI (AlertDialog).** Modais acessíveis, com foco e teclado tratados.

## Executando localmente

**Pré-requisitos:** Node.js, Yarn e a [API](https://github.com/guilhermeborim/helpdesk-api) rodando.

```bash
git clone https://github.com/guilhermeborim/helpdesk-web.git
cd helpdesk-web
yarn install
cp .env.example .env     # VITE_API_URL=http://localhost:3333
yarn dev
```

Com a API local populada pelo seed, os botões de demonstração do login funcionam. Os usuários do seed usam a senha `123456`.

### Scripts

| Script | O que faz |
|---|---|
| `yarn dev` | Servidor de desenvolvimento (Vite) |
| `yarn build` | Type-check (`tsc -b`) e build de produção |
| `yarn lint` | ESLint |
| `yarn preview` | Serve o build localmente |

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API. É lida **no build**, então precisa estar definida antes do deploy |

## Deploy

Hospedado na **Vercel**. O `vercel.json` reescreve todas as rotas para `index.html`, o que permite recarregar páginas como `/tecnico/chamados` sem 404 (SPA com React Router). Na Vercel, defina `VITE_API_URL` apontando para a API. No back-end, `CORS_ORIGIN` deve conter a URL do front.

## Limitações conhecidas e próximos passos

- **Sem testes automatizados.** Os próximos candidatos são testes de componentes e do fluxo de login.
- **Botões de login demo** usam credenciais fixas, só para demonstração.
- **Erro de abertura de chamado não aparece no formulário.** O hook já captura a mensagem da API (`error`), mas o modal de criação ainda não a exibe.
- **Bundle único de ~560 kB.** Dividir por rota com `React.lazy` melhoraria o carregamento inicial.
- **Erros de rede** mostram mensagem simples. Falta um estado de "tentando de novo" para o cold start do plano gratuito.

## Autor

**Guilherme Borim**

- [LinkedIn](https://www.linkedin.com/in/guilhermeborim)
- [GitHub](https://github.com/guilhermeborim)
