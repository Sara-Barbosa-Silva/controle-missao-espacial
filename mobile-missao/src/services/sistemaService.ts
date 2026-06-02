import { SistemaMonitorado } from "../interfaces";
import { api } from "./api";

export const listarSistemas = async (): Promise<SistemaMonitorado[]> => {
  const response = await api.get<SistemaMonitorado[]>("/sistemas");
  return response.data;
};

export const cadastrarSistema = async (
  sistema: Omit<SistemaMonitorado, "id">
): Promise<SistemaMonitorado> => {
  const response = await api.post<SistemaMonitorado>("/sistemas", sistema);
  return response.data;
};