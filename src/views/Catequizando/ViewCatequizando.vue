<template>
  <div class="page-wrapper">
    <div class="layout-container">

      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="form-page" :class="{ 'content-recolhido': isSideBarRecolhida }">

        <main class="page-content">

           <div class="container my-5">

              <div class="return-button-container">
              <button class="btn-return" @click="confirmarVoltar">
                ← Voltar
              </button>

              </div>

              <h1 class="mb-4 titulo">Dados do Catequizando</h1>

              <div class="card form-card mb-4 shadow-sm">
                <div class="row g-0">
                  <div class="col-md-9 p-4">
                    <h2 class="secao-titulo">Dados Pessoais</h2>

                    <div class="row">
                      <div class="col-12 mb-3">
                        <label class="form-label">Nome Completo <span class="text-danger">*</span></label>
                        <input v-model="form.nome" type="text" class="form-control input-sim" readonly/>
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">Telefone <span class="text-danger">*</span></label>
                        <input  readonly v-model="form.telefonecatequizando" @input="onInputTelefone($event, 'telefonecatequizando')" type="text" class="form-control input-sim" placeholder="(00) 00000-0000" />
                      </div>

                      <div class="col-md-6 d-flex gap-3 mb-3 align-items-end">
                        <div class="flex-fill">
                          <label class="form-label">Data de Nascimento <span class="text-danger">*</span></label>
                          <input readonly v-model="form.nascimento" @input="onInputData" type="text" class="form-control input-small" placeholder="dd/mm/aaaa" />
                        </div>

                        <div class="flex-fill">
                          <label class="form-label">Ativo <span class="text-danger">*</span></label>
                          <select readonly v-model="form.ativo" class="form-select input-small">
                            <option value="">Selecione</option>
                            <option :value=true>Sim</option>
                            <option :value=false>Não</option>
                          </select>
                        </div>
                      </div>



                     <div class="col-md-6 mb-3">
                          <label class="form-label">Comunidade <span class="text-danger">*</span></label>

                          <select readonly v-model="form.id_comunidade_fk" class="form-select input-small">
                              <option value="">Selecione</option>
                              <option
                                v-for="c in comunidades"
                                :key="c.id_comunidade"
                                :value="c.id_comunidade"
                              >
                                {{ c.nome }}
                              </option>
                            </select>
                      </div>

                      <div class="col-md-6 d-flex gap-3 mb-3 align-items-end">
                        <div class="flex-fill">
                          <label class="form-label">Sexo <span class="text-danger">*</span></label>
                          <select readonly v-model="form.sexo" class="form-select input-small">
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">Nome - Responsável 1 <span class="text-danger">*</span></label>
                        <input readonly v-model="form.responsavel_nome1" type="text" class="form-control input-sim" />
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">Telefone Responsável 1 <span class="text-danger">*</span></label>
                        <input readonly v-model="form.telefone_resp1" @input="onInputTelefone($event, 'telefone_resp1')" type="text" class="form-control input-sim" placeholder="(00) 00000-0000" />
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">Nome - Responsável 2 <span class="text-danger">*</span></label>
                        <input readonly v-model="form.responsavel_nome2" type="text" class="form-control input-sim" />
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">Telefone Responsável 2 <span class="text-danger">*</span></label>
                        <input readonly v-model="form.telefone_resp2" @input="onInputTelefone($event, 'telefone_resp2')" type="text" class="form-control input-sim" placeholder="(00) 00000-0000" />
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">Email <span class="text-danger">*</span></label>
                        <input readonly v-model="form.email" @input="limitarEmail" type="email" class="form-control input-sim" placeholder="seuemail@email.com" />
                      </div>

                      <div class="col-md-3 mb-3">
                          <label class="form-label">Possui pais juntos? <span class="text-danger">*</span></label>
                          <div class="checkbox-group">
                            <label><input readonly type="radio" :value="true" v-model="form.paisjuntos"> Sim</label>
                            <label><input readonly type="radio" :value="false" v-model="form.paisjuntos"> Não</label>
                          </div>
                        </div>

                        <div class="col-md-3 mb-3">
                          <label class="form-label">Frequenta outras igrejas? <span class="text-danger">*</span></label>
                          <div class="checkbox-group">
                            <label><input readonly type="radio" :value="true" v-model="form.frequentaigrejas"> Sim</label>
                            <label><input readonly type="radio" :value="false" v-model="form.frequentaigrejas"> Não</label>
                          </div>
                        </div>

                        <div class="col-md-3 mb-3">
                          <label class="form-label">É batizado(a)? <span class="text-danger">*</span></label>
                          <div class="checkbox-group">
                            <label><input readonly type="radio" :value="true" v-model="form.batizado"> Sim</label>
                            <label><input readonly type="radio" :value="false" v-model="form.batizado"> Não</label>
                          </div>
                        </div>

                        <div class="col-md-3 mb-3">
                          <label class="form-label">Frequenta a comunidade? <span class="text-danger">*</span></label>
                          <div class="checkbox-group">
                            <label><input readonly type="radio" :value="true" v-model="form.frequentacomunidade"> Sim</label>
                            <label><input readonly type="radio" :value="false" v-model="form.frequentacomunidade"> Não</label>
                          </div>
                      </div>


                    </div>
                  </div>

                  <div class="col-md-3 d-flex flex-column align-items-center justify-content-center foto-area p-4">
                    <div class="foto-border mb-3">
                      <div class="foto-placeholder"><img  src="/src/assets/icones/acoes/iconfomr.png"/></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card form-card p-4 mb-4 shadow-sm">
                <h2 class="secao-titulo">Dados de endereço</h2>

                <div class="row mt-3">
                  <div class="col-12 mb-3">
                    <label class="form-label">Logradouro <span class="text-danger">*</span></label>
                    <input readonly v-model="form.logradouro" type="text" class="form-control input-sim" />
                  </div>

                  <div class="col-md-5 mb-3">
                    <label class="form-label">Complemento <span class="text-danger">*</span></label>
                    <input readonly v-model="form.complemento" type="text" class="form-control input-sim" />
                  </div>

                  <div class="col-md-5 mb-3">
                    <label class="form-label">Bairro <span class="text-danger">*</span></label>
                    <input readonly v-model="form.bairro" type="text" class="form-control input-sim" />
                  </div>

                  <div class="col-md-2 mb-3"></div>

                  <div class="col-md-3 mb-3">
                    <label class="form-label">Estado <span class="text-danger">*</span></label>
                    <input readonly v-model="form.estado" type="text" class="form-control input-small" />
                  </div>

                  <div class="col-md-4 mb-3">
                    <label class="form-label">Cidade <span class="text-danger">*</span></label>
                    <input readonly v-model="form.cidade" type="text" class="form-control input-small" />
                  </div>

                  <div class="col-md-2 mb-3">
                    <label class="form-label">Número <span class="text-danger">*</span></label>
                    <input  readonly v-model="form.numero" type="text" class="form-control input-small" />
                  </div>

                  <div class="col-md-3 mb-3">
                    <label class="form-label">CEP <span class="text-danger">*</span></label>
                    <input readonly v-model="form.cep" @input="onInputCEP" type="text" class="form-control input-small" placeholder="00000-000" />
                  </div>
                </div>
              </div>
            </div>
        </main>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/SideBar.vue";
import { CatequizandoService } from "@/services/CatequizandoService";
import { ComunidadeService } from "@/services/ComunidadeService";
import { masks } from "@/utils/masks";
import Swal from "sweetalert2";

export default {
name: 'ViewCatequizando',
components: {SideBar},
data() {
  return{
    isSideBarRecolhida: true,
    comunidades: [] as any[],
    id: 0,
    form: {
        nome: '',
        telefonecatequizando: '',
        nascimento: '',
        email: '',
        sexo: '',
        ativo: null as boolean | null,
        batizado: null as boolean | null,
        paisjuntos: null as boolean | null,
        frequentaigrejas: null as boolean | null,
        frequentacomunidade: null as boolean | null,

        responsavel_nome1: '',
        responsavel_nome2: '',
        telefone_resp1: '',
        telefone_resp2: '',

        id_comunidade_fk: '',

        logradouro: '',
        complemento: '',
        bairro: '',
        estado: '',
        cidade: '',
        numero: '',
        cep: ''
      }
  }
},

methods: {

  async carregarDados(){
    try{
      this.id = Number(this.$route.params.id);
      const dados = await CatequizandoService.buscarPorId(this.id);

      this.form ={
        nome: dados.usuario.nome,
        telefonecatequizando: masks.telefone(dados.usuario.telefone),
        nascimento: masks.data(dados.usuario.data_nascimento),
        email: dados.usuario.email,
        sexo: dados.usuario.sexo,
        ativo: dados.usuario.ativo,
        paisjuntos: Boolean(dados.paisjuntos),
        frequentaigrejas: Boolean(dados.frequentaigrejas),
        frequentacomunidade: Boolean(dados.frequentacomunidade),
        batizado: Boolean(dados.batizado),
        responsavel_nome1: dados.nome_pai,
        telefone_resp1: masks.telefone(dados.telefone_pai),
        responsavel_nome2: dados.nome_mae,
        telefone_resp2: masks.telefone(dados.telefone_mae),
        id_comunidade_fk: dados.usuario.comunidade ? Number(dados.usuario.comunidade.id_comunidade) : null,
        logradouro: dados.usuario.endereco.logradouro,
        complemento: dados.usuario.endereco.complemento,
        bairro: dados.usuario.endereco.bairro,
        estado: dados.usuario.endereco.estado,
        cidade: dados.usuario.endereco.cidade,
        numero: dados.usuario.endereco.numero,
        cep: masks.cep(dados.usuario.endereco.cep)
      };
    } catch (error) {
      Swal.fire("Erro", "Não foi possível carregar os dados do catequizando.", "error");
    }
  },

  async buscarComunidades(){
    this.comunidades = await ComunidadeService.listar();
  },

  onInputTelefone(
  event: Event,
  campo: 'telefonecatequizando' | 'telefone_resp1' | 'telefone_resp2'
) {
  const input = event.target as HTMLInputElement;

  this.form[campo] = masks.telefone(input.value);
},
    onInputData(e: any) {
      this.form.nascimento = masks.data(e.target.value);
    },

    onInputCEP(e: any) {
      this.form.cep = masks.cep(e.target.value);
    },

    limitarEmail(e: any) {
      this.form.email = e.target.value.slice(0, 100);
    },


    async confirmarVoltar() {
      this.$router.push('/Catequizando');
      }
},

async mounted() {
    await this.buscarComunidades();
    await this.carregarDados();
}
}
</script>

<style scoped>

.page-wrapper {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.layout-container {
  display: flex;
  width: 100%;
}

.barra-lateral {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px; 
  z-index: 30;
  transition: width 0.25s ease; 
  box-sizing: border-box;
}

.barra-lateral.recolhida {
  width: 80px;
}

.form-page {
  flex: 1;
  transition: margin-left 0.25s ease;
  margin-left: 280px; 
  position: relative;
  z-index: 10;
  min-height: 100vh;
  box-sizing: border-box;
}

.form-page.content-recolhido {
  margin-left: 80px;
}

.titulo { 
  font-weight: 600; 
  font-size: 26px; 
}

.secao-titulo {
  font-size: 14px; 
  font-weight: 600; 
  margin-bottom: 14px;
}

.form-card { 
  border-radius: 10px; 
  border: 1px solid #e6e6e6; 
  overflow: hidden; 
}

.input-sim { 
  background: #f3f4f6;
  border: 1px solid #eee; 
  border-radius: 8px; 
  height: 44px; 
}

.input-small { 
  background: #f3f4f6; 
  border: 1px solid #eee; 
  border-radius: 8px; 
  height: 40px; 
}

.foto-area { 
  border-left: 1px solid #ececec; 
}

.foto-border { 
  width: 130px; 
  height: 130px; 
  border-radius: 50%; 
  border: 2px dotted #d9d9d9; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
}

.foto-placeholder { 
  font-size: 48px; 
  color: #b4b4b4;
}


.btn-return {
  border: 1.5px solid #0d6efd;
  color: #0d6efd;
  background: transparent;
  border-radius: 25px;
  padding: 10px 22px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex; 
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.btn-return:hover {
  background-color: #0d6efd;
  color: white;
}

.form-label { 
  font-size: 13px; 
  font-weight: 500; 
}

.checkbox-group {
  display: flex;
  flex-direction: column; 
  gap: 2px;
}

.checkbox-group label {
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
}

</style>