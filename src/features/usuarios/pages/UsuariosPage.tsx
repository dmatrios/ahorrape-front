import React from "react";

const UsuariosPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-100">Usuarios</h1>
      <p className="text-slate-300">
        Aquí listaremos y gestionaremos usuarios usando
        <code> /usuarios </code>.
      </p>
    </div>
  );
};

export default UsuariosPage;
