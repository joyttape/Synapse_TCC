import { api } from "@/common/http";
import { masks } from "@/utils/masks";


import type { Catequizando } from "@/types/Catequizando";

export const CatequizandoService = {

//   GET - Listar

async listar(): Promise<Catequizando[]> {
    const { data } = await api.get('/api/Catequizando');
    
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

async buscarPorId(id:number): Promise<Catequizando>{
    const {data} = await api.get(`/api/Catequizando/${id}`);
    return data;
},

//POST - Catequizando

async cadastrarCatequizando(form: any){
    const payload = this.prepararPayload(form);
    return await api.post('/api/Catequizando', payload)
},

//PUT - Atualizar Catequizando

async atualizar(id:number, form: any){

    const payload = this.prepararPayload(form);

    payload.id_catequizando = id;

    console.log("Payload que será enviado: ", payload);
    return await api.put(`/api/Catequizando/${id}`, payload);
},

// DELETE - Deletar Catequizando

async excluir(id:number){
    return await api.delete(`/api/Catequizando/${id}`);
},

prepararPayload(form: any): any {
  const formatarData = (dataStr: string) => {
    return masks.dateToISO(dataStr); 
  };

  const apenasNumeros = (valor: string) => {
    return valor ? valor.replace(/\D/g, "") : "";
  };

  return {
    batizado: form.batizado,
    frequentacomunidade: form.frequentaigrejas,
    frequenta_igrejas: form.frequentacomunidade,
    paisjuntos: form.paisjuntos,
    nome_pai: form.responsavel_nome1,
    telefone_pai: apenasNumeros(form.telefone_resp1),
    nome_mae: form.responsavel_nome2,
    telefone_mae: apenasNumeros(form.telefone_resp2),
    usuario: {
      nome: form.nome || "",
      telefone: apenasNumeros(form.telefonecatequizando), 
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
}
