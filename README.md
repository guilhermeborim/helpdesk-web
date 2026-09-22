# HelpDesk Web

Aplicação web para gerenciamento de chamados, desenvolvida com **React e TypeScript** e voltada para três perfis de usuários: **Administrador, Técnico e Cliente**.

O HelpDesk é composto por uma API compartilhada e duas aplicações clientes: **Web e Mobile**. A versão Web consome a mesma API utilizada pelo aplicativo mobile.

## Funcionalidades

### Administrador
- Gerenciamento de chamados
- Gerenciamento de técnicos
- Gerenciamento de clientes

### Técnico
- Visualização de chamados atribuídos

### Cliente
- Abertura de novos chamados
- Acompanhamento do status dos chamados
- Visualização do histórico de chamados

### Geral
- Autenticação de usuários
- Controle de acesso por perfil
- Interface responsiva
- Integração com API REST
- Formulários com validação
- Componentes reutilizáveis

## Tecnologias

- React
- TypeScript
- React Query
- React Hook Form
- Zod
- Tailwind CSS
- Tailwind Variants

## Decisões técnicas

**React Query**  
Utilizado no gerenciamento das requisições e dos dados provenientes da API.

**React Hook Form + Zod**  
Utilizados no gerenciamento e validação dos formulários.

**Tailwind Variants**  
Utilizado na construção de componentes reutilizáveis com diferentes variações visuais.

**TypeScript**  
Utilizado para tipagem dos dados e maior segurança durante o desenvolvimento.

## Ecossistema HelpDesk

- **Web:** React + TypeScript
- **Mobile:** React Native + TypeScript
- **API:** Node.js + Fastify + TypeScript + PostgreSQL

## Repositórios

- [HelpDesk Web](https://github.com/guilhermeborim/helpdesk-web)
- [HelpDesk API](https://github.com/guilhermeborim/helpdesk-api)
- [HelpDesk Mobile](https://github.com/guilhermeborim/helpdesk-app)

## Executando o projeto

```bash
git clone https://github.com/guilhermeborim/helpdesk-web.git
cd helpdesk-web
npm install
npm run dev
```

## Autor

**Guilherme Borim**

- [LinkedIn](https://www.linkedin.com/in/guilhermeborim)
- [GitHub](https://github.com/guilhermeborim)
