import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import {
  crearTransaccion,
  type TipoTransaccion,
} from "../../transacciones/api/transaccionesApi";
import {
  listarCategorias,
  type CategoriaResponse,
} from "../../categorias/api/categoriasApi";

interface Props {
  usuarioId: number;
  onSuccess: () => void; // recargar resumen
}

const RegisterTransactionButton: React.FC<Props> = ({
  usuarioId,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);

  const [tipo, setTipo] = useState<TipoTransaccion>("GASTO");
  const [categoriaId, setCategoriaId] = useState<number | "">("");
  const [monto, setMonto] = useState<string>("");
  const [fecha, setFecha] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [descripcion, setDescripcion] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        setLoadingCategorias(true);
        const data = await listarCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      } finally {
        setLoadingCategorias(false);
      }
    };

    if (open) {
      cargarCategorias();
    }
  }, [open]);

  const resetForm = () => {
    setTipo("GASTO");
    setCategoriaId("");
    setMonto("");
    setFecha(new Date().toISOString().slice(0, 10));
    setDescripcion("");
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!categoriaId || !monto) {
      setErrorMsg("Completa al menos categoría y monto.");
      return;
    }

    const montoNumber = parseFloat(monto);
    if (isNaN(montoNumber) || montoNumber <= 0) {
      setErrorMsg("El monto debe ser un número mayor a 0.");
      return;
    }

    try {
      setSubmitting(true);

      await crearTransaccion({
        usuarioId,
        categoriaId: Number(categoriaId),
        tipo,
        monto: montoNumber,
        fecha,
        descripcion,
      });

      resetForm();
      setOpen(false);
      onSuccess(); // recargar resumen en el dashboard
    } catch (error) {
      console.error(error);
      setErrorMsg("No se pudo registrar la transacción.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-[#1CAC78] text-white text-sm font-semibold px-4 py-2 shadow-md hover:bg-[#50C878] transition"
      >
        <Plus className="w-4 h-4" />
        Registrar movimiento
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-5 relative">
            <button
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Registrar movimiento
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Registra un ingreso o gasto para el usuario demo.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Tipo */}
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTipo("GASTO")}
                  className={`flex-1 rounded-full border px-3 py-2 font-medium ${
                    tipo === "GASTO"
                      ? "bg-rose-50 border-rose-300 text-rose-700"
                      : "bg-white border-slate-200 text-slate-600"
                  }`}
                >
                  Gasto
                </button>
                <button
                  type="button"
                  onClick={() => setTipo("INGRESO")}
                  className={`flex-1 rounded-full border px-3 py-2 font-medium ${
                    tipo === "INGRESO"
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                      : "bg-white border-slate-200 text-slate-600"
                  }`}
                >
                  Ingreso
                </button>
              </div>

              {/* Categoría */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Categoría
                </label>
                <select
                  value={categoriaId}
                  onChange={(e) =>
                    setCategoriaId(
                      e.target.value ? Number(e.target.value) : ""
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1CAC78]/60 focus:border-[#1CAC78]"
                  disabled={loadingCategorias}
                >
                  <option value="">
                    {loadingCategorias
                      ? "Cargando categorías..."
                      : "Selecciona una categoría"}
                  </option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monto */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Monto (S/)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1CAC78]/60 focus:border-[#1CAC78]"
                />
              </div>

              {/* Fecha */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Fecha
                </label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1CAC78]/60 focus:border-[#1CAC78]"
                />
              </div>

              {/* Descripción */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Descripción
                </label>
                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1CAC78]/60 focus:border-[#1CAC78]"
                  placeholder="Ej: Cena en restaurante"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 py-2.5 rounded-full bg-[#1CAC78] text-white text-sm font-semibold hover:bg-[#50C878] transition disabled:opacity-60"
              >
                {submitting ? "Guardando..." : "Guardar movimiento"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterTransactionButton;
