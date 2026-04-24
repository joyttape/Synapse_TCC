import type { Usuario } from "./Comum";

export interface Catequista {
    id_catequista: number,
    data_admissao: string;
    usuario: Usuario;
}