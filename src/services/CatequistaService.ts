import { api } from "@/common/http";
import {masks} from '@/utils/masks';

import type { Catequista} from "@/types/Catequista";

export const CatequistaService = {
  
  // GET - Listar
  async listar(): Promise<Catequista[]> {
    const { data } = await api.get('/api/Catequista');
    
    return data.map((item: any) => ({
      ...item,
      usuario: {
        ...item.usuario,
        telefone: masks.telefone(item.usuario?.telefone),
        data_nascimento: this.formatarDataExibicao(item.usuario?.data_nascimento)
      }
    }));
  },

  formatarDataExibicao(dataISO: string): string {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
  },

  // GET - Buscar pelo ID
  
  async buscarPorId(id: number): Promise<Catequista> {
    const { data } = await api.get(`/api/Catequista/${id}`);
    return data;
  },

  // POST - Catequista

  async cadastrar(form: any) {
    const payload = this.prepararPayload(form);
    return await api.post('/api/Catequista', payload);
  },

  // PUT - Atualizar Catequista

  async atualizar(id: number, form: any) {
    const payload = this.prepararPayload(form);

    payload.id_catequista = id;

    console.log("Payload que será enviado:", payload);
    return await api.put(`/api/Catequista/${id}`,payload);
  },

  // DELETE - Deletar Catequista
  async excluir(id: number) {

    return await api.delete(`/api/Catequista/${id}`);
  },


prepararPayload(form: any): any {
  const formatarData = (dataStr: string) => {
    return masks.dateToISO(dataStr); 
  };

  const apenasNumeros = (valor: string) => {
    return valor ? valor.replace(/\D/g, "") : "";
  };

  return {
    data_admissao: formatarData(form.admissao),
    usuario: {
      nome: form.nome || "",
      telefone: apenasNumeros(form.telefone), 
      email: form.email || "",
      ativo: Boolean(form.ativo),
      sexo: form.sexo || "",
      data_nascimento: formatarData(form.nascimento),
      endereco: {
        logradouro: form.logradouro || "",
        numero: form.numero || "",
        complemento: form.complemento || "",
        bairro: form.bairro || "",
        cidade: form.cidade || "",
        estado: form.estado || "",
        cep: apenasNumeros(form.cep),
        uf: form.estado ? form.estado.substring(0, 2).toUpperCase() : ""
      },
      id_comunidade_fk: form.id_comunidade_fk ? Number(form.id_comunidade_fk) : null
    }
  };
}
};