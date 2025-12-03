<template>
  <div class="page-wrapper">
    <div class="layout-container">
      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="form-page" :class="{ 'content-recolhido': isSideBarRecolhida }">
        <main class="page-content">
          <div class="container-form">

            <div class="return-button-container">
              <RouterLink to="/Turma/DetalhesTurma" class="btn-return">&larr; Voltar para Detalhes de Turma</RouterLink>
            </div>

            <header class="form-header">
              <h1 class="titulo">Criar Encontro</h1>
            </header>

            <div class="card form-card">
              <div class="card-body">
                <div class="row">

                  <div class="col-md-4 mb-4">
                    <label class="form-label">Data do Encontro <span class="text-danger">*</span></label>
                    <input v-model="form.data" type="text" class="form-control" placeholder="dd/mm/yyyy" />
                  </div>

                  <div class="col-md-8 mb-4">
                    <label class="form-label">Tema <span class="text-danger">*</span></label>
                    <input v-model="form.tema" type="text" class="form-control" placeholder="Digite o tema" />
                  </div>

                  <div class="col-12 mb-4">
                    <label class="form-label">Observações <span class="text-danger">*</span></label>
                    <textarea v-model="form.observacoes" class="form-control textarea" rows="3" placeholder="Escreva aqui..."></textarea>
                  </div>

                </div>
              </div>
            </div>

            <h4 class="subtitulo">Catequizandos</h4>
            <div class="card tabela-card">
              <div class="tabela-lista">
                <div class="t-row" v-for="i in 7" :key="i">
                  <span>João Pé de Feijão</span>
                  <span>15/03/1990</span>
                  <span>69 00354-0954</span>
                  <span>seuemail@email.com</span>
                </div>
              </div>
            </div>


            <div class="d-flex justify-content-end mt-4">
              <button class="btn-primary-save" @click="save">Salvar Encontro</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'CriarEncontro',
  components: { SideBar, RouterLink },
  data() {
    return {
      isSideBarRecolhida: true,
      form: {
        data: '',
        tema: '',
        observacoes: ''
      }
    }
  },
  methods: {
    save() {
      console.log('SALVAR ENCONTRO', this.form)
      alert('Dados do encontro prontos para salvar (veja console)')
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #f7f8fb;
}

.layout-container {
  display: flex;
  width: 100%;
}

.form-page {
  flex: 1;
  transition: margin-left .28s ease;
  padding: 40px;
}

.content-recolhido {
  margin-left: 80px;
}

.container-form {
  max-width: 1100px;
  margin: 0 auto;
}

.return-button-container {
  margin-bottom: 1rem;
}

.btn-return {
  border: 1.5px solid #0d6efd;
  color: #0d6efd;
  padding: 8px 18px;
  border-radius: 25px;
  text-decoration: none;
}

.btn-return:hover {
  background: #0d6efd;
  color: #fff;
}

.titulo {
  font-size: 1.9rem;
  font-weight: 700;
  margin-bottom: .6rem;
}

.form-card {
  border-radius: 12px;
  border: 1px solid #eef0f3;
  background: #fff;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
}

.card-body {
  padding: 32px;
}

.form-label {
  font-weight: 600;
  margin-bottom: .4rem;
  display: block;
}

.form-control {
  background: #f3f6fb;
  border: 1px solid #e6eef9;
  border-radius: 10px;
  height: 44px;
  padding: 8px 12px;
}

.textarea {
  height: 110px;
  resize: none;
}

.subtitulo {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 16px 0 10px 4px;
}

.tabela-card {
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #eef0f3;
  background: #fff;
}

.tabela-lista {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.t-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: #f3f6fb;
  padding: 12px;
  border-radius: 10px;
}

.btn-primary-save {
  background: #0d6efd;
  color: #fff;
  border: none;
  padding: 10px 22px;
  border-radius: 25px;
  font-size: 15px;
}
</style>