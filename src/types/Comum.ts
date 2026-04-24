import type { Comunidade } from "./Comunidade";

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  uf: string;
}

export interface Usuario {
  id_usuario: number,
  nome: string;
  telefone: string;
  email: string;
  sexo: string;
  data_nascimento: string;
  ativo: boolean;
  id_comunidade_fk: number;
  comunidade?: Comunidade;
  endereco: Endereco;
}
