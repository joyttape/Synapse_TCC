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
                      <option value="" disabled>Selecione</option>
                      <option value="certidao">Certidão</option>
                      <option value="aviso">Aviso</option>
                      <option value="desenho">Desenho</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Data <span class="text-danger">*</span></label>
                    <input v-model="form.data" type="text" class="form-control" placeholder="dd/mm/yyyy" />
                  </div>

                  <div class="col-md-6 mb-4">
                    <label class="form-label">Vincular a um usuário</label>
                    <div class="input-group">
                      <input v-model="form.usuario" type="text" class="form-control" />
                      <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div class="col-md-6 mb-4">
                    <label class="form-label">Vincular a uma turma</label>
                     <div class="input-group">
                      <input v-model="form.turma" type="text" class="form-control" />
                      <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                      </span>
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
                <img src="/src/assets/icones/acoes/documento.svg" alt="Ícone de documento" class="upload-icon"/>
                <p>Dê dois cliques para abrir o explorar</p>
              </div>
            </div>

            <div class="d-flex justify-content-end mt-4">
              <button class="btn salvar-btn">Salvar documento</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import UsuarioCard from '@/components/UsuarioCard.vue'; 

export default {
  name: 'DocumentoForm',
  components: { SideBar, UsuarioCard},
  data( ) {
    return {
      isSideBarRecolhida: true,
      form: {
        nome: '',
        tipo: '',
        data: '',
        usuario: '',
        turma: '',
        descricao: ''
      }
    }
  },
  methods: {
    abrirExplorer() {
      alert('Abrindo o seletor de arquivos...');
    }
  }
}
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
</style>
