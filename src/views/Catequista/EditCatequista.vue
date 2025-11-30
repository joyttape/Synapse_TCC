<template>
  <div class="page-wrapper">
    <div class="layout-container">

      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="form-page" :class="{ 'content-recolhido': isSideBarRecolhida }">

        <main class="page-content">
          <div class="container my-5">

            <div class="return-button-container">
              <button class="btn-return" @click="voltar">
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
                      <input v-model="form.telefone" type="text" class="form-control input-sim" placeholder="(00) 00000-0000" />
                    </div>

                    <div class="col-md-6 d-flex gap-3 mb-3 align-items-end">
                      <div class="flex-fill">
                        <label class="form-label">Data de Nascimento <span class="text-danger">*</span></label>
                        <input v-model="form.nascimento" type="text" class="form-control input-small" placeholder="dd/mm/aaaa" />
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
                        <input v-model="form.admissao" type="text" class="form-control input-small" placeholder="dd/mm/aaaa" />
                      </div>

                      <div class="flex-fill">
                        <label class="form-label">Formação <span class="text-danger">*</span></label>
                        <input v-model="form.formacao" type="text" class="form-control input-small" />
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Comunidade <span class="text-danger">*</span></label>
                      <select v-model="form.id_comunidade_fk" class="form-select input-small">
                        <option value="">Selecione</option>
                        <option v-for="c in comunidades" :key="c.id_comunidade" :value="c.id_comunidade">
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
                  <input v-model="form.cep" type="text" class="form-control input-small" placeholder="00000-000" />
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <button type="button" @click="confirmarSalvar" class="btn salvar-btn">Salvar dados </button>
            </div>

          </div>
        </main>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from '@/common/http';
import Swal from "sweetalert2";

import SideBar from "@/components/SideBar.vue";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const isSideBarRecolhida = ref(true);
const comunidades = ref([]);

const form = ref({
  id_usuario: null,
  nome: "",
  telefone: "",
  nascimento: "",
  email: "",
  sexo: "",
  ativo: false,
  admissao: "",
  formacao: "",
  id_comunidade_fk: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
  uf: "",
});

async function carregarComunidades() {
  const { data } = await api.get("/api/Comunidade");
  comunidades.value = data;
}

async function carregarCatequista() {
  try {
    const { data } = await api.get(`/api/Catequista/${id}`);

    const u = data.usuario ?? {};
    const e = u.endereco ?? {};

    form.value.id_usuario = u.id_usuario;
    form.value.nome = u.nome;
    form.value.telefone = u.telefone;
    form.value.email = u.email;
    form.value.sexo = u.sexo;
    form.value.ativo = u.ativo ?? false;
    form.value.nascimento = u.data_nascimento;
    form.value.admissao = data.data_admissao;
    form.value.formacao = data.formacao ?? "";
    form.value.id_comunidade_fk = u.comunidade?.id_comunidade ?? 0;

    form.value.logradouro = e.logradouro ?? "";
    form.value.numero = e.numero ?? "";
    form.value.complemento = e.complemento ?? "";
    form.value.bairro = e.bairro ?? "";
    form.value.cidade = e.cidade ?? "";
    form.value.estado = e.estado ?? "";
    form.value.cep = e.cep ?? "";
    form.value.uf = e.uf ?? "";

  } catch (err) {
    console.error("Erro ao carregar catequista:", err);
  }
}

async function voltar() {
  const confirmar = await Swal.fire({
    title: "Tem certeza?",
    text: "Se voltar agora, alterações não salvas serão perdidas.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, voltar",
    cancelButtonText: "Cancelar",
  });

  if (confirmar.isConfirmed) router.push("/Catequista");
}

async function confirmarSalvar() {
  const confirmar = await Swal.fire({
    title: "Confirmar edição?",
    text: "Deseja realmente salvar as alterações deste catequista?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sim, salvar",
    cancelButtonText: "Cancelar",
  });

  if (confirmar.isConfirmed) salvar();
}

async function salvar() {
  try {
    const payload = {
  id_catequista: Number(id),
  formacao: form.value.formacao,
  data_admissao: form.value.admissao.split("/").reverse().join("-"),
  usuario: {
    id_usuario: form.value.id_usuario,
    nome: form.value.nome,
    data_nascimento: form.value.nascimento.split("/").reverse().join("-"),
    telefone: form.value.telefone,
    email: form.value.email,
    sexo: form.value.sexo,
    ativo: Boolean(form.value.ativo),
    id_comunidade_fk: Number(form.value.id_comunidade_fk),
    endereco: {
      logradouro: form.value.logradouro,
      numero: form.value.numero,
      complemento: form.value.complemento,
      bairro: form.value.bairro,
      cidade: form.value.cidade,
      estado: form.value.estado,
      cep: form.value.cep,
      uf: form.value.uf ?? ""
    }
  }
};


    const response = await api.put(`/api/Catequista/${id}`, payload);

    Swal.fire({
    icon: "success",
    title: "Atualizado!",
    text: "Os dados do catequista foram salvos com sucesso.",
    confirmButtonText: "OK"
  }).then(() => {
  router.push("/Catequista");
});

    router.push("/Catequista");

  } catch (err) {
    console.error("Erro no PUT:", err);
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Payload enviado:", err.config?.data);
  }
}



onMounted(() => {
  carregarComunidades();
  carregarCatequista();
});
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