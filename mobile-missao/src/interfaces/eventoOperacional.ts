import { NivelEvento } from "../types/nivelEvento";

export interface EventoOperacional {
  id: number;
  titulo: string;
  descricao: string;
  tipo: string;
  nivel: NivelEvento;
  dataHora: string;
}