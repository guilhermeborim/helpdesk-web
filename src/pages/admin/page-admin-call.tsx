import CallTable from "@/contexts/call/components/call-table";
import HeaderPages from "../../components/header-pages";

export default function PageAdminCall() {
  return (
    <main className="md:px-12 px-6">
      <HeaderPages title="Chamados" />
      <CallTable />
    </main>
  );
}
