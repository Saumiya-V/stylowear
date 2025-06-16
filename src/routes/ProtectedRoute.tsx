import { useAuth } from "@/context/authContext/AuthContext";
import { Navigate } from "@tanstack/react-router";
import React from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};
