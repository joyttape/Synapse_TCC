<template>
  <div class="page-wrapper">
    <div class="layout-container">
      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="form-page" :class="{ 'content-recolhido': isSideBarRecolhida }">
        <main class="page-content">
          <div class="container-form">

            <div class="return-button-container">
              <RouterLink to="/Turma" class="btn-return">&larr; Voltar para Turmas</RouterLink>
            </div>

            <header class="form-header">
              <h1 class="titulo">Cadastro de Turma</h1>
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
                    <input v-model="form.data" type="text" class="form-control" placeholder="dd/mm/aaaa" />
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Idade Mínima / Máxima</label>
                    <div class="d-flex gap-2">
                      <input v-model.number="form.idadeMin" type="number" min="0" class="form-control" placeholder="Mín" />
                      <input v-model.number="form.idadeMax" type="number" min="0" class="form-control" placeholder="Máx" />
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
              <button class="btn-return" @click="save">Salvar turma</button>
            </div>
          </div>
        </main>
      </div>

      <!-- Modal (fullscreen-like overlay) -->
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
                    <div class="avatar" :style="{ 'background-image': 'url(' + person.avatar + ')' }"></div>
                    <div class="meta">
                      <div class="name">{{ person.name }}</div>
                      <div class="sub">{{ person.dob }} • {{ person.gender }}</div>
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

<script>
import SideBar from '@/components/SideBar.vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'TurmaForm',
  components: { SideBar, RouterLink },
  data() {
    return {
      isSideBarRecolhida: true,
      form: {
        nome: '',
        data: '',
        idadeMin: null,
        idadeMax: null,
        descricao: ''
      },

      // Catequistas (chips, max 2)
      catequistasAll: [
        { id: 1, name: 'João Zé da Silva', role: 'Coordenador' },
        { id: 2, name: 'Maria Rosana', role: 'Auxiliar' },
        { id: 3, name: 'Carlos Pereira', role: 'Catequista' }
      ],
      catequistasSelected: [],
      catequistaSearch: '',
      openCatequistaDropdown: false,
      catequistasFiltered: [],

      // Modal / catequizandos
      modalOpen: false,
      modalSearch: '',
      modalSelectedIds: [],
      catequizandosAll: [],
      catequizandosSelected: [],
      modalFiltered: []
    };
  },
  mounted() {
    // inicializa filtros
    this.catequistasFiltered = this.catequistasAll;

    // dados fictícios de catequizandos (pode vir da API)
    const avatarA = '/mnt/data/a6dcc1ca-a257-44d7-965d-ed89fb53eca8.png';
    const avatarB = '/mnt/data/e8e8604a-b110-4fce-8836-12f1054e2e0c.png';

    this.catequizandosAll = Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      name: ['João Pé de Feijão', 'Ana Clara', 'Pedro Silva', 'Mariana Costa', 'Lucas Rocha', 'Beatriz Lima'][i % 6] + (i > 5 ? ' ' + (i - 5) : ''),
      dob: '15/03/1990',
      gender: i % 2 === 0 ? 'Masculino' : 'Feminino',
      avatar: i % 2 === 0 ? avatarA : avatarB
    }));

    this.modalFiltered = this.catequizandosAll;
  },
  methods: {
    // Catequistas
    filterCatequistas() {
      const q = this.catequistaSearch.trim().toLowerCase();
      if (!q) this.catequistasFiltered = this.catequistasAll;
      else this.catequistasFiltered = this.catequistasAll.filter(c => c.name.toLowerCase().includes(q));
    },
    toggleCatequista(c) {
      const exists = this.catequistasSelected.find(x => x.id === c.id);
      if (exists) {
        this.catequistasSelected = this.catequistasSelected.filter(x => x.id !== c.id);
      } else {
        if (this.catequistasSelected.length >= 2) {
          // opcional: notificar usuário
          return;
        }
        this.catequistasSelected.push(c);
      }
      this.catequistaSearch = '';
      this.openCatequistaDropdown = false;
    },
    removeCatequista(id) {
      this.catequistasSelected = this.catequistasSelected.filter(c => c.id !== id);
    },

    // Modal / catequizandos
    openModal() {
      this.modalOpen = true;
      this.$nextTick(() => {
        this.modalSearch = '';
        this.modalSelectedIds = this.catequizandosSelected.map(p => p.id);
        this.modalFiltered = this.catequizandosAll;
      });
    },
    closeModal() {
      this.modalOpen = false;
    },
    filterModal() {
      const q = this.modalSearch.trim().toLowerCase();
      if (!q) this.modalFiltered = this.catequizandosAll;
      else this.modalFiltered = this.catequizandosAll.filter(p => p.name.toLowerCase().includes(q));
    },
    clearModalSearch() {
      this.modalSearch = '';
      this.filterModal();
    },
    addSelectedToTurma() {
      const selected = this.modalSelectedIds.map(id => this.catequizandosAll.find(p => p.id === id)).filter(Boolean);
      // evita duplicatas
      const idsSelecionados = new Set(this.catequizandosSelected.map(p => p.id));
      selected.forEach(s => { if (!idsSelecionados.has(s.id)) this.catequizandosSelected.push(s); });
      this.modalOpen = false;
    },
    removeCatequizando(id) {
      this.catequizandosSelected = this.catequizandosSelected.filter(p => p.id !== id);
    },

    // salvar
    save() {
      // aqui você faria a validação e o envio pra API
      const payload = {
        ...this.form,
        catequistas: this.catequistasSelected.map(c => c.id),
        catequizandos: this.catequizandosSelected.map(p => p.id)
      };
      console.log('Salvar payload', payload);
      alert('Dados prontos para salvar (veja console).');
    }
  }
};
</script>

<style scoped>
.page-wrapper { display:flex; width:100%; min-height:100vh; background:#f7f8fb; }
.layout-container { display:flex; width:100%; }

.form-page { flex:1; transition: margin-left .28s ease; padding:40px; }
.content-recolhido { margin-left:80px; }
.container-form { max-width:1100px; margin:0 auto; }

.return-button-container { margin-bottom: 1rem; }
.btn-return { border:1.5px solid #0d6efd; color:#0d6efd; background:transparent; border-radius:25px; padding:8px 18px; text-decoration:none; }
.btn-return:hover { background:#0d6efd; color:#fff; }

.titulo { font-size:1.9rem; font-weight:700; margin-bottom: .6rem; }

.form-card { border-radius:12px; border:1px solid #eef0f3; background:#fff; box-shadow:0 8px 30px rgba(15,23,42,0.06); }
.card-body { padding: 32px 32px 40px 32px; }

.form-label { display:block; margin-bottom:.5rem; font-weight:600; color:#333; }
.form-control, .form-select { background:#f3f6fb; border:1px solid #e6eef9; border-radius:10px; height:44px; padding:8px 12px; }
.form-control:focus { outline:none; box-shadow:0 0 0 3px rgba(13,110,253,0.08); background:#fff; }

/* Catequista chips */
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

.chip { background:#0d6efd; color:#fff; padding:6px 10px; border-radius:999px; display:inline-flex; align-items:center; gap:.5rem; font-weight:600; }
.chip-remove { background:transparent; border:none; color:#fff; font-size:16px; cursor:pointer; margin-left:6px; }
.chip-input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  min-width: 160px;
  height: 32px;
  font-size: 15px;
}

.catequista-dropdown { position:absolute; left:0; top:calc(100% + 8px); width:420px; max-height:260px; overflow:auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(2,6,23,0.08); border:1px solid #eef0f3; z-index:20; }
.catequista-dropdown ul { list-style:none; margin:0; padding:8px; }
.catequista-dropdown li { padding:10px 12px; display:flex; justify-content:space-between; cursor:pointer; border-radius:8px; }
.catequista-dropdown li:hover { background:#f6f8ff; }
.catequista-dropdown .empty { color:#9aa4b2; padding:12px; }

/* selected list pills */
.selected-list { margin-top:.6rem; display:flex; gap:.5rem; flex-wrap:wrap; }
.pill { background:#e6f0ff; color:#0b62c9; padding:6px 10px; border-radius:999px; font-weight:600; display:inline-flex; align-items:center; gap:.5rem; }
.pill button { background:transparent; border:none; cursor:pointer; color:#0b62c9; font-weight:700; }

/* Modal overlay */
.modal-overlay { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(10,12,20,0.35); z-index:1000; padding:40px; }
.modal-card { width:100%; max-width:980px; background:#fff; border-radius:24px; box-shadow:0 20px 60px rgba(2,6,23,0.12); overflow:hidden; display:flex; flex-direction:column; }
.modal-search { padding:22px 28px; display:flex; gap:10px; align-items:center; border-bottom:1px solid #f1f4f8; }
.modal-search input { flex:1; height:48px; border-radius:999px; border:1px solid #e9eef6; padding:10px 16px; background:#f7fbff; }
.btn-icon { background:transparent; border:none; cursor:pointer; width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center; }

.modal-list { padding:12px 20px; max-height:520px; overflow:auto; }
.modal-list ul { list-style:none; margin:0; padding:0; }
.modal-row { display:flex; align-items:center; justify-content:space-between; background:#fff; padding:12px; margin-bottom:12px; border-radius:12px; box-shadow:0 6px 18px rgba(2,6,23,0.04); }
.row-left { display:flex; gap:12px; align-items:center; }
.avatar { width:46px; height:46px; background-size:cover; background-position:center; border-radius:10px; }
.meta .name { font-weight:600; }
.meta .sub { color:#7b8aa3; font-size:.9rem; margin-top:2px; }
.row-right input[type='checkbox'] { width:18px; height:18px; }

.modal-actions { padding:16px 22px; display:flex; justify-content:flex-end; gap:12px; border-top:1px solid #f1f4f8; }
.btn-outline { background:transparent; border:1.2px solid #cbd6e6; padding:8px 14px; border-radius:10px; }
.btn-primary { background:#0d6efd; color:#fff; border:none; padding:8px 14px; border-radius:10px; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity:0; }

@media (max-width: 900px) {
  .modal-card { margin: 12px; width: calc(100% - 24px); max-width: calc(100% - 24px); }
  .catequista-dropdown { width: calc(100% - 40px); }
}
</style>
