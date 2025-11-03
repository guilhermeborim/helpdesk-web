import CallCreate from "@/contexts/call/components/call-client-create";
import CallTableClient from "@/contexts/call/components/call-table-client";
import HeaderPages from "../../components/header-pages";

export default function PageClientCall() {
  return (
    <main className="md:px-12 px-6">
      <HeaderPages title="Meus chamados">
        <CallCreate />
      </HeaderPages>
      <CallTableClient />
    </main>
  );
}
