import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import SummaryCards from "../components/SummaryCards";
import RecentMovements from "../components/RecentMovements";
import {
  obtenerResumenMensual,
  type ResumenMensualResponse,
} from "../api/resumenApi";
import RegisterTransactionButton from "../components/RegisterTransactionButton";

// Usuario demo para este sprint
const DEMO_USER_ID = 1;
const DEMO_USER_NOMBRE = "Daniel";

const DashboardPage: React.FC = () => {
  const [resumen, setResumen] = useState<ResumenMensualResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const cargarResumen = async () => {
    try {
      setErrorMsg(null);
      setLoading(true);

      const ahora = new Date();
      const mes = ahora.getMonth() + 1; // 1-12
      const anio = ahora.getFullYear();

      const data = await obtenerResumenMensual(DEMO_USER_ID, mes, anio);
      setResumen(data);
    } catch (error) {
      setErrorMsg("No se pudo cargar el resumen mensual.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarResumen();
  }, []);

  const username = DEMO_USER_NOMBRE;

  const movimientosRecientes =
    resumen?.transaccionesDelMes.map((t) => ({
      id: t.id,
      titulo: t.descripcion || t.categoriaNombre,
      categoria: t.categoriaNombre,
      monto: t.tipo === "GASTO" ? -t.monto : t.monto,
      fecha: t.fecha,
    })) ?? [];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-7 w-48 bg-slate-200 rounded-md animate-pulse" />
        <div className="h-32 w-full bg-slate-200 rounded-3xl animate-pulse" />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="h-24 bg-slate-200 rounded-2xl animate-pulse" />
          <div className="h-24 bg-slate-200 rounded-2xl animate-pulse" />
          <div className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
        </div>
        <div className="h-40 bg-slate-200 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (errorMsg || !resumen) {
    return (
      <div className="space-y-4">
        <Header username={username} />
        <div className="mt-4 bg-white border border-red-100 text-red-700 rounded-2xl px-4 py-3 text-sm">
          {errorMsg ?? "No se encontró información de resumen para este usuario."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header username={username} />

      {/* Línea con botón de registrar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Resumen del mes actual
        </p>
        <RegisterTransactionButton
          usuarioId={DEMO_USER_ID}
          onSuccess={cargarResumen}
        />
      </div>

      {/* Zona superior: saldo + tarjetas + (futuro) gráfico */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <BalanceCard saldo={resumen.saldo} />
          <SummaryCards
            totalIngresos={resumen.totalIngresos}
            totalGastos={resumen.totalGastos}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 lg:p-5 flex items-center justify-center text-sm text-slate-500">
          Aquí luego irá tu gráfico de gastos por categoría.
        </div>
      </div>

      {/* Movimientos recientes */}
      <RecentMovements movimientos={movimientosRecientes} />
    </div>
  );
};

export default DashboardPage;
