import TechCreate from "@/contexts/tech/components/tech-create";
import TechTable from "@/contexts/tech/components/tech-table";
import HeaderPages from "../../components/header-pages";

export default function PageAdminTech() {
  return (
    <main className="md:px-12 px-6">
      <HeaderPages title="Técnicos">
        <TechCreate />
      </HeaderPages>
      <TechTable />
    </main>
  );
}
