<template>
  <div class="page-wrapper">
    <div class="layout-container">
      <SideBar v-model:recolhida="isSideBarRecolhida" />
      <div class="form-page" :class="{ 'content-recolhido': isSideBarRecolhida }">
        <main class="page-content">
          <div class="container-form">

            <div class="return-button-container">
              <RouterLink to="/Documento" class="btn-return">
                &larr; Voltar para Documentos
              </RouterLink>
            </div>

            <header class="form-header">
              <h1 class="titulo">Cadastro de Documento</h1>
            </header>

            <div class="card form-card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-5 mb-4">
                    <label class="form-label">Nome do Documento <span class="text-danger">*</span></label>
                    <input v-model="form.nome" type="text" class="form-control" />
                  </div>

                  <div class="col-md-4 mb-4">
                    <label class="form-label">Tipo <span class="text-danger">*</span></label>
                    <select v-model="form.tipo" class="form-select">
                      <option disabled value="">Selecione</option>
                      <option value="Certidao">Certidão</option>
                      <option value="Aviso">Aviso</option>
                      <option value="Desenho">Desenho</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Data <span class="text-danger">*</span></label>
                    <input v-model="form.data" type="text" class="form-control" placeholder="dd/mm/yyyy" @input="mascararData" maxlength="10" />
                  </div>

                  <div class="col-md-6 mb-4">
                    <label class="form-label">Vincular a um usuário</label>
                    <div class="input-group">
                      <input 
                        readonly
                        :value="usuariosSelected.map(u => u.nome).join(', ')"
                        @focus="openModalUsuario"
                        placeholder="Clique para buscar e adicionar usuários"
                        class="form-control"
                      />
                      <span class="input-group-text" @click="openModalUsuario" style="cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                      </span>
                    </div>
                    <div class="selected-list mt-2">
                      <span class="pill" v-for="u in usuariosSelected" :key="u.id">{{ u.nome }} <button @click="removeUsuario(u.id)">×</button></span>
                    </div>
                  </div>

                  <div class="col-md-6 mb-4">
                    <label class="form-label">Vincular a uma turma</label>
                    <div class="input-group">
                      <input 
                        readonly
                        :value="turmasSelected.map(t => t.nome).join(', ')"
                        @focus="openModalTurma"
                        placeholder="Clique para buscar e adicionar turmas"
                        class="form-control"
                      />
                      <span class="input-group-text" @click="openModalTurma" style="cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                      </span>
                    </div>
                    <div class="selected-list mt-2">
                      <span class="pill" v-for="t in turmasSelected" :key="t.id">{{ t.nome }} <button @click="removeTurma(t.id)">×</button></span>
                    </div>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Descrição <span class="text-danger">*</span></label>
                    <textarea v-model="form.descricao" class="form-control" rows="3" placeholder="Escreva aqui"></textarea>
                  </div>

                </div>
              </div>
            </div>

	            <div class="upload-area" @dblclick="abrirExplorer">
	              <div class="upload-content">
	                <img src="/src/assets/icones/acoes/documento.svg" class="upload-icon" />
	                <p v-if="!arquivoSelecionado">Dê dois cliques para abrir o explorar</p>
	                <p v-else class="text-success">Arquivo selecionado: <strong>{{ arquivoSelecionado.name }}</strong></p>
	              </div>
	            </div>

            <input 
	              type="file" 
	              ref="inputArquivo"
	              style="display: none"
	              @change="selecionarArquivo"
	              accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
	            />

            <div class="d-flex justify-content-end mt-4">
              <button class="btn salvar-btn" @click="salvarDocumento">
                Salvar documento
              </button>
            </div>

          </div>
        </main>
	      </div>
	    </div>

	    <transition name="fade">
	      <div class="modal-overlay" v-if="modalUsuariosAberto" @click.self="closeModalUsuario">
	        <div class="modal-card">
	          <div class="modal-search">
	            <input v-model="modalUsuarioSearch" @input="filterModalUsuario" placeholder="Buscar usuários..." />
	            <button class="btn-icon" @click="modalUsuarioSearch = ''; filterModalUsuario()">
	              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
	                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
	              </svg>
	            </button>
	          </div>

		          <div class="modal-list">
		            <ul>
		              <li v-for="u in modalUsuarioFiltered" :key="u.id" class="modal-row">
		                <div class="row-left">
		                  <div class="meta">
		                    <div class="name">{{ u.nome }}</div>
		                  </div>
		                </div>
		                <div class="row-right">
		                  <input type="checkbox" :value="u.id" v-model="modalUsuarioSelectedIds" @click.stop />
		                </div>
		              </li>
		              <li v-if="modalUsuarioFiltered.length === 0" class="empty">Nenhum resultado encontrado.</li>
		            </ul>
		          </div>

		          <div class="modal-actions">
		            <button class="btn-outline" @click="closeModalUsuario">Cancelar</button>
		            <button class="btn-primary" @click="addSelectedUsuarios">Adicionar usuários ({{ modalUsuarioSelectedIds.length }})</button>
		          </div>
	        </div>
	      </div>
	    </transition>

	    <transition name="fade">
	      <div class="modal-overlay" v-if="modalTurmasAberto" @click.self="closeModalTurma">
	        <div class="modal-card">
	          <div class="modal-search">
	            <input v-model="modalTurmaSearch" @input="filterModalTurma" placeholder="Buscar turmas..." />
	            <button class="btn-icon" @click="modalTurmaSearch = ''; filterModalTurma()">
	              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
	                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
	              </svg>
	            </button>
	          </div>

	          <div class="modal-list">
	            <ul>
		              <li v-for="t in modalTurmaFiltered" :key="t.id" class="modal-row" @click="toggleTurmaSelection(t.id)">
		                <div class="row-left">
		                  <div class="meta">
		                    <div class="name">{{ t.nome }}</div>
		                    <div class="sub" v-if="t.diasemana">{{ t.diasemana }} - {{ t.horarioinicial }}</div>
		                  </div>
		                </div>
		                <div class="row-right">
		                  <input type="checkbox" :value="t.id" v-model="modalTurmaSelectedIds" @click.stop />
		                </div>
		              </li>
	              <li v-if="modalTurmaFiltered.length === 0" class="empty">Nenhuma turma encontrada.</li>
	            </ul>
	          </div>

		          <div class="modal-actions">
		            <button class="btn-outline" @click="closeModalTurma">Cancelar</button>
		            <button class="btn-primary" @click="addSelectedTurmas">Adicionar turmas ({{ modalTurmaSelectedIds.length }})</button>
		          </div>
	        </div>
	      </div>
	    </transition>

	  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import SideBar from "@/components/SideBar.vue";
import { api } from "@/common/http";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';

interface Usuario {
  id: number;
  nome: string;
}

interface Turma {
  id: number;
  nome: string;
}

export default defineComponent({
  name: "DocumentoForm",
  components: { SideBar },

  setup() {
    const isSideBarRecolhida = ref(true);

    const router = useRouter();
    const usuarios = ref<Usuario[]>([]);
    const turmas = ref<Turma[]>([]);

    const modalUsuarioSearch = ref('');
    const modalUsuarioFiltered = ref<Usuario[]>([]);
    const modalTurmaSearch = ref('');
    const modalTurmaFiltered = ref<Turma[]>([]);

    const usuariosSelected = ref<Usuario[]>([]);
    const turmasSelected = ref<Turma[]>([]);
    const modalUsuarioSelectedIds = ref<number[]>([]);
    const modalTurmaSelectedIds = ref<number[]>([]);

    const arquivoSelecionado = ref<File | null>(null);

    const form = ref({
      nome: "",
      tipo: "",
      data: "",
      usuarioIds: [] as number[],
      turmaIds: [] as number[],
      descricao: "",
    });

    const modalUsuariosAberto = ref(false);
    const modalTurmasAberto = ref(false);

    const inputArquivo = ref<HTMLInputElement | null>(null);

    const openModalUsuario = () => {
      modalUsuarioSelectedIds.value = usuariosSelected.value.map(u => u.id);
      modalUsuariosAberto.value = true;
      modalUsuarioFiltered.value = usuarios.value;
      modalUsuarioSearch.value = '';
    };

    const closeModalUsuario = () => {
      modalUsuariosAberto.value = false;
    };

    const filterModalUsuario = () => {
      const term = modalUsuarioSearch.value.toLowerCase();
      modalUsuarioFiltered.value = usuarios.value.filter(u =>
        u.nome.toLowerCase().includes(term)
      );
    };

    const toggleUsuarioSelection = (id: number) => {
      if (modalUsuarioSelectedIds.value.includes(id)) {
        modalUsuarioSelectedIds.value = modalUsuarioSelectedIds.value.filter((selectedId) => selectedId !== id);
      } else {
        modalUsuarioSelectedIds.value = [id];
      }
    };


    const addSelectedUsuarios = () => {
      usuariosSelected.value = usuarios.value.filter(u =>
        modalUsuarioSelectedIds.value.includes(u.id)
      );
      form.value.usuarioIds = usuariosSelected.value.map(u => u.id);
      closeModalUsuario();
    };

    const removeUsuario = (id: number) => {
      usuariosSelected.value = usuariosSelected.value.filter(u => u.id !== id);
      form.value.usuarioIds = usuariosSelected.value.map(u => u.id);
    };

    const openModalTurma = () => {
      modalTurmaSelectedIds.value = turmasSelected.value.map(t => t.id);
      modalTurmasAberto.value = true;
      modalTurmaFiltered.value = turmas.value;
      modalTurmaSearch.value = '';
    };

    const closeModalTurma = () => {
      modalTurmasAberto.value = false;
    };

    const filterModalTurma = () => {
      const term = modalTurmaSearch.value.toLowerCase();
      modalTurmaFiltered.value = turmas.value.filter(t =>
        t.nome.toLowerCase().includes(term)
      );
    };

    const toggleTurmaSelection = (id: number) => {
      const index = modalTurmaSelectedIds.value.indexOf(id);
      if (index > -1) {
        modalTurmaSelectedIds.value.splice(index, 1);
      } else {
        modalTurmaSelectedIds.value.push(id);
      }
    };

    const addSelectedTurmas = () => {
      turmasSelected.value = turmas.value.filter(t =>
        modalTurmaSelectedIds.value.includes(t.id)
      );
      form.value.turmaIds = turmasSelected.value.map(t => t.id);
      closeModalTurma();
    };

    const removeTurma = (id: number) => {
      turmasSelected.value = turmasSelected.value.filter(t => t.id !== id);
      form.value.turmaIds = turmasSelected.value.map(t => t.id);
    };

    const mascararData = (event: Event) => {
      let valor = (event.target as HTMLInputElement).value;
      valor = valor.replace(/\D/g, "");
      if (valor.length <= 2) {
        valor = valor.replace(/(\d{2})/, "$1");
      } else if (valor.length <= 4) {
        valor = valor.replace(/(\d{2})(\d{2})/, "$1/$2");
      } else {
        valor = valor.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
      }
      (event.target as HTMLInputElement).value = valor;
    };

    const abrirExplorer = () => {
      inputArquivo.value?.click();
    };

    const selecionarArquivo = (event: Event) => {
      const arquivo = (event.target as HTMLInputElement).files?.[0];
      if (arquivo) {
        arquivoSelecionado.value = arquivo;
      }
    };

    onMounted(async () => {
  try {
    const { data: catequistasData } = await api.get("/api/Catequista");
    const { data: catequizandosData } = await api.get("/api/Catequizando");
    const { data: turmasData } = await api.get("/api/Turma");

    usuarios.value = [
      ...catequistasData.map((x: any) => ({
        id: x.usuario.id_usuario || x.id,
        nome: x.usuario?.nome || x.nome,
      })),
      ...catequizandosData.map((x: any) => ({
        id: x.usuario.id_usuario || x.id,
        nome: x.usuario?.nome || x.nome,
      })),
    ];

    console.log('Usuários:', usuarios.value); 

    turmas.value = turmasData.map((t: any) => ({
      id: t.id_turma || t.id,
      nome: t.nome,
    }));

  } catch (err) {
    console.error("Erro ao carregar listas:", err);
    Swal.fire({
      icon: "error",
      title: "Erro ao carregar dados",
      text: "Não foi possível obter usuários ou turmas.",
      confirmButtonColor: "#d33",
    });
  }
});


   const salvarDocumento = async () => {
  if (!form.value.nome || !form.value.tipo || !form.value.data || !form.value.descricao) {
    Swal.fire({
      icon: "warning",
      title: "Preencha todos os campos obrigatórios.",
      confirmButtonColor: "#f0ad4e",
    });
    return;
  }

  if (!arquivoSelecionado.value) {
    Swal.fire({
      icon: "warning",
      title: "Selecione um arquivo para enviar.",
      confirmButtonColor: "#f0ad4e",
    });
    return;
  }

  const formatarData = (data: string): string => {
    const regex = /^(\d{2})(\d{2})(\d{4})$/;
    const match = data.match(regex);
    if (match) {
      return `${match[3]}-${match[2]}-${match[1]}`;
    }
    return data;
  };

  const dataFormatted = formatarData(form.value.data);

  try {
    const documentoData = {
      tipo: form.value.tipo,
      nome: form.value.nome,
      descricao: form.value.descricao,
      caminho_arquivo: arquivoSelecionado.value.name,
      data_upload: dataFormatted,
      id_usuarios: form.value.usuarioIds.length ? form.value.usuarioIds : [], 
      id_turmas: form.value.turmaIds.length ? form.value.turmaIds : [], 
    };

    console.log("Dados a serem enviados para a API:", JSON.stringify(documentoData));

    const response = await api.post("/api/Documento", documentoData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Resposta da API:", response.data);

    Swal.fire({
      icon: "success",
      title: "Documento salvo!",
      confirmButtonColor: "#28a745",
    });

    router.push('/Documento');


  } catch (err) {
    console.error("Erro ao salvar documento:", err);

    if (err.response) {
      console.log("Detalhes do erro da API:", err.response.data);
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar documento",
        text: err.response.data.message || "Verifique os dados enviados.",
        confirmButtonColor: "#d33",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar documento",
        text: "Erro desconhecido. Tente novamente mais tarde.",
        confirmButtonColor: "#d33",
      });
    }
  }
};


    return {
      isSideBarRecolhida,
      usuarios,
      turmas,
      form,
      modalUsuariosAberto,
      modalTurmasAberto,
      abrirExplorer,
      selecionarArquivo,
      salvarDocumento,
      inputArquivo,
      arquivoSelecionado,
      mascararData,
      modalUsuarioSearch,
      modalUsuarioFiltered,
      modalTurmaSearch,
      modalTurmaFiltered,
      usuariosSelected,
      turmasSelected,
      modalUsuarioSelectedIds,
      modalTurmaSelectedIds,
      openModalUsuario,
      closeModalUsuario,
      filterModalUsuario,
      toggleUsuarioSelection,
      addSelectedUsuarios,
      removeUsuario,
      openModalTurma,
      closeModalTurma,
      filterModalTurma,
      toggleTurmaSelection,
      addSelectedTurmas,
      removeTurma,
    };
  },
});
</script>


<style scoped>
.page-wrapper { 
display: flex; 
width: 100%;
min-height: 100vh; 
background-color: #f9fafc; }

.layout-container { 
display: flex; 
width: 100%; 
}

.form-page { 
flex: 1; 
transition: margin-left 0.3s ease;
padding: 40px; 
}

.content-recolhido { 
margin-left: 80px; 
}

.container-form {
max-width: 1200px; 
margin: 0 auto; }

.form-header { 
margin-bottom: 30px; 
}

.titulo { 
font-weight: 700; 
font-size: 1.8rem; 
color: #1a1a1a; 
}

.form-card { 
border-radius: 12px; 
border: 1px solid #e9e9e9; 
background-color: #fff; 
box-shadow: 0 4px 12px rgba(0,0,0,0.04); 
}

.card-body { 
padding: 2rem;
}

.form-label { 
font-size: 0.9rem; 
font-weight: 500; 
color: #333; 
margin-bottom: 0.5rem; 
}

.form-control, .form-select {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  height: 44px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.form-control:focus, .form-select:focus {
  background-color: #fff;
  border-color: #0d6efd;
  box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.2);
  outline: none;
}
.input-group .form-control { 
border-right: none; 
}

.input-group-text { 
background-color: #f3f4f6;
 border: 1px solid #e5e7eb;
border-left: none; 
border-radius: 0 8px 8px 0; 
}

.input-group:focus-within .input-group-text { 
border-color: #0d6efd;
background-color: #fff;
}

.input-group:focus-within .form-control { 
border-color: #0d6efd; 
}

textarea.form-control { 
height: auto; 
}

	.upload-area {
	  margin-top: 2rem;
	  border: 2px dashed #d1d5db;
	  border-radius: 12px;
	  padding: 3rem;
	  background-color: #f9fafb;
	  text-align: center;
	  cursor: pointer;
	  transition: background-color 0.2s ease, border-color 0.2s ease;
	}
	.text-success { color: #28a745; font-weight: 600; }
.upload-area:hover {
  background-color: #f0f5ff;
  border-color: #0d6efd;
}
.upload-content .upload-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 1rem;
  opacity: 0.7;
}
.upload-content p {
  color: #6b7280;
  font-weight: 500;
  margin: 0;
}

.salvar-btn {
  background: transparent;
  color: #0d6efd;
  border: 1.5px solid #0d6efd;
  padding: 10px 28px;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.salvar-btn:hover {
  background: #0d6efd;
  color: #fff;
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

@media (max-width: 768px) {
	  .form-page { margin-left: 80px; padding: 20px; }
	  .card-body { padding: 1.5rem; }
	}

	/* Estilos adicionados para o modal (copiados de formturma) */

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
	.modal-row { display:flex; align-items:center; justify-content:space-between; background:#fff; padding:12px; margin-bottom:12px; border-radius:12px; box-shadow:0 6px 18px rgba(2,6,23,0.04); cursor: pointer; }
	.modal-row:hover { background: #f6f8ff; }
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
	}
</style>