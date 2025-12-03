<template>
  <div class="page-wrapper">
    <div class="layout-container">
      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="form-page" :class="{ 'content-recolhido': isSideBarRecolhida }">
        <main class="page-content">
          <div class="container-form">

            <div class="return-button-container">
              <button class="btn-return" @click="voltar">
                ← Voltar
              </button>
            </div>

            <header class="form-header">
              <h1 class="titulo">Atualizar Turma</h1>
            </header>

            <div class="card form-card">
              <div class="card-body">
                <div class="row">

                  <div class="col-md-6 mb-4">
                    <label class="form-label">Nome da Turma <span class="text-danger">*</span></label>
                    <input v-model="form.nome" type="text" class="form-control" placeholder="Ex: Turma A" />
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Data <span class="text-danger">*</span></label>
                    <input v-model="form.data" type="date" class="form-control" placeholder="dd/mm/aaaa" />
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Idade Mínima / Máxima</label>
                    <div class="d-flex gap-2">
                      <input v-model.number="form.idadeMin" type="number" min="0" class="form-control" placeholder="Mín" />
                      <input v-model.number="form.idadeMax" type="number" min="0" class="form-control" placeholder="Máx" />
                    </div>
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Quantidade Catequizandos: <span class="text-danger">*</span></label>
                    <input v-model="form.quantidadecatequizando" type="text" class="form-control" placeholder="0" />
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Dia da Semana: <span class="text-danger">*</span></label>
                    <select v-model="form.diasemana" class="form-select">
                      <option value="Segunda-feira">Segunda-feira</option>
                      <option value="Terça-feira">Terça-feira</option>
                      <option value="Quarta-feira">Quarta-feira</option>
                      <option value="Quinta-feira">Quinta-feira</option>
                      <option value="Sexta-feira">Sexta-feira</option>
                      <option value="Sábado">Sábado</option>
                      <option value="Domingo">Domingo</option>
                    </select>
                  </div>

                  <div class="col-md-3 mb-4">
                          <label class="form-label">Ativo <span class="text-danger">*</span></label>
                          <select v-model="form.ativo" class="form-select input-small">
                            <option :value=true>Sim</option>
                            <option :value=false>Não</option>
                          </select>
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Horário Inic. / Horario Fim</label>
                    <div class="d-flex gap-2">
                      <input v-model="form.horarioini" type="time" class="form-control" placeholder="00:00" />
                      <input v-model="form.horariofim" type="time" class="form-control" placeholder="00:00" />
                    </div>
                  </div>

                  <div class="col-12 mb-3">
                    <label class="form-label">Catequistas <span class="text-danger">*</span></label>
                    <div class="catequista-input">
                      <div class="chips">
                        <template v-for="(c, idx) in catequistasSelected" :key="c.id">
                          <span class="chip">
                            {{ c.name }}
                            <button class="chip-remove" @click="removeCatequista(c.id)">×</button>
                          </span>
                        </template>
                        <input
                          v-if="catequistasSelected.length < 2"
                          v-model="catequistaSearch"
                          @focus="openCatequistaDropdown = true"
                          @input="filterCatequistas"
                          class="chip-input"
                          placeholder="Buscar catequista (máx 2)"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                      </div>

                      <div class="catequista-dropdown" v-if="openCatequistaDropdown">
                        <ul>
                          <li v-for="c in catequistasFiltered" :key="c.id" @click="toggleCatequista(c)">
                            <div class="line-left">{{ c.name }}</div>
                            <div class="line-right">{{ c.role || 'Catequista' }}</div>
                          </li>
                          <li v-if="catequistasFiltered.length === 0" class="empty">Nenhum resultado</li>
                        </ul>
                      </div>
                    </div>
                    <small class="muted">Máximo 2 catequistas.</small>
                  </div>

                  <div class="col-12 mb-4">
                    <label class="form-label">Catequizandos <span class="text-danger">*</span></label>
                    <div class="input-group">
                      <input
                        readonly
                        :value="catequizandosSelected.map(c => c.name).join(', ')"
                        @focus="openModal()"
                        placeholder="Clique para buscar e adicionar catequizandos"
                        class="form-control"
                      />
                      <span class="input-group-text" @click="openModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                      </span>
                    </div>
                    <div class="selected-list">
                      <template v-for="p in catequizandosSelected" :key="p.id">
                        <span class="pill">{{ p.name }} <button @click="removeCatequizando(p.id)">×</button></span>
                      </template>
                    </div>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Descrição</label>
                    <textarea v-model="form.descricao" class="form-control" rows="3" placeholder="Escreva aqui..."></textarea>
                  </div>

                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end mt-4">
              <button class="btn-return" @click="save">Salvar alterações de turma</button>
            </div>
          </div>
        </main>
      </div>

      <transition name="fade">
        <div class="modal-overlay" v-if="modalOpen" @click.self="closeModal">
          <div class="modal-card">
            <div class="modal-search">
              <input v-model="modalSearch" @input="filterModal" placeholder="Buscar catequizandos..." />
              <button class="btn-icon" @click="clearModalSearch">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </button>
            </div>

            <div class="modal-list">
              <ul>
                <li v-for="person in modalFiltered" :key="person.id" class="modal-row">
                  <div class="row-left">
                    <div class="meta">
                      <div class="name">{{ person.name }}</div>
                      <div class="sub">{{ person.datanascimento }} • {{ person.sexo }} - {{ person.email }}</div>
                    </div>
                  </div>
                  <div class="row-right">
                    <input type="checkbox" :value="person.id" v-model="modalSelectedIds" />
                  </div>
                </li>
              </ul>
            </div>

            <div class="modal-actions">
              <button class="btn-outline" @click="closeModal">Cancelar</button>
              <button class="btn-primary" @click="addSelectedToTurma">Adicionar à turma ({{ modalSelectedIds.length }})</button>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import SideBar from "@/components/SideBar.vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "@/common/http";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const isSideBarRecolhida = true;


const form = ref({
  id_turma: "",
  nome: "",
  descricao: "",
  data: "",
  idadeMin: 0,
  idadeMax: 0,
  quantidadecatequizando: 0,
  diasemana: "",
  ativo: true,
  horarioini: "",
  horariofim: "",
  id_comunidade_fk: ""
});


const listaCatequistas = ref<any[]>([]);
const listaCatequizandos = ref<any[]>([]);


const catequistasSelected = ref<any[]>([]);
const catequistaSearch = ref("");
const catequistasFiltered = ref<any[]>([]);
const openCatequistaDropdown = ref(false);

function filterCatequistas() {
  openCatequistaDropdown.value = true;

  catequistasFiltered.value = listaCatequistas.value.filter((c) =>
    c.name.toLowerCase().includes(catequistaSearch.value.toLowerCase())
  );
}

function toggleCatequista(c: any) {
  if (catequistasSelected.value.some((x) => x.id === c.id)) {
    catequistasSelected.value = catequistasSelected.value.filter((x) => x.id !== c.id);
  } else {
    if (catequistasSelected.value.length < 2) {
      catequistasSelected.value.push(c);
    }
  }

  openCatequistaDropdown.value = false;
}

function removeCatequista(id: number) {
  catequistasSelected.value = catequistasSelected.value.filter((c) => c.id !== id);
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!target.closest(".select-catequista")) {
    openCatequistaDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});


const catequizandosSelected = ref<any[]>([]);

const modalOpen = ref(false);
const modalSearch = ref("");
const modalFiltered = ref<any[]>([]);
const modalSelectedIds = ref<any[]>([]);

function openModal() {
  modalOpen.value = true;
  modalFiltered.value = listaCatequizandos.value;
}

function closeModal() {
  modalOpen.value = false;
  modalSelectedIds.value = [];
}

function filterModal() {
  modalFiltered.value = listaCatequizandos.value.filter((p) =>
    p.name.toLowerCase().includes(modalSearch.value.toLowerCase())
  );
}

function clearModalSearch() {
  modalSearch.value = "";
  modalFiltered.value = listaCatequizandos.value;
}

function addSelectedToTurma() {
  modalSelectedIds.value.forEach((idSel) => {
    const item = listaCatequizandos.value.find((p) => p.id === idSel);
    if (item && !catequizandosSelected.value.some((x) => x.id === item.id)) {
      catequizandosSelected.value.push(item);
    }
  });

  closeModal();
}

function removeCatequizando(id: number) {
  catequizandosSelected.value = catequizandosSelected.value.filter((p) => p.id !== id);
}


async function carregarCatequistas() {
  const { data } = await api.get("/api/Catequista");

  listaCatequistas.value = data.map((c: any) => ({
    id: c.id_catequista,
    name: c.usuario?.nome || "Sem nome",
    role: "Catequista"
  }));

  catequistasFiltered.value = listaCatequistas.value;
}

async function carregarCatequizandos() {
  const { data } = await api.get("/api/Catequizando");

  listaCatequizandos.value = data.map((q: any) => ({
    id: q.id_catequizando,
    name: q.usuario?.nome || "Sem nome",
    email: q.usuario?.email || "",
    sexo: q.usuario?.sexo || "",
    datanascimento: q.usuario?.data_nascimento || ""
  }));

  modalFiltered.value = listaCatequizandos.value;
}

async function carregarTurma() {
  const { data } = await api.get(`/api/Turma/${id}`);

  form.value.id_turma = data.id_turma;
  form.value.nome = data.nome;
  form.value.descricao = data.descricao;
  form.value.data = data.dataturma?.split("T")[0] ?? "";
  form.value.idadeMin = data.idademin;
  form.value.idadeMax = data.idademax;
  form.value.quantidadecatequizando = data.limitecatequizando;
  form.value.ativo = data.status;
  form.value.diasemana = data.diasemana;
  form.value.horarioini = data.horarioinicial;
  form.value.horariofim = data.horariofinal;
  form.value.id_comunidade_fk = data.id_comunidade_fk;

  catequistasSelected.value = data.catequistas.map((c: any) => ({
    id: c.id_catequista,
    name: c.usuario?.nome || "Sem nome"
  }));

  catequizandosSelected.value = data.catequizandos.map((q: any) => ({
    id: q.id_catequizando,
    name: q.usuario?.nome,
    email: q.usuario?.email,
    sexo: q.usuario?.sexo,
    datanascimento: q.usuario?.data_nascimento
  }));
}


async function save() {
  try {
    const confirm = await Swal.fire({
      title: "Confirmar alterações?",
      text: "Deseja realmente salvar as alterações desta turma?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, salvar",
      cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return;

    const toFullTimeString = (value: string) => {
      if (!value) return null;
      const [h, m] = value.split(':');
      return `${h.padStart(2,'0')}:${m.padStart(2,'0')}:00`;
    };

    const payload = {
      id_turma: form.value.id_turma,
      nome: form.value.nome,
      descricao: form.value.descricao,
      dataturma: form.value.data,
      idademin: form.value.idadeMin,
      idademax: form.value.idadeMax,
      limitecatequizando: Number(form.value.quantidadecatequizando),
      status: form.value.ativo,
      diasemana: form.value.diasemana,
      horarioinicial: toFullTimeString(form.value.horarioini),
      horariofinal: toFullTimeString(form.value.horariofim),
      id_catequistas: catequistasSelected.value.map(c => c.id),
      catequizandos_ids: catequizandosSelected.value.map(c => c.id),
      id_comunidade_fk: form.value.id_comunidade_fk || null
    };

    console.log("Payload PUT:", payload);

    await api.put(`/api/Turma/${form.value.id_turma}`, payload);

    await Swal.fire({
      title: "Salvo!",
      text: "A turma foi atualizada com sucesso.",
      icon: "success"
    });

    router.push(`/Turma/DetalhesTurma/${form.value.id_turma}`);
    
  } catch (error: any) {
    console.error("ERRO AO ATUALIZAR:", error);

    const apiMessage =
      error.response?.data?.message ||
      error.response?.data?.erro ||
      error.response?.data?.error ||
      JSON.stringify(error.response?.data) ||
      "Erro inesperado ao atualizar a turma.";

    Swal.fire({
      icon: 'error',
      title: 'Erro ao atualizar',
      text: apiMessage
    });
  }
}

async function voltar() {
  const confirm = await Swal.fire({
    title: "Cancelar alterações?",
    text: "Nada será salvo.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sim, voltar",
    cancelButtonText: "Continuar editando"
  });

  if (confirm.isConfirmed) {
    router.push(`/Turma/DetalhesTurma/${form.value.id_turma}`);
  }
}

onMounted(async () => {
  await carregarCatequistas();
  await carregarCatequizandos();
  await carregarTurma();
});
</script>


<style scoped>
.page-wrapper { 
  display:flex; 
  width:100%; 
  min-height:100vh; 
  background:#f7f8fb;
 }

.layout-container { 
  display:flex;
   width:100%; 
}

.form-page { 
  flex:1; 
  transition: margin-left .28s ease;
   padding:40px; 
  }


.content-recolhido { 
  margin-left:80px;
 }


.container-form { 
  max-width:1100px; 
  margin:0 auto; 
}

.return-button-container { 
  margin-bottom: 1rem; 
}

.btn-return { 
  border:1.5px solid #0d6efd; 
  color:#0d6efd; 
  background:transparent; 
  border-radius:25px; 
  padding:8px 18px; 
  text-decoration:none; 
}

.btn-return:hover { 
  background:#0d6efd; 
  color:#fff; 
}

.titulo { 
  font-size:1.9rem; 
  font-weight:700; 
  margin-bottom: .6rem; 
}

.form-card { 
  border-radius:12px; 
  border:1px solid #eef0f3; 
  background:#fff; 
  box-shadow:0 8px 30px rgba(15,23,42,0.06); 
}

.card-body { 
  padding: 32px 32px 40px 32px; 
}

.form-label { 
  display:block; 
  margin-bottom:.5rem; 
  font-weight:600; 
  color:#333; 
}

.form-control, .form-select { 
  background:#f3f6fb;
   border:1px solid #e6eef9; 
   border-radius:10px; 
   height:44px; 
   padding:8px 12px; 
  }

.form-control:focus { 
  outline:none; 
  box-shadow:0 0 0 3px rgba(13,110,253,0.08); 
  background:#fff; 
}

.catequista-input { position: relative;
  width: 100%; }
.chips {
  min-height: 44px;
  background: #f3f6fb;
  border: 1px solid #e6eef9;
  border-radius: 10px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.chip { 
  background:#0d6efd; color:#fff; 
  padding:6px 10px; border-radius:999px; 
  display:inline-flex; align-items:center; 
  gap:.5rem; font-weight:600; 
}

.chip-remove { 
  background:transparent; 
  border:none; color:#fff; 
  font-size:16px; 
  cursor:pointer; 
  margin-left:6px; 
}

.chip-input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  min-width: 160px;
  height: 32px;
  font-size: 15px;
}

.catequista-dropdown { 
  position:absolute; 
  left:0; 
  top:calc(100% + 8px); 
  width:420px; 
  max-height:260px; 
  overflow:auto; 
  background:#fff; 
  border-radius:12px;
   box-shadow:0 10px 30px rgba(2,6,23,0.08); 
   border:1px solid #eef0f3; z-index:20; 
  }

.catequista-dropdown ul { 
  list-style:none; 
  margin:0; 
  padding:8px;
 }

.catequista-dropdown li { 
  padding:10px 12px; 
  display:flex; 
  justify-content:space-between; 
  cursor:pointer; 
  border-radius:8px; 
}

.catequista-dropdown li:hover { 
  background:#f6f8ff; 
}

.catequista-dropdown .empty { 
  color:#9aa4b2; 
  padding:12px; 
}

.selected-list { 
  margin-top:.6rem; 
  display:flex; 
  gap:.5rem; 
  flex-wrap:wrap; 
}

.pill { 
  background:#e6f0ff; 
  color:#0b62c9; 
  padding:6px 10px; 
  border-radius:999px; 
  font-weight:600; 
  display:inline-flex; 
  align-items:center; 
  gap:.5rem; 
}

.pill button { 
  background:transparent; 
  border:none; 
  cursor:pointer; 
  color:#0b62c9; 
  font-weight:700; 
}

.modal-overlay { 
  position:fixed; 
  inset:0; 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  background:rgba(10,12,20,0.35);
   z-index:1000; 
   padding:40px; 
  }
.modal-card { 
  width:100%; 
  max-width:980px; 
  background:#fff; 
  border-radius:24px;
   box-shadow:0 20px 60px rgba(2,6,23,0.12); 
   overflow:hidden; 
   display:flex; 
   flex-direction:column; 
  }

.modal-search { 
  padding:22px 28px; 
  display:flex; 
  gap:10px; 
  align-items:center; 
  border-bottom:1px solid #f1f4f8; 
}

.modal-search input { 
  flex:1; 
  height:48px; 
  border-radius:999px; 
  border:1px solid #e9eef6; 
  padding:10px 16px; 
  background:#f7fbff; 
}

.btn-icon { 
  background:transparent; 
  border:none; 
  cursor:pointer; 
  width:40px; 
  height:40px; 
  display:inline-flex; 
  align-items:center; 
  justify-content:center; 
}

.modal-list { 
  padding:12px 20px; 
  max-height:520px; 
  overflow:auto;
 }


.modal-list ul { 
  list-style:none; 
  margin:0; padding:0; 
}

.modal-row { 
  display:flex; 
  align-items:center; 
  justify-content:space-between; 
  background:#fff; 
  padding:12px; 
  margin-bottom:12px; 
  border-radius:12px; 
  box-shadow:0 6px 18px rgba(2,6,23,0.04); 
}

.row-left { 
  display:flex; 
  gap:12px; 
  align-items:center;
 }

.avatar { 
  width:46px; 
  height:46px; 
  background-size:cover; 
  background-position:center; 
  border-radius:10px; 
}

.meta .name { font-weight:600; }

.meta .sub { 
  color:#7b8aa3; 
  font-size:.9rem; 
  margin-top:2px; 
}

.row-right input[type='checkbox'] { width:18px; height:18px; }

.modal-actions { 
  padding:16px 22px; 
  display:flex; 
  justify-content:flex-end; 
  gap:12px; 
  border-top:1px solid #f1f4f8; 
}

.btn-outline { 
  background:transparent; 
  border:1.2px solid #cbd6e6; 
  padding:8px 14px; 
  border-radius:10px; 
}

.btn-primary { 
  background:#0d6efd; 
  color:#fff; 
  border:none; 
  padding:8px 14px; 
  border-radius:10px; 
}

.fade-enter-active, .fade-leave-active { 
  transition: opacity .18s ease; 
}
.fade-enter-from, .fade-leave-to { 
  opacity:0; 
}

@media (max-width: 900px) {
  .modal-card { margin: 12px; width: calc(100% - 24px); max-width: calc(100% - 24px); }
  .catequista-dropdown { width: calc(100% - 40px); }
}
</style>
