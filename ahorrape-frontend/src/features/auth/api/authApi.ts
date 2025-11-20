import { api } from "../../../api/apiClient";
import type { UsuarioResponse } from "../../usuarios/api/usuariosApi";

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (
  data: LoginRequest
): Promise<UsuarioResponse> => {
  const res = await api.post<UsuarioResponse>("/usuarios/login", data);
  return res.data;
};
