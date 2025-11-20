import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar fijo en desktop (puedes ajustar dentro) */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          {/* Aquí se pintan Dashboard, Usuarios, etc. */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
