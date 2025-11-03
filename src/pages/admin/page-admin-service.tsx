import ServiceCreate from "@/contexts/services/components/service-create";
import HeaderPages from "../../components/header-pages";
import ServiceTable from "../../contexts/services/components/service-table";

export default function PageAdminService() {
  return (
    <main className="md:px-12 px-6">
      <HeaderPages title="Serviços">
        <ServiceCreate />
      </HeaderPages>
      <ServiceTable />
    </main>
  );
}
