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

            <header class="top-header">
              <h1>Detalhes Documento</h1>
              <div class="btn-group">
                <RouterLink :to="`/Turma/EditDoc/${form.id}`">
                  <button class="btn-edit">Editar Documento</button>
                </RouterLink>

                <button class="btn-delete" @click="deletarTurma(form.id)">Deletar</button>
              </div>
            </header>

            <div class="card form-card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-5 mb-4">
                    <label class="form-label">Nome do Documento</label>
                    <input v-model="form.nome" type="text" class="form-control" readonly />
                  </div>

                  <div class="col-md-4 mb-4">
                    <label class="form-label">Tipo</label>
                    <select v-model="form.tipo" class="form-select" disabled>
                      <option value="Certidao">Certidão</option>
                      <option value="Aviso">Aviso</option>
                      <option value="Desenho">Desenho</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Data</label>
                    <input v-model="form.data" type="text" class="form-control" readonly />
                  </div>

                  <div class="col-md-6 mb-4">
                  <label class="form-label">Vincular a um usuário</label>
                  <input 
                    :value="usuariosSelected.map(u => u.nome).join(', ')" 
                    class="form-control" 
                    readonly 
                  />
                </div>

                  <div class="col-md-6 mb-4">
                  <label class="form-label">Vincular a uma turma</label>
                  <input 
                    :value="turmasSelected.map(t => t.nome).join(', ')" 
                    class="form-control" 
                    readonly 
                  />
                </div>

                  <div class="col-12">
                    <label class="form-label">Descrição</label>
                    <textarea v-model="form.descricao" class="form-control" rows="3" readonly></textarea>
                  </div>

                </div>
              </div>
            </div>

            <div class="upload-area">
              <div class="upload-content">
                <img src="/src/assets/icones/acoes/documento.svg" class="upload-icon" />
                <p v-if="arquivoSelecionado">Arquivo selecionado: <strong>{{ arquivoSelecionado.name }}</strong></p>
                <a v-if="arquivoSelecionado" :href="arquivoSelecionadoUrl" download class="btn btn-primary mt-2">
                  Baixar Arquivo
                </a>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import SideBar from "@/components/SideBar.vue";
import { api } from "@/common/http";
import Swal from "sweetalert2";
import { useRouter, useRoute } from 'vue-router';  // Importando useRoute

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
    const route = useRoute(); // Acessando a rota
    const usuarios = ref<Usuario[]>([]);
    const turmas = ref<Turma[]>([]);
    const form = ref({
      nome: "",
      tipo: "",
      data: "",
      descricao: "",
    });

    const usuariosSelected = ref<Usuario[]>([]);
    const turmasSelected = ref<Turma[]>([]);

    const arquivoSelecionado = ref<File | null>(null);
    const arquivoSelecionadoUrl = ref<string>("");

    const documentoId = route.params.id;  

    onMounted(async () => {
      try {
        if (!documentoId) {
          throw new Error("ID do documento não encontrado.");
        }

        // Requisição para carregar os dados do documento
        const { data: documentoData } = await api.get(`/api/Documento/${documentoId}`);
        
        // Carregar os detalhes do documento
        form.value = {
          nome: documentoData.nome,
          tipo: documentoData.tipo,
          data: documentoData.data_upload,
          descricao: documentoData.descricao,
        };

        // Requisição para usuários relacionados ao documento
        const usuariosResponse = await api.get('/api/catequizando');
        usuarios.value = usuariosResponse.data;

        // Requisição para turmas relacionadas ao documento
        const turmasResponse = await api.get('/api/turma');
        turmas.value = turmasResponse.data;

        // Preencher os usuários selecionados no documento
        usuariosSelected.value = documentoData.usuarios.map((usuario: any) => ({
          id: usuario.id_usuario,
          nome: usuario.nome,
        }));

        // Preencher as turmas selecionadas no documento
        turmasSelected.value = documentoData.turmas.map((turma: any) => ({
          id: turma.id_turma,
          nome: turma.nome,
        }));

        // Arquivo selecionado para download
        arquivoSelecionado.value = documentoData.arquivo;
        arquivoSelecionadoUrl.value = `/path/to/file/${documentoData.caminho_arquivo}`;
      } catch (err) {
        console.error("Erro ao carregar dados do documento", err);
        Swal.fire({
          icon: "error",
          title: "Erro ao carregar documento",
          text: "Não foi possível carregar as informações do documento.",
          confirmButtonColor: "#d33",
        });
      }
    });

    return {
      isSideBarRecolhida,
      usuarios,
      turmas,
      form,
      usuariosSelected,
      turmasSelected,
      arquivoSelecionado,
      arquivoSelecionadoUrl,
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

.top-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.top-header h1 { font-size: 1.8rem; font-weight: 700; }
.btn-group { display: flex; gap: 12px; }
.btn-edit { background: #d9dce2; border: none; padding: 8px 18px; border-radius: 25px; }
.btn-delete { background: #e01a1a; border: none; color: #fff; padding: 8px 18px; border-radius: 25px; }

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

	.selected-list { margin-top:.6rem; display:flex; gap:.5rem; flex-wrap:wrap; }
	.pill { background:#e6f0ff; color:#0b62c9; padding:6px 10px; border-radius:999px; font-weight:600; display:inline-flex; align-items:center; gap:.5rem; }
	.pill button { background:transparent; border:none; cursor:pointer; color:#0b62c9; font-weight:700; }

	
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

	.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
	.fade-enter-from, .fade-leave-to { opacity:0; }

	@media (max-width: 900px) {
	  .modal-card { margin: 12px; width: calc(100% - 24px); max-width: calc(100% - 24px); }
	}
</style>