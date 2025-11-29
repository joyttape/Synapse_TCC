<template>
  <div class="page-wrapper">
    <div class="layout-container">
      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="detalhes-page" :class="{ 'content-recolhido': isSideBarRecolhida }">
        <main class="page-content">
          <div class="container-detalhes">

            <RouterLink to="/Turma" class="btn-return">&larr; Voltar para Turmas</RouterLink>

            <header class="top-header">
              <h1>Detalhes da Turma</h1>
              <div class="btn-group">
                <button class="btn-edit">Editar Turma</button>
                <button class="btn-delete">Deletar</button>
              </div>
            </header>

            <div class="card bloco">
              <div class="bloco-body">
                <div class="row-grid">
                  <div class="campo">
                    <label>Nome da Turma</label>
                    <input class="input" placeholder="Nome da turma" />
                  </div>

                  <div class="campo">
                    <label>Data</label>
                    <input class="input" placeholder="dd/mm/yyyy" />
                  </div>

                  <div class="campo">
                    <label>Idade Mínima / Máxima</label><!-- espaçamento ajustado -->
                    <div class="idade-row" style="gap: 6px;">
                      <input class="input" placeholder="Min" />
                      <input class="input" placeholder="Max" />
                    </div>
                  </div>

                  <div class="campo full">
                    <label>Descrição</label>
                    <textarea class="input textarea" placeholder="Escreva aqui"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="card bloco">
              <label class="sec-title">Catequista(s)</label>
              <div class="lista linha">
                <div class="linha-item">João Pé de Feijão</div>
                <div class="linha-item">15/03/1990</div>
                <div class="linha-item">69 00354-0954</div>
                <div class="linha-item">seuemail@email.com</div>
              </div>
            </div>

            <div class="card bloco">
              <label class="sec-title">Catequizandos</label>
              <div class="lista tabela">
                <div class="t-row" v-for="i in 6" :key="i">
                  <span>João Pé de Feijão</span>
                  <span>15/03/1990</span>
                  <span>69 00354-0954</span>
                  <span>seuemail@email.com</span>
                </div>
              </div>
            </div>

            <div class="encontros-header">
              <h3>Encontros</h3>
              
              <RouterLink to="/Turma/DetalhesTurma/Encontro">
              <button class="btn-add">Adicionar Encontro</button>
            </RouterLink>

            </div>

            
          

            <div class="search-box">
                <div class="search-input-wrapper">
                    <input class="input" placeholder="Buscar..." />
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </div>
            </div>

            <RouterLink to="/Turma/DetalhesTurma/Encontro/EditEncontro">
            <div class="cards-encontros">
            <div class="encontro-card" v-for="i in 6" :key="i">
                <div class="enc-title">Páscoa</div>
                <div class="enc-sub">Sala B</div>
                <div class="enc-date">19/11/2025</div>

                <!-- ÍCONES DE AÇÃO (iguais ao Turmas.vue) -->
                <div class="icons">
                <!-- Visualizar -->
                <svg title="Visualizar" class="icon-action" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    fill="white" viewBox="0 0 16 16">
                    <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8A13.133 13.133 0 0 1 8 3.5c2.76 0 5.223 1.72 6.827 4.5A13.133 13.133 0 0 1 8 12.5C5.24 12.5 2.777 10.78 1.173 8z" />
                    <path
                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM6 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>

                <!-- Editar -->
                <svg title="Editar" class="icon-action" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    fill="white" viewBox="0 0 16 16">
                    <path
                    d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.193 9.193a.5.5 0 0 1-.168.11l-4 1.5a.5.5 0 0 1-.651-.651l1.5-4a.5.5 0 0 1 .11-.168l9.193-9.193z" />
                </svg>

                <!-- Deletar -->
                <svg title="Deletar" class="icon-action" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    fill="white" viewBox="0 0 16 16">
                    <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zM8 6a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zm2 .5a.5.5 0 0 1 1 0v6a.5.5 0 0 1-1 0V6.5z" />
                    <path fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1h-.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4H2.5a1 1 0 0 1 0-2H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1z" />
                </svg>
                </div>
            </div>
            </div>
            </RouterLink>

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
  components: { SideBar, RouterLink },
  data() {
    return { isSideBarRecolhida: true }
  }
}
</script>

<style scoped>
.page-wrapper { display: flex; width: 100%; min-height: 100vh; background: #f7f8fb; }
.layout-container { display: flex; width: 100%; }
.detalhes-page { flex: 1; padding: 40px; transition: margin-left .28s ease; }
.content-recolhido { margin-left: 80px; }
.container-detalhes { max-width: 1200px; margin: 0 auto; }

.btn-return { border: 1.5px solid #0d6efd; color: #0d6efd; padding: 8px 18px; border-radius: 25px; text-decoration: none; display: inline-block; margin-bottom: 20px; }
.btn-return:hover { background: #0d6efd; color: #fff; }

.top-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.top-header h1 { font-size: 1.8rem; font-weight: 700; }
.btn-group { display: flex; gap: 12px; }
.btn-edit { background: #d9dce2; border: none; padding: 8px 18px; border-radius: 25px; }
.btn-delete { background: #e01a1a; border: none; color: #fff; padding: 8px 18px; border-radius: 25px; }

.card { background: #fff; border: 1px solid #eef0f3; border-radius: 12px; padding: 20px; margin-bottom: 30px; box-shadow: 0 8px 30px rgba(15,23,42,0.06); }

.row-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.full { grid-column: span 3; }
.label { font-weight: 600; }
.input { background: #f3f6fb; border: 1px solid #e6eef9; border-radius: 10px; padding: 10px; width: 100%; }
.textarea { height: 90px; resize: none; }

.lista.linha { display: grid; grid-template-columns: repeat(4, 1fr); padding: 10px; background: #f3f6fb; border-radius: 12px; }
.linha-item { padding: 8px; }

.tabela { display: flex; flex-direction: column; gap: 10px; }
.t-row { display: grid; grid-template-columns: repeat(4, 1fr); background: #f3f6fb; padding: 12px; border-radius: 10px; }

.encontros-header { display: flex; justify-content: space-between; align-items: center; margin: 25px 0; }
.btn-add { background: #0d6efd; color: #fff; border: none; padding: 8px 18px; border-radius: 25px; }

.search-box { margin-bottom: 20px; }

.cards-encontros { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.encontro-card { background: #6464ff; color: #fff; padding: 20px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; }
.enc-title { font-size: 1.1rem; font-weight: 700; }
.enc-sub { opacity: .9; }
.enc-date { font-size: .9rem; opacity: .9; }
.icons { margin-top: 8px; display: flex; gap: 10px; font-size: 18px; cursor: pointer; }
</style>
