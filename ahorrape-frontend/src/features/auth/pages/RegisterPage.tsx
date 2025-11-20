import React from "react";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border border-slate-200 px-6 py-8">
        <h1 className="text-2xl font-semibold text-[#008080] mb-1">
          Crear cuenta
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Registra tus datos para comenzar a usar AhorraPe.
        </p>

        <form className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Nombre
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1CAC78]/60 focus:border-[#1CAC78]"
              placeholder="Tu nombre"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1CAC78]/60 focus:border-[#1CAC78]"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1CAC78]/60 focus:border-[#1CAC78]"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-full bg-[#1CAC78] text-white text-sm font-semibold hover:bg-[#50C878] transition"
          >
            Registrarme
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500 text-center">
          Luego conectaremos este formulario con el endpoint{" "}
          <code>/api/usuarios</code>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
