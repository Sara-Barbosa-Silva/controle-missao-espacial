import { StatusSistema } from "../types/statusSistema";

export interface SistemaMonitorado {
  id: number;
  nome: string;
  descricao: string;
  status: StatusSistema;
  ativo: boolean;
}