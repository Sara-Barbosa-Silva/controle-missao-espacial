export type StatusAlerta =
  | "aberto"
  | "analise"
  | "resolvido";

export type NivelAlerta =
  | "alto"
  | "critico";

export interface AlertaCritico {
  id: number;
  descricao: string;
  nivel: NivelAlerta;
  status: StatusAlerta;
  dataHora: string;
}