import { api } from "../../../api/apiClient";

export type TipoTransaccion = "INGRESO" | "GASTO";

export interface CrearTransaccionRequest {
  usuarioId: number;
  categoriaId: number;
  tipo: TipoTransaccion;
  monto: number;
  fecha: string; // yyyy-MM-dd
  descripcion: string;
}

export interface TransaccionResponse {
  id: number;
  usuarioId: number;
  usuarioNombre: string;
  categoriaId: number;
  categoriaNombre: string;
  tipo: TipoTransaccion;
  monto: number;
  fecha: string;
  descripcion: string;
}

export const crearTransaccion = async (
  data: CrearTransaccionRequest
): Promise<TransaccionResponse> => {
  const res = await api.post<TransaccionResponse>("/transacciones", data);
  return res.data;
};
