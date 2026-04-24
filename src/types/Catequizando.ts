import type { Usuario } from "./Comum";
import type { Turma } from "./Turma";

export interface Catequizando {
id_catequizando: number;
paisjuntos: boolean;
batizado: boolean;
frequentaigrejas: boolean;
frequentacomunidade: boolean;
nomepai: string;
nomemae: string;
telefone_resp1: string;
telefone_resp2: string;
usuario: Usuario
turma: Turma
}
