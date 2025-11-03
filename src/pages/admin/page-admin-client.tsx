import ClientTable from "@/contexts/clients/components/client-table";
import HeaderPages from "../../components/header-pages";

export default function PageAdminClient() {
  return (
    <main className="md:px-12 px-6">
      <HeaderPages title="Clientes" />
      <ClientTable />
    </main>
  );
}
