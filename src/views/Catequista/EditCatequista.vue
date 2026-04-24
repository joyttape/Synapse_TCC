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

            <h1 class="mb-4 titulo">Editar Dados de Catequistas</h1>

            <div class="card form-card mb-4 shadow-sm">
              <div class="row g-0">
                <div class="col-md-9 p-4">
                  <h2 class="secao-titulo">Dados Pessoais</h2>

                  <div class="row">
                    <div class="col-12 mb-3">
                      <label class="form-label">Nome Completo <span class="text-danger">*</span></label>
                      <input v-model="form.nome" type="text" class="form-control input-sim" />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Telefone <span class="text-danger">*</span></label>
                      <input v-model="form.telefone" @input="onInputTelefone" type="text" class="form-control input-sim" placeholder="(00) 00000-0000" />
                    </div>

                    <div class="col-md-6 d-flex gap-3 mb-3 align-items-end">
                      <div class="flex-fill">
                        <label class="form-label">Data de Nascimento <span class="text-danger">*</span></label>
                        <input v-model="form.nascimento" @input="onInputData($event, 'nascimento')" type="text" class="form-control input-small" placeholder="dd/mm/aaaa" />
                      </div>

                      <div class="flex-fill">
                        <label class="form-label">Ativo <span class="text-danger">*</span></label>
                        <select v-model="form.ativo" class="form-select input-small">
                          <option value="">Selecione</option>
                          <option :value="true">Sim</option>
                          <option :value="false">Não</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6 d-flex gap-3 mb-3 align-items-end">
                      <div class="flex-fill">
                        <label class="form-label">Data de Admissão <span class="text-danger">*</span></label>
                        <input v-model="form.admissao" @input="onInputData($event, 'admissao')" type="text" class="form-control input-small" placeholder="dd/mm/aaaa" />
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Comunidade <span class="text-danger">*</span></label>
                      <select v-model="form.id_comunidade_fk" class="form-select input-small">
                        <option value="null">Selecione</option>
                        <option v-for="c in comunidades" :key="c.id_comunidade" :value="Number(c.id_comunidade)">
                          {{ c.nome }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Email <span class="text-danger">*</span></label>
                      <input v-model="form.email" type="email" class="form-control input-sim" placeholder="seuemail@email.com" />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Sexo <span class="text-danger">*</span></label>
                      <select v-model="form.sexo" class="form-select input-small">
                        <option value="">Selecione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                      </select>
                    </div>

                  </div>
                </div>

                <div class="col-md-3 d-flex flex-column align-items-center justify-content-center foto-area p-4">
                  <div class="foto-border mb-3">
                     <div class="foto-placeholder"><img  src="/src/assets/icones/acoes/iconfomr.png"/></div>
                  </div>
                  <button class="btn btn-primary btn-sm w-75">Upload foto</button>
                  <small class="text-muted mt-2">JPG, PNG até 10MB</small>
                </div>
              </div>
            </div>

            <div class="card form-card p-4 mb-4 shadow-sm">
              <h2 class="secao-titulo">Dados de endereço</h2>

              <div class="row mt-3">
                <div class="col-12 mb-3">
                  <label class="form-label">Logradouro <span class="text-danger">*</span></label>
                  <input v-model="form.logradouro" type="text" class="form-control input-sim" />
                </div>

                <div class="col-md-5 mb-3">
                  <label class="form-label">Complemento <span class="text-danger">*</span></label>
                  <input v-model="form.complemento" type="text" class="form-control input-sim" />
                </div>

                <div class="col-md-5 mb-3">
                  <label class="form-label">Bairro <span class="text-danger">*</span></label>
                  <input v-model="form.bairro" type="text" class="form-control input-sim" />
                </div>

                <div class="col-md-3 mb-3">
                  <label class="form-label">Estado <span class="text-danger">*</span></label>
                  <input v-model="form.estado" type="text" class="form-control input-small" />
                </div>

                <div class="col-md-4 mb-3">
                  <label class="form-label">Cidade <span class="text-danger">*</span></label>
                  <input v-model="form.cidade" type="text" class="form-control input-small" />
                </div>

                <div class="col-md-2 mb-3">
                  <label class="form-label">Número <span class="text-danger">*</span></label>
                  <input v-model="form.numero" type="text" class="form-control input-small" />
                </div>

                <div class="col-md-3 mb-3">
                  <label class="form-label">CEP <span class="text-danger">*</span></label>
                  <input v-model="form.cep" @input="onInputCEP" type="text" class="form-control input-small" placeholder="00000-000" />
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <button type="button" @click="salvar" class="btn salvar-btn">Salvar dados </button>
            </div>

          </div>
        </main>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from '@/components/SideBar.vue';
import { CatequistaService } from '@/services/CatequistaService';
import { ComunidadeService } from '@/services/ComunidadeService';
import { masks } from '@/utils/masks';
import Swal from 'sweetalert2';

export default {
  name: 'EditCatequista',
  components: { SideBar },
  data() {
    return {
      isSideBarRecolhida: true,
      comunidades: [] as any[],
      id: 0,
      form: {
        admissao: '',
        nome: '',
        telefone: '',
        nascimento: '',
        ativo: null as boolean | null,
        email: '',
        sexo: '',
        id_comunidade_fk: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        estado: '',
        cidade: '',
        numero: '',
        cep: ''
      }
    };
  },

  methods: {
    async carregarDados() {
      try {
        this.id = Number(this.$route.params.id);
        const dados = await CatequistaService.buscarPorId(this.id);
        
        console.log("DADOS DA API:", dados);
        console.log("ID DA COMUNIDADE QUE VEIO:", dados.usuario.id_comunidade_fk);
        console.log("LISTA DE COMUNIDADES CARREGADA:", this.comunidades);

        this.form = {
          admissao: masks.data(dados.data_admissao),
          nome: dados.usuario.nome,
          telefone: masks.telefone(dados.usuario.telefone),
          nascimento: masks.data(dados.usuario.data_nascimento),
          ativo: dados.usuario.ativo,
          email: dados.usuario.email,
          sexo: dados.usuario.sexo,
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
        Swal.fire("Erro", "Não foi possível carregar os dados do catequista.", "error");
      }
    },

    async buscarComunidades() {
      this.comunidades = await ComunidadeService.listar();
    },

    onInputTelefone(e: any) { this.form.telefone = masks.telefone(e.target.value); },
    onInputData(e: any, campo: 'nascimento' | 'admissao') { this.form[campo] = masks.data(e.target.value); },
    onInputCEP(e: any) { this.form.cep = masks.cep(e.target.value); },

    async salvar() {
      try {
        await CatequistaService.atualizar(this.id, this.form);
        
        await Swal.fire({
          icon: "success",
          title: "Atualizado!",
          text: "Dados do catequista atualizados com sucesso.",
        });
        
        this.$router.push('/Catequista');
      } catch (error: any) {
        console.log("DETALHES DO ERRO NO PUT:", error.response?.data);
        Swal.fire("Erro", "Não foi possível atualizar.", "error");
      }
    },

    async confirmarVoltar() {
        const result = await Swal.fire({
          icon: 'warning',
          title: "Atenção!",
          text: "Os dados alterados não serão salvos, quer retornar mesmo?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33', 
          confirmButtonText: 'Sim, sair',
          cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
          this.$router.push('/Catequista');
        }
      }
  },

  async mounted() {
    await this.buscarComunidades();
    await this.carregarDados();
  }
};
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

.form-page {
  flex: 1;
  transition: margin-left 0.3s ease;
  margin-left: 200px; 
}

.content-recolhido {
  margin-left: 80px; 
}

@media (max-width: 768px) {
  .form-page {
    margin-left: 0 !important;
  }
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

.salvar-btn { 
background: transparent; 
color: #2b6aff; 
border: 1px solid #2b6aff;
 padding: 10px 28px; 
 border-radius: 24px; 
}

.salvar-btn:hover {
 background: #2b6aff;
 color: #ffff;
}

@media (max-width: 767px) {
  .foto-area { border-left: none; border-top: 1px solid #ececec; }
  .form-card .col-md-9, .form-card .col-md-3 { padding: 16px; }
}

.form-label { 
  font-size: 13px; 
  font-weight: 500;
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

</style>