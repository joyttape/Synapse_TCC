<template>
  <div class="page-wrapper">
    <div class="layout-container">

      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="form-page" :class="{ 'content-recolhido': isSideBarRecolhida }">
        <main class="page-content">
          <div class="container my-5">

            <div class="return-button-container">
              <RouterLink to="/Catequista" class="btn-return">
                &larr; Voltar
              </RouterLink>
            </div>

            <h1 class="mb-4 titulo">Visualizar Dados</h1>

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
                      <input v-model="form.telefone" type="text" class="form-control input-sim" readonly/>
                    </div>

                    <div class="col-md-6 d-flex gap-3 mb-3 align-items-end">
                      <div class="flex-fill">
                        <label class="form-label">Data de Nascimento <span class="text-danger">*</span></label>
                        <input v-model="form.nascimento" type="text" class="form-control input-small" readonly/>
                      </div>

                      <div class="flex-fill">
                        <label class="form-label">Ativo <span class="text-danger">*</span></label>
                        <select v-model="form.ativo" class="form-select input-small" disabled>
                          <option :value="true">Sim</option>
                          <option :value="false">Não</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6 d-flex gap-3 mb-3 align-items-end">
                      <div class="flex-fill">
                        <label class="form-label">Data de Admissão <span class="text-danger">*</span></label>
                        <input v-model="form.admissao" type="text" class="form-control input-small" readonly/>
                      </div>

                      <div class="flex-fill">
                        <label class="form-label">Formação <span class="text-danger">*</span></label>
                        <input v-model="form.formacao" type="text" class="form-control input-small" readonly/>
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Comunidade <span class="text-danger">*</span></label>
                      <select v-model="form.id_comunidade_fk" class="form-select input-small" disabled>
                        <option value="">Selecione</option>
                        <option v-for="c in comunidades" :key="c.id_comunidade" :value="c.id_comunidade">
                          {{ c.nome }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Email <span class="text-danger">*</span></label>
                      <input v-model="form.email" type="email" class="form-control input-sim" readonly/>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Sexo <span class="text-danger">*</span></label>
                      <select v-model="form.sexo" class="form-select input-small" disabled>
                        <option value="">Selecione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                      </select>
                    </div>

                  </div>
                </div>

                <div class="col-md-3 d-flex flex-column align-items-center justify-content-center foto-area p-4">
                  <div class="foto-border mb-3">
                    <div class="foto-placeholder">
                      <img src="/src/assets/icones/acoes/iconfomr.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dados de Endereço -->
            <div class="card form-card p-4 mb-4 shadow-sm">
              <h2 class="secao-titulo">Dados de Endereço</h2>
              <div class="row mt-3">

                <div class="col-12 mb-3">
                  <label class="form-label">Logradouro <span class="text-danger">*</span></label>
                  <input v-model="form.logradouro" type="text" class="form-control input-sim" readonly/>
                </div>

                <div class="col-md-5 mb-3">
                  <label class="form-label">Complemento <span class="text-danger">*</span></label>
                  <input v-model="form.complemento" type="text" class="form-control input-sim" readonly/>
                </div>

                <div class="col-md-5 mb-3">
                  <label class="form-label">Bairro <span class="text-danger">*</span></label>
                  <input v-model="form.bairro" type="text" class="form-control input-sim" readonly/>
                </div>

                <div class="col-md-3 mb-3">
                  <label class="form-label">Estado <span class="text-danger">*</span></label>
                  <input v-model="form.estado" type="text" class="form-control input-small" readonly/>
                </div>

                <div class="col-md-4 mb-3">
                  <label class="form-label">Cidade <span class="text-danger">*</span></label>
                  <input v-model="form.cidade" type="text" class="form-control input-small" readonly/>
                </div>

                <div class="col-md-2 mb-3">
                  <label class="form-label">Número <span class="text-danger">*</span></label>
                  <input v-model="form.numero" type="text" class="form-control input-small" readonly/>
                </div>

                <div class="col-md-3 mb-3">
                  <label class="form-label">CEP <span class="text-danger">*</span></label>
                  <input v-model="form.cep" type="text" class="form-control input-small" readonly/>
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
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "@/common/http";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "ViewCatequista",
  components: { SideBar },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const isSideBarRecolhida = ref(true);
    const comunidades = ref([]); 

    const form = reactive({
      admissao: "",
      formacao: "",
      nome: "",
      telefone: "",
      nascimento: "",
      ativo: "",
      email: "",
      sexo: "",
      id_comunidade_fk: '', 

      logradouro: "",
      complemento: "",
      bairro: "",
      estado: "",
      cidade: "",
      numero: "",
      cep: ""
    });

    async function buscarComunidades() {
      try {
        const resposta = await api.get('/api/Comunidade');
        comunidades.value = resposta.data;
      } catch (error) {
        console.error('Erro ao buscar comunidades:', error);
      }
    }

    function formatarTelefone(valor: string) {
      if (!valor) return "";
      return valor
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }

    function formatarCEP(valor: string) {
      if (!valor) return "";
      return valor.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
    }

    function formatarDataISOparaBR(data: string) {
      if (!data) return "";
      return data.split("-").reverse().join("/");
    }

    async function carregarCatequista(id: number) {
  try {
    const { data } = await api.get(`/api/Catequista/${id}`);
    form.formacao = data.formacao ?? "";
    form.admissao = data.data_admissao ? formatarDataISOparaBR(data.data_admissao) : "";

    const u = data.usuario ?? {};
    const e = u.endereco ?? {};

    form.nome = u.nome ?? "";
    form.telefone = formatarTelefone(u.telefone ?? "");
    form.nascimento = u.data_nascimento ? formatarDataISOparaBR(u.data_nascimento) : "";
    form.ativo = u.ativo ?? false;
    form.email = u.email ?? "";
    form.sexo = u.sexo ?? "";

    form.id_comunidade_fk = u.comunidade?.id_comunidade ?? 0;

    form.logradouro = e.logradouro ?? "";
    form.complemento = e.complemento ?? "";
    form.bairro = e.bairro ?? "";
    form.estado = e.estado ?? "";
    form.cidade = e.cidade ?? "";
    form.numero = e.numero ?? "";
    form.cep = formatarCEP(e.cep ?? "");
  } catch (error) {
    console.error("Erro ao carregar catequista:", error);
    router.push("/Catequista");
  }
}


    onMounted(() => {
      buscarComunidades();

      const idParam = route.params.id;
      const id = Number(idParam);
      if (!id) {
        console.error("ID não encontrado na URL");
        return;
      }
      carregarCatequista(id);
    });

    return {
      form,
      comunidades,
      isSideBarRecolhida
    };
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