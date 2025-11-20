import React from "react";
import { Wallet } from "lucide-react";

interface Movimiento {
  id: number;
  titulo: string;
  categoria: string;
  monto: number;
  fecha: string;
}

interface RecentMovementsProps {
  movimientos: Movimiento[];
}

const formatCurrencySigned = (value: number) => {
  const abs = Math.abs(value).toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  });

  return value < 0 ? `- ${abs}` : `+ ${abs}`;
};

const RecentMovements: React.FC<RecentMovementsProps> = ({
  movimientos,
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4 py-4 md:px-6 md:py-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-lg font-semibold text-slate-900">
          Movimientos recientes
        </h2>
        {/* Más adelante podríamos llevar esto a /transacciones */}
        <button className="text-xs font-medium text-[#008080] hover:underline">
          Ver todo
        </button>
      </div>

      <ul className="space-y-3">
        {movimientos.map((mov) => (
          <li
            key={mov.id}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {mov.titulo}
                </p>
                <p className="text-xs text-slate-500">
                  {mov.categoria} · {mov.fecha}
                </p>
              </div>
            </div>

            <p
              className={`text-sm font-semibold ${
                mov.monto < 0 ? "text-rose-600" : "text-emerald-600"
              }`}
            >
              {formatCurrencySigned(mov.monto)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentMovements;
