export interface Sensor {
  id: number;
  nome: string;
  tipo: string;
  unidadeMedida: string;
  valorAtual: number;
  ativo: boolean;
}