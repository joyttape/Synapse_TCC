export interface Turma {
  id_turma: number;

  nome: string;
  descricao: string;
  dataturma: string;       
  idademin: number;
  idademax: number;
  diasemana: string;
  limitecatequizando: number;
  status: boolean;

  horarioinicial: string;  
  horariofinal: string; 

  id_catequistas: number[];  
  catequizandos_ids: number[];
}