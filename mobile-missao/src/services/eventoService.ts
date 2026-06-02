import { EventoOperacional } from "../interfaces";
import { api } from "./api";

export const listarEventos = async (): Promise<EventoOperacional[]> => {
  const response = await api.get<EventoOperacional[]>("/eventos");
  return response.data;
};

export const cadastrarEvento = async (
  evento: Omit<EventoOperacional, "id">
): Promise<EventoOperacional> => {
  const response = await api.post<EventoOperacional>("/eventos", evento);
  return response.data;
};