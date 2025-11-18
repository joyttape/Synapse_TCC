<template>
  <div class="page-wrapper">
    <div class="layout-container">

      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="form-page" :class="{ 'content-recolhido': isSideBarRecolhida }">

        <main class="page-content">

           <div class="container my-5">

              <div class="return-button-container">
              <RouterLink to="/Catequizando" class="btn-return">
                &larr; Voltar
              </RouterLink>
              </div>

              <h1 class="mb-4 titulo">Cadastro de Catequizandos</h1>

              <div>
              <UsuarioCard nome="{{ pessoa.nome }}" email="{{ pessoa.email }}"></UsuarioCard>
               </div>

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
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-6 d-flex gap-3 mb-3 align-items-end">
                        <div class="flex-fill">
                          <label class="form-label">Batizado (a)?<span class="text-danger">*</span></label>
                          <select v-model="form.batizado" class="form-select input-small">
                            <option value="">Selecione</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">Comunidade <span class="text-danger">*</span></label>
                        <input v-model="form.comunidade" type="text" class="form-control input-sim" />
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">Nome do Pai <span class="text-danger">*</span></label>
                        <input v-model="form.nomepai" type="text" class="form-control input-sim" />
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">Nome da Mãe <span class="text-danger">*</span></label>
                        <input v-model="form.nomemae" type="text" class="form-control input-sim" />
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">Email <span class="text-danger">*</span></label>
                        <input v-model="form.email" type="email" class="form-control input-sim" placeholder="seuemail@email.com" />
                      </div>

                      <div class="col-md-3 mb-3">
                          <label class="form-label">Possui pais juntos? <span class="text-danger">*</span></label>
                          <div class="checkbox-group">
                            <label><input type="radio" value="true" v-model="form.paisjuntos"> Sim</label>
                            <label><input type="radio" value="false" v-model="form.paisjuntos"> Não</label>
                          </div>
                        </div>

                        <div class="col-md-3 mb-3">
                          <label class="form-label">Frequenta outras igrejas? <span class="text-danger">*</span></label>
                          <div class="checkbox-group">
                            <label><input type="radio" value="true" v-model="form.frequenciaigreja"> Sim</label>
                            <label><input type="radio" value="false" v-model="form.frequenciaigreja"> Não</label>
                          </div>
                        </div>

                        <div class="col-md-3 mb-3">
                          <label class="form-label">É batizado(a)? <span class="text-danger">*</span></label>
                          <div class="checkbox-group">
                            <label><input type="radio" value="true" v-model="form.batizado"> Sim</label>
                            <label><input type="radio" value="false" v-model="form.batizado"> Não</label>
                          </div>
                        </div>

                        <div class="col-md-3 mb-3">
                          <label class="form-label">Frequenta a comunidade? <span class="text-danger">*</span></label>
                          <div class="checkbox-group">
                            <label><input type="radio" value="true" v-model="form.conviviocomun"> Sim</label>
                            <label><input type="radio" value="false" v-model="form.conviviocomun"> Não</label>
                          </div>
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

                  <div class="col-md-2 mb-3"></div>

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
                <button class="btn salvar-btn">Salvar dados</button>
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
  name: 'CatequistaForm',
  components: {SideBar, UsuarioCard},
  data() {
    return {
      isSideBarRecolhida: true,
      form: {
        nome: '',
        telefone: '',
        nascimento: '',
        ativo: '',
        admissao: '',
        formacao: '',
        comunidade: '',
        email: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        estado: '',
        cidade: '',
        numero: '',
        cep: ''
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

.checkbox-group {
  display: flex;
  flex-direction: column; 
  gap: 2px;
}

.checkbox-group label {
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
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


@media (max-width: 767px) {
  .foto-area { border-left: none; border-top: 1px solid #ececec; }
  .form-card .col-md-9, .form-card .col-md-3 { padding: 16px; }
}

.form-label { font-size: 13px; font-weight: 500; }
</style>