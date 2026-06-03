import { AlertaCritico } from "../interfaces";
import { StatusAlerta } from "../types/statusAlerta";
import { api } from "./api";

export async function listarAlertas() {
  const response = await api.get<AlertaCritico[]>("/alertas");
  return response.data;
}

export async function cadastrarAlerta(alerta: Omit<AlertaCritico, "id">) {
  const response = await api.post<AlertaCritico>("/alertas", alerta);
  return response.data;
}

export async function atualizarAlerta(
  alerta: AlertaCritico,
  novoStatus: StatusAlerta
) {
  const response = await api.put<AlertaCritico>(`/alertas/${alerta.id}`, {
    ...alerta,
    status: novoStatus,
  });

  return response.data;
}