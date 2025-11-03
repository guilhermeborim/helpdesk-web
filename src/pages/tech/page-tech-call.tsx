import CallTableTech from "@/contexts/call/components/call-table-tech";
import HeaderPages from "../../components/header-pages";

export default function PageTechCall() {
  return (
    <main className="md:px-12 px-6">
      <HeaderPages title="Chamados" />
      <CallTableTech />
    </main>
  );
}
