import { AlertaCritico } from "../interfaces";
import { api } from "./api";

export const listarAlertas = async (): Promise<AlertaCritico[]> => {
  const response = await api.get<AlertaCritico[]>("/alertas");
  return response.data;
};

export const cadastrarAlerta = async (
  alerta: Omit<AlertaCritico, "id">
): Promise<AlertaCritico> => {
  const response = await api.post<AlertaCritico>("/alertas", alerta);
  return response.data;
};