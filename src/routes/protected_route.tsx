import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/sign/hooks/use-auth";

interface ProtectedRouteProps {
  children: React.ReactNode; // aqui pode ser obrigatório
  requiredRoles?: string[];
  fallbackPath?: string;
}

export const ProtectedRoute = ({
  children,
  requiredRoles,
  fallbackPath = "/",
}: ProtectedRouteProps) => {
  const { token, decoded } = useAuth();

  if (!token) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (!decoded?.role) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (requiredRoles && !requiredRoles.includes(decoded.role)) {
    const dashboardPath =
      {
        ADMIN: "/admin",
        TECNICO: "/tecnico",
        CLIENTE: "/cliente",
      }[decoded.role] || "/";

    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};
