import type { Endereco } from '@/types/Comum'

export interface Comunidade {
    id_comunidade: number,
    nome: string,
    paroquia: string,
    endereco: Endereco
}