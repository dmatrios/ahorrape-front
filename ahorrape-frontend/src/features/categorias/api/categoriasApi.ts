import { api } from "../../../api/apiClient";

export interface CategoriaResponse {
  id: number;
  nombre: string;
  descripcion: string;
}

export const listarCategorias = async (): Promise<CategoriaResponse[]> => {
  const res = await api.get<CategoriaResponse[]>("/categorias");
  return res.data;
};
