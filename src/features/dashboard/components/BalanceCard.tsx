import React from "react";

interface BalanceCardProps {
  saldo: number;
}

const formatCurrency = (value: number) =>
  value.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  });

const BalanceCard: React.FC<BalanceCardProps> = ({ saldo }) => {
  return (
    <section className="bg-[#1CAC78] text-white rounded-3xl px-6 py-5 md:px-8 md:py-6 shadow-md">
      <p className="text-sm font-medium opacity-90">Saldo disponible</p>
      <p className="mt-2 text-3xl md:text-4xl font-semibold">
        {formatCurrency(saldo)}
      </p>
      <p className="mt-1 text-xs md:text-sm opacity-90">
        Este es tu saldo actual considerando ingresos y gastos del mes.
      </p>
    </section>
  );
};

export default BalanceCard;
