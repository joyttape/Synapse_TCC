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
                <div class="header-left">
                    <h1 class="titulo">Visualização Documento</h1>
                </div>
                <div class="header-right">
                    <button class="btn btn-edit">Editar Documento</button>
                    <button class="btn btn-delete">Deletar</button>
                </div>
            </header>

            <div class="card form-card">
              <div class="card-body">
                <fieldset disabled>
                  <div class="row">
                    <div class="col-md-5 mb-4">
                      <label class="form-label">Nome do Documento <span class="text-danger">*</span></label>
                      <input v-model="documento.nome" type="text" class="form-control" />
                    </div>
                    <div class="col-md-4 mb-4">
                      <label class="form-label">Tipo <span class="text-danger">*</span></label>
                      <select v-model="documento.tipo" class="form-select">
                        <option value="certidao">Certidão</option>
                        <option value="aviso">Aviso</option>
                        <option value="desenho">Desenho</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div class="col-md-3 mb-4">
                      <label class="form-label">Data <span class="text-danger">*</span></label>
                      <input v-model="documento.data" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6 mb-4">
                      <label class="form-label">Vincular a um usuário</label>
                      <div class="input-group">
                        <input v-model="documento.usuario" type="text" class="form-control" />
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                        </span>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <label class="form-label">Vincular a uma turma</label>
                      <div class="input-group">
                        <input v-model="documento.turma" type="text" class="form-control" />
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                        </span>
                      </div>
                    </div>
                    <div class="col-12">
                      <label class="form-label">Descrição <span class="text-danger">*</span></label>
                      <textarea v-model="documento.descricao" class="form-control" rows="3"></textarea>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <a :href="documento.fileUrl" target="_blank" class="upload-area-link">
              <div class="upload-area">
                <div class="upload-content">
                  <img src="/src/assets/icones/acoes/documento.svg" alt="Ícone de documento" class="upload-icon"/>
                  <p>Clique para visualizar o documento</p>
                </div>
              </div>
            </a>

            <footer class="form-footer">
              <button @click="imprimirDocumentoVinculado" class="btn btn-print">Imprimir</button>
            </footer>

          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'VisualizacaoDocumento',
  components: { SideBar },
  data( ) {
    return {
      isSideBarRecolhida: true,
      documento: {}
    }
  },
  created() {
    this.carregarDocumento();
  },
  methods: {
    carregarDocumento() {
      this.documento = {
        id: 1,
        nome: 'Certidão de Batismo - Exemplo',
        tipo: 'certidao',
        data: '15/03/2023',
        usuario: 'Fulano de Tal',
        turma: 'Crisma 2023',
        descricao: 'Este é um documento de exemplo para a certidão de batismo do catequizando.',
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      };
    },
    imprimirDocumentoVinculado( ) {
      if (this.documento.fileUrl) {
        window.open(this.documento.fileUrl, '_blank');
      } else {
        alert('Nenhum documento vinculado para imprimir.');
      }
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafc;
}
.layout-container {
  display: flex;
  width: 100%;
}
.form-page {
  flex: 1;
  transition: margin-left 0.3s ease;
  padding: 40px;
  margin-left: 250px;
}
.content-recolhido {
  margin-left: 80px;
}
.container-form {
  max-width: 1140px;
  margin: 0 auto;
}

.return-button-container {
  margin-bottom: 1.5rem;
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
  gap: 0.5rem;
}
.btn-return:hover {
  background-color: #0d6efd;
  color: white;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.header-left .titulo {
  font-weight: 700;
  font-size: 1.8rem;
  color: #1a1a1a;
  margin: 0;
}
.header-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.btn {
  padding: 10px 28px;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}
.btn-edit {
  background-color: #e9ecef;
  color: #6c757d;
}
.btn-edit:hover {
  background-color: #d3d9df;
}
.btn-delete {
  background-color: #dc3545;
  color: #fff;
}
.btn-delete:hover {
  background-color: #c82333;
}

.btn-print {
  background-color: #e9ecef;
  color: #6c757d;
}
.btn-print:hover {
  background-color: #d3d9df;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
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
}
fieldset:disabled .form-control,
fieldset:disabled .form-select {
  background-color: #f3f4f6;
  cursor: not-allowed;
  color: #6b7280;
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
textarea.form-control {
  height: auto;
}

.upload-area-link {
  text-decoration: none;
}
.upload-area {
  margin-top: 2rem;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 3rem;
  background-color: #f9fafb;
  text-align: center;
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

@media (max-width: 768px) {
  .form-page {
    margin-left: 80px;
    padding: 20px;
  }
  .card-body {
    padding: 1.5rem;
  }
  .form-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
