import React from "react";
import { Bell, Menu } from "lucide-react";

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* Ícono tipo hamburguesa (más adelante abrirá el menú lateral en mobile) */}
        <button className="inline-flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm border border-slate-100">
          <Menu className="w-5 h-5 text-slate-700" />
        </button>

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Hola, {username} 👋
          </h1>
          <p className="text-sm text-slate-500">
            Este es tu resumen del mes.
          </p>
        </div>
      </div>

      <button className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm border border-slate-100">
        <Bell className="w-5 h-5 text-slate-700" />
      </button>
    </header>
  );
};

export default Header;
