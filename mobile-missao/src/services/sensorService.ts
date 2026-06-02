import { Sensor } from "../interfaces";
import { api } from "./api";

export const listarSensores = async (): Promise<Sensor[]> => {
  const response = await api.get<Sensor[]>("/sensores");
  return response.data;
};

export const cadastrarSensor = async (
  sensor: Omit<Sensor, "id">
): Promise<Sensor> => {
  const response = await api.post<Sensor>("/sensores", sensor);
  return response.data;
};