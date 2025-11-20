import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import UsuariosPage from "../features/usuarios/pages/UsuariosPage";
import CategoriasPage from "../features/categorias/pages/CategoriasPage";
import TransaccionesPage from "../features/transacciones/pages/TransaccionesPage";
import AuthPage from "../features/auth/pages/AuthPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<AuthPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        {/* Rutas con layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/transacciones" element={<TransaccionesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
