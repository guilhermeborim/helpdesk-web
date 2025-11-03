import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuth } from "./contexts/sign/hooks/use-auth";
import AdminLayout from "./layouts/admin-layout";
import ClientLayout from "./layouts/client-layout";
import TechLayout from "./layouts/tech-layout";
import PageAdminCall from "./pages/admin/page-admin-call";
import PageAdminClient from "./pages/admin/page-admin-client";
import PageAdminService from "./pages/admin/page-admin-service";
import PageAdminTech from "./pages/admin/page-admin-tech";
import PageClientCall from "./pages/client/page-client-call";
import PageLogin from "./pages/page-login";
import PageSignup from "./pages/page-signup";
import PageTechCall from "./pages/tech/page-tech-call";
import { ProtectedRoute } from "./routes/protected_route";

function App() {
  const { decoded, token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            token ? (
              <Navigate to={`/${decoded?.role?.toLowerCase()}`} replace />
            ) : (
              <PageLogin />
            )
          }
        />
        <Route path="/signup" element={<PageSignup />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRoles={["ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="chamados" replace />} />
          <Route path="chamados" element={<PageAdminCall />} />
          <Route path="tecnicos" element={<PageAdminTech />} />
          <Route path="clientes" element={<PageAdminClient />} />
          <Route path="servicos" element={<PageAdminService />} />
        </Route>

        <Route
          path="/tecnico/*"
          element={
            <ProtectedRoute requiredRoles={["TECNICO"]}>
              <TechLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="chamados" replace />} />
          <Route path="chamados" element={<PageTechCall />} />
        </Route>

        <Route
          path="/cliente/*"
          element={
            <ProtectedRoute requiredRoles={["CLIENTE"]}>
              <ClientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="chamados" replace />} />
          <Route path="chamados" element={<PageClientCall />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
