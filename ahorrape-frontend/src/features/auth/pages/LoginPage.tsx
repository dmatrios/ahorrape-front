import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi"; // si LoginPage está en features/auth/pages

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg("Ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const usuario = await login({ email, password });

      // Guardamos el usuario autenticado para usarlo en el Dashboard
      localStorage.setItem("ahorrape-user", JSON.stringify(usuario));

      navigate("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 400 || err.response?.status === 401) {
        setErrorMsg(
          err.response.data?.mensaje ||
            "Correo o contraseña incorrectos."
        );
      } else {
        setErrorMsg(
          "Ocurrió un error al conectar con el servidor. Inténtalo de nuevo."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border border-slate-200 px-6 py-8">
        <h1 className="text-2xl font-semibold text-[#008080] mb-1">
          Iniciar sesión
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Ingresa con tu correo para acceder a tu resumen en AhorraPe.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1CAC78]/60 focus:border-[#1CAC78]"
              placeholder="********"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-600 mt-1">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-full bg-[#1CAC78] text-white text-sm font-semibold hover:bg-[#50C878] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500 text-center">
          Este formulario ya está conectado a <code>/api/usuarios/login</code>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
