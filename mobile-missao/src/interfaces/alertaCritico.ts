import { NivelAlerta } from "../types/nivelAlerta";
import { StatusAlerta } from "../types/statusAlerta";

export interface AlertaCritico {
  id: number;
  titulo: string;
  descricao: string;
  nivel: NivelAlerta;
  status: StatusAlerta;
  dataHora: string;
}