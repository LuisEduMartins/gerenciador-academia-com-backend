
export interface Instrutor {
  id: number;
  nome: string;
}

export interface Exercicio {
  id: number;
  nome: string;
  grupoMuscular: string;
}

export interface PlanoDeTreino {
  id: number;
  nome: string;
}

export interface Membro {
  id: number;
  nome: string;
  email: string;
  planoDeTreinoId: number;
  instrutorId: number;
}