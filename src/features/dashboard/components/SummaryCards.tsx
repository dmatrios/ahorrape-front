import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface SummaryCardsProps {
  totalIngresos: number;
  totalGastos: number;
}

const formatCurrency = (value: number) =>
  value.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  });

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalIngresos,
  totalGastos,
}) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {/* Ingresos */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
          <ArrowDownRight className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-xs text-slate-500">Ingresos este mes</p>
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(totalIngresos)}
          </p>
        </div>
      </div>

      {/* Gastos */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
          <ArrowUpRight className="w-5 h-5 text-rose-600" />
        </div>
        <div>
          <p className="text-xs text-slate-500">Gastos este mes</p>
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(totalGastos)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SummaryCards;
