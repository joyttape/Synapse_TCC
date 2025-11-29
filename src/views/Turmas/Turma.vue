<template>
  <div class="page-wrapper">
    <div class="layout-container">
      
      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="turma_pagina" :class="{ 'content-recolhido': isSideBarRecolhida }">
        <main class="page-content">
        
          <header class="page-header">
            
            <div class="header-left">
              <h1 class="title">Turmas ({{ total }})</h1>
              <div class="search-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#888" viewBox="0 0 24 24">
                  <path d="M21 20l-5.9-5.9a7 7 0 10-1.4 1.4L20 21zM5 10a5 5 0 1110 0A5 5 0 015 10z"/>
                </svg>
                <input 
                  type="text"
                  v-model="pesquisa"
                  placeholder="Pesquisar..."
                  class="search-input"
                />
              </div>
            </div>

            <div class="header-right">
                <router-link to="/Turma/TurmaForm" class="btn-add">
                  Criar Turma
                </router-link>
            </div>
        
              
              
          </header>

          
          <div class="filter-bar">

  <!-- FILTRO TURMA -->
  <div class="filter-item">
    <label>Turma:</label>
    <select v-model="filtroTurma">
      <option value="Todos">Todos</option>
      <option value="Crianças I">Crianças I</option>
      <option value="Crianças II">Crianças II</option>
      <option value="Adolescentes">Adolescentes</option>
    </select>
  </div>

  <!-- FILTRO ORDEM -->
  <div class="filter-item">
    <label>Ordem:</label>
    <select v-model="filtroOrdem">
      <option value="Crescente">A → Z</option>
      <option value="Decrescente">Z → A</option>
    </select>
  </div>

  <!-- QUANTIDADE DE CATEQUIZANDOS -->
  <div class="filter-item">
    <label>Qtd. Catequizandos:</label>
    <select v-model="filtroQtdCatequizandos">
      <option value="Todos">Todos</option>
      <option value="Poucos">Poucos (0–10)</option>
      <option value="Medio">Médio (11–20)</option>
      <option value="Muitos">Muitos (21+)</option>
    </select>
  </div>

  <!-- QUANTIDADE DE CATEQUISTAS -->
  <div class="filter-item">
    <label>Qtd. Catequistas:</label>
    <select v-model="filtroQtdCatequistas">
      <option value="Todos">Todos</option>
      <option value="1">1 Catequista</option>
      <option value="2+">2 ou mais</option>
    </select>
  </div>

  <!-- STATUS -->
  <div class="filter-item">
    <label>Status:</label>
    <select v-model="filtroStatus">
      <option value="Todos">Todos</option>
      <option value="Ativo">Ativo</option>
      <option value="Inativo">Inativo</option>
    </select>
  </div>

</div>




          <section class="cards-container">
            <RouterLink 
              v-for="(turma, index) in listaturmas"
              :key="index"
              to="/Turma/DetalhesTurma" 
              class="card-link"
            >
              <div class="turma-card"> 

                <div class="card-header" :class="'cor-' + ((index % 4) + 1)">
                  <div class="card-title">
                    <h3>{{ turma.nome }}</h3> 
                    <span class="sala">{{ turma.sala }}</span>
                  </div>
                  <div class="idade-tag">
                    {{ turma.idade }}
                  </div>
                </div>

                <div class="card-body">
                  <p><strong>Catequista(s):</strong> {{ turma.catequistas }}</p>
                  <p><strong>Dia:</strong> {{ turma.dia }}</p>
                  <p><strong>Horário:</strong> {{ turma.horario }}</p>

                  <div class="progress-info">
                    <span>Catequizandos</span>
                    <span>{{ turma.total }}/{{ turma.capacidade }}</span>
                  </div>

                  <div class="progress-bar">
                    <div 
                      class="progress" 
                      :style="{ width: (turma.total / turma.capacidade * 100) + '%' }"
                    ></div>
                  </div>
                </div>

                <div class="card-footer">
                  <button class="btn-acao visualizar"></button>
                  <button class="btn-acao editar"></button>
                  <button class="btn-acao deletar"></button>
                </div>

              </div>
            </RouterLink>
          </section>

          <div class="pagination-footer">
            <div class="results-info">
              Resultados:
              <div class="result-display">{{ infoResultados }}</div>
            </div>

            <nav class="pagination">
              <button 
                v-for="i in totalPaginas" 
                :key="i"
                @click="paginaAtual = i"
                :class="{ active: paginaAtual === i }"
              >
                {{ i }}
              </button>
            </nav>
          </div>
          
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';

export default {
  name: "Turmas",
  components: { SideBar},

  data() {
  return {
    isSideBarRecolhida: true,

    turmas: [],

    pesquisa: "",

    filtroTurma: "Todos",
    filtroOrdem: "Crescente",
    filtroStatus: "Todos",

    filtroQtdCatequizandos: "Todos",
    filtroQtdCatequistas: "Todos",

    itens: 10,
    paginaAtual: 1
  };
},

  computed: {
    total() {
      return this.turmas.length;
    },

    listafiltrada() {
  let lista = [...this.turmas];

  // 🔍 PESQUISA
  if (this.pesquisa.trim() !== "") {
    const termo = this.pesquisa.toLowerCase();
    lista = lista.filter(t =>
      t.nome.toLowerCase().includes(termo) ||
      t.catequistas.toLowerCase().includes(termo) ||
      t.dia.toLowerCase().includes(termo)
    );
  }

  // 🎯 FILTRO POR TURMA
  if (this.filtroTurma !== "Todos") {
    lista = lista.filter(t => t.nome === this.filtroTurma);
  }

  // 🎯 FILTRO STATUS
  if (this.filtroStatus !== "Todos") {
    lista = lista.filter(t => t.status === this.filtroStatus);
  }

  // 🎯 FILTRO QUANTIDADE DE CATEQUIZANDOS
  if (this.filtroQtdCatequizandos !== "Todos") {
    lista = lista.filter(t => {
      if (this.filtroQtdCatequizandos === "Poucos") return t.total <= 10;
      if (this.filtroQtdCatequizandos === "Medio") return t.total > 10 && t.total <= 20;
      if (this.filtroQtdCatequizandos === "Muitos") return t.total > 20;
    });
  }

  // 🎯 FILTRO QUANTIDADE DE CATEQUISTAS
  if (this.filtroQtdCatequistas !== "Todos") {
    lista = lista.filter(t => {
      const qtd = t.catequistas.split("&").length;
      if (this.filtroQtdCatequistas === "1") return qtd === 1;
      if (this.filtroQtdCatequistas === "2+") return qtd >= 2;
    });
  }

  // 🔠 ORDEM (A → Z ou Z → A)
  lista.sort((a, b) => {
    const A = a.nome.toLowerCase();
    const B = b.nome.toLowerCase();
    return this.filtroOrdem === "Crescente"
      ? A.localeCompare(B)
      : B.localeCompare(A);
  });

  return lista;
},


    // PAGINAÇÃO
    listaturmas() {
      const inicio = (this.paginaAtual - 1) * this.itens;
      const fim = inicio + this.itens;
      return this.listafiltrada.slice(inicio, fim);
    },

    totalPaginas() {
      return Math.ceil(this.listafiltrada.length / this.itens);
    },

    infoResultados() {
      if (this.listafiltrada.length === 0) return "0 - 0";
      const inicio = (this.paginaAtual - 1) * this.itens + 1;
      const fim = Math.min(this.paginaAtual * this.itens, this.listafiltrada.length);
      return `${inicio} - ${fim}`;
    }
  },

  mounted() {

    this.turmas = [
  {
    nome: "Crianças I",
    sala: "Sala B",
    idade: "3 - 9",
    catequistas: "João Zé da Souza & Maria Paixão",
    dia: "Sábado",
    horario: "14:00 - 15:30",
    status: "Ativo",
    total: 20,
    capacidade: 30
  },
  {
    nome: "Crianças II",
    sala: "Sala C",
    idade: "10 - 12",
    catequistas: "Ana Lúcia",
    dia: "Domingo",
    horario: "08:00 - 09:30",
    status: "Inativo",
    total: 12,
    capacidade: 25
  },
  {
    nome: "Adolescentes",
    sala: "Sala A",
    idade: "13 - 15",
    catequistas: "Marcos Paulo",
    dia: "Sábado",
    horario: "16:00 - 17:30",
    status: "Ativo",
    total: 18,
    capacidade: 30
  },

  // 🔥 NOVAS TURMAS

  {
    nome: "Pré-Eucaristia",
    sala: "Sala D",
    idade: "7 - 9",
    catequistas: "Carlos Mendes & Júlia Vieira",
    dia: "Sábado",
    horario: "09:00 - 10:30",
    status: "Ativo",
    total: 22,
    capacidade: 28
  },
  {
    nome: "Crisma I",
    sala: "Sala E",
    idade: "15 - 17",
    catequistas: "Patrícia Gomes",
    dia: "Domingo",
    horario: "10:00 - 11:30",
    status: "Ativo",
    total: 17,
    capacidade: 25
  },
  {
    nome: "Crisma II",
    sala: "Sala F",
    idade: "15 - 17",
    catequistas: "Roberto Dias & Fernanda Lima",
    dia: "Sábado",
    horario: "11:00 - 12:30",
    status: "Inativo",
    total: 9,
    capacidade: 20
  },
  {
    nome: "Jovens I",
    sala: "Sala G",
    idade: "16 - 20",
    catequistas: "Thiago Ramos",
    dia: "Domingo",
    horario: "17:00 - 18:30",
    status: "Ativo",
    total: 14,
    capacidade: 25
  },
  {
    nome: "Jovens II",
    sala: "Sala H",
    idade: "18 - 25",
    catequistas: "Amanda Borges & Danilo Costa",
    dia: "Sábado",
    horario: "18:00 - 19:30",
    status: "Ativo",
    total: 27,
    capacidade: 35
  },
  {
    nome: "Adultos",
    sala: "Sala I",
    idade: "25+",
    catequistas: "Helena Souza",
    dia: "Domingo",
    horario: "15:00 - 16:30",
    status: "Ativo",
    total: 8,
    capacidade: 20
  },
  {
    nome: "Catequese Familiar",
    sala: "Salão Paroquial",
    idade: "Todas",
    catequistas: "Equipe Pastoral",
    dia: "Sábado",
    horario: "08:00 - 09:30",
    status: "Inativo",
    total: 30,
    capacidade: 60
  },
  {
    nome: "Pré-Eucaristia",
    sala: "Sala D",
    idade: "7 - 9",
    catequistas: "Carlos Mendes & Júlia Vieira",
    dia: "Sábado",
    horario: "09:00 - 10:30",
    status: "Ativo",
    total: 22,
    capacidade: 28
  },
  {
    nome: "Crisma I",
    sala: "Sala E",
    idade: "15 - 17",
    catequistas: "Patrícia Gomes",
    dia: "Domingo",
    horario: "10:00 - 11:30",
    status: "Ativo",
    total: 17,
    capacidade: 25
  },
  {
    nome: "Crisma II",
    sala: "Sala F",
    idade: "15 - 17",
    catequistas: "Roberto Dias & Fernanda Lima",
    dia: "Sábado",
    horario: "11:00 - 12:30",
    status: "Inativo",
    total: 9,
    capacidade: 20
  },
  {
    nome: "Jovens I",
    sala: "Sala G",
    idade: "16 - 20",
    catequistas: "Thiago Ramos",
    dia: "Domingo",
    horario: "17:00 - 18:30",
    status: "Ativo",
    total: 14,
    capacidade: 25
  },
  {
    nome: "Jovens II",
    sala: "Sala H",
    idade: "18 - 25",
    catequistas: "Amanda Borges & Danilo Costa",
    dia: "Sábado",
    horario: "18:00 - 19:30",
    status: "Ativo",
    total: 27,
    capacidade: 35
  },
  {
    nome: "Adultos",
    sala: "Sala I",
    idade: "25+",
    catequistas: "Helena Souza",
    dia: "Domingo",
    horario: "15:00 - 16:30",
    status: "Ativo",
    total: 8,
    capacidade: 20
  },
  {
    nome: "Catequese Familiar",
    sala: "Salão Paroquial",
    idade: "Todas",
    catequistas: "Equipe Pastoral",
    dia: "Sábado",
    horario: "08:00 - 09:30",
    status: "Inativo",
    total: 30,
    capacidade: 60
  }
];

  }
};
</script>


<style>
.page-wrapper {
  min-height: 100vh;
  background-color: #f9fafc;
}

.layout-container {
  display: flex;
  min-height: 100vh;
}

.turma_pagina {
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: #f9fafc;
  min-height: 100vh;
}

.content-recolhido {
  margin-left: 80px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.page-header .title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}


.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1.5px solid #ccc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  overflow: hidden;
}

.search-container svg {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  fill: #888;
  transition: all 0.3s ease;
}

.search-input {
  border: none;
  outline: none;
  padding-left: 38px;
  font-size: 0.95rem;
  width: 0;
  opacity: 0;
  transition: all 0.4s ease;
}

.search-container:focus-within {
  width: 500px;
  border-radius: 25px;
  border-color: #0d6efd;
}

.search-container:focus-within svg {
  fill: #0d6efd;
}

.search-container:focus-within .search-input {
  width: 100%;
  opacity: 1;
}

.btn-add {
  border: 1.5px solid #0d6efd;
  color: #0d6efd;
  background: transparent;
  border-radius: 25px;
  padding: 10px 22px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-add:hover {
  background-color: #0d6efd;
  color: white;
}


.filter-bar {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 25px;
  align-items: center;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
}

.filter-item label {
  font-weight: 500;
  color: #333;
}

.filter-item select {
  background: transparent;
  border: none !important;
  color: #0d6efd;
  font-weight: 500;
  padding: 4px 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none !important;
  box-shadow: none !important;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.filter-item select:focus,
.filter-item select:hover,
.filter-item select:active {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

.filter-item select {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230d6efd'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 4px center;
  background-size: 16px;
  padding-right: 24px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

/* Card */
.turma-card {
  width: 100%;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Cabeçalho com cores diferentes */
.card-header {
  padding: 15px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.cor-1 { background: #5EA0FF; }
.cor-2 { background: #8B5EFF; }
.cor-3 { background: #5EE25E; }
.cor-4 { background: #BF5EFF; }

.card-title h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.sala {
  font-size: 0.85rem;
  opacity: 0.9;
}

/* Tag de idade */
.idade-tag {
  background: rgba(255,255,255,0.25);
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
}

.card-link{
  text-decoration: none;
}

/* Corpo */
.card-body {
  padding: 18px;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.4rem;
}

.card-body p {
  margin: 5px 0;
}

/* Progresso */
.progress-info {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.progress-bar {
  height: 6px;
  background: #ddd;
  border-radius: 20px;
  margin-top: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #5EA0FF;
  border-radius: 20px;
}

/* Rodapé */
.card-footer {
  display: flex;
  gap: 15px;
  padding: 12px 18px;
  border-top: 1px solid #eee;
  justify-content: flex-end;
}

.btn-acao {
  width: 22px;
  height: 22px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

/* Ícones */
.visualizar { background-image: url('/src/assets/icones/acoes/olho2.svg'); }
.editar { background-image: url('/src/assets/icones/acoes/edit2.svg'); }
.deletar { background-image: url('/src/assets/icones/acoes/lixo2.svg'); }


.pagination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}

.results-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.result-display {
  background-color: #e9ecef;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 0.9rem;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination button {
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  background-color: #f0f2f5;
  color: #0d6efd;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button:hover {
  background-color: #0d6efd;
  color: #fff;
}

.pagination button.active {
  background-color: #0d6efd;
  color: #fff;
  font-weight: 600;
}
</style>