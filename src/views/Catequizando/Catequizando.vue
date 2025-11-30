<template>
  <Loading></Loading>
  <div class="page-wrapper">
    <div class="layout-container">
      
      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="catequizandos_pagina" :class="{ 'content-recolhido': isSideBarRecolhida }">
        <main class="page-content">
          
          <header class="page-header">
            <div class="header-left">
              <h1 class="title">Catequizandos ({{ total }})</h1>
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

            <router-link to="/Catequizando/CatequizandoForm" class="btn-add">
                  Cadastrar Catequizando
            </router-link>

          </header>

          
          <div class="filter-bar">
            <div class="filter-item">
              <label>Turma:</label>
              <select v-model="filtroTurma">
                <option value="Todos">Todos</option>
                <option value="Crianças">Crianças</option>
                <option value="Eucaristia">Eucaristia</option>
                <option value="Crisma">Crisma</option>
                <option value="Adultos">Adultos</option>
              </select>
            </div>
            
            <div class="filter-item">
              <label>Ordem:</label>
              <select v-model="filtroOrdem">
                <option value="Crescente">Crescente</option>
                <option value="Decrescente">Decrescente</option>
              </select>
            </div>
            
            <div class="filter-item">
              <label>Sexo:</label>
              <select v-model="filtroSexo">
                <option value="Todos">Todos</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            
            <div class="filter-item">
              <label>Status:</label>
              <select v-model="filtroStatus">
                <option value="Todos">Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>


          <section class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome Completo</th>
                  <th>Data Nascimento</th>
                  <th>Sexo</th>
                  <th>Turma</th>
                  <th>Telefone</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pessoa,index) in listaPaginada" :key="index">
                  <td>{{ pessoa.nomecompleto }}</td>
                  <td>{{ pessoa.datanascimento }}</td>
                  <td>{{ pessoa.sexo }}</td>
                  <td>{{ pessoa.turma }}</td>
                  <td>{{ pessoa.telefone }}</td>
                  <td>
                    {{ pessoa.status ? 'Ativo' : 'Inativo'}}
                  </td>
                  <td class="action-buttons">
                      <RouterLink :to="`/Catequizando/Detalhes/${pessoa.id_catequizando}`">
                        <button title="Visualizar" class="btn-visualizar"></button>
                      </RouterLink>

                      <RouterLink :to="`/Catequizando/EditCatequizando/${pessoa.id_catequizando}`">
                        <button title="Editar" class="btn-editar"></button>
                      </RouterLink>
                      
                    <button title="Deletar" class="btn-deletar" @click="deletarCatequizando(pessoa.id_catequizando)"></button>

                  </td>
                </tr>
              </tbody>
            </table>
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

<script lang="ts">
import SideBar from '@/components/SideBar.vue';
import Loading from '@/components/Loading.vue';
import axios from 'axios';
import { api } from '@/common/http';
import Swal from 'sweetalert2'

export default {
  name: 'Catequizandos',

  data() {
  return {
    isSideBarRecolhida: true,
    turmasMapa: {} as Record<number, string>,
    listacatequizandos: [] as Array<{
      id_catequizando: number,
      nomecompleto: string,
      datanascimento: string,
      sexo: string,
      turma: string,
      telefone: string,
      status: boolean
    }>,

    pesquisa: "",
    filtroTurma: "Todos",
    filtroSexo: "Todos",
    filtroStatus: "Todos",
    filtroOrdem: "Crescente",

    paginaAtual: 1,
    itens: 8,
  };
},


  components:{
    SideBar, Loading
  },
  computed: {
    listafiltrada() {
      let lista = [...this.listacatequizandos];

      if (this.pesquisa) {
        const termo = this.pesquisa.toLowerCase();
        lista = lista.filter(p =>
          p.nomecompleto.toLowerCase().includes(termo)
        );
      }

      if (this.filtroTurma !== "Todos") {
        lista = lista.filter(p => p.turma === this.filtroTurma);
      }

      if (this.filtroSexo !== "Todos") {
        lista = lista.filter(p => p.sexo === this.filtroSexo);
      }

      if (this.filtroStatus !== "Todos") {
        const ativo = this.filtroStatus === "Ativo";
        lista = lista.filter(p => p.status === ativo);
      }

      lista.sort((a, b) => {
        const A = a.nomecompleto.toLowerCase();
        const B = b.nomecompleto.toLowerCase();

        return this.filtroOrdem === "Crescente"
          ? A.localeCompare(B)
          : B.localeCompare(A);
      });

      return lista;
    },

    listaPaginada() {
      const inicio = (this.paginaAtual - 1) * this.itens;
      const fim = inicio + this.itens;
      return this.listafiltrada.slice(inicio, fim);
    },

    totalPaginas() {
      return Math.ceil(this.listafiltrada.length / this.itens);
    },

    total() {
      return this.listafiltrada.length;
    },

    infoResultados() {
      if (this.listafiltrada.length === 0) return "0 - 0";

      const inicio = (this.paginaAtual - 1) * this.itens + 1;
      const fim = Math.min(this.paginaAtual * this.itens, this.listafiltrada.length);

      return `${inicio} - ${fim}`;
    }
  },

  methods: {
    async buscarCatequizandos() {
  try {
    const response = await api.get('/api/Catequizando');

    if (response.status === 200) {
      this.listacatequizandos = response.data.map((item: any) => {
      const idTurma = item.catequizandoTurmas?.[0]?.id_turma_fk ?? null;

      return {
        id_catequizando: item.id_catequizando,
        nomecompleto: item.usuario?.nome || "",
        datanascimento: item.usuario?.data_nascimento || "",
        sexo: item.usuario?.sexo || "",
        turma: idTurma ? this.turmasMapa[idTurma] : "Sem turma",   // ← AQUI
        telefone: item.usuario?.telefone || "",
        status: item.usuario?.ativo
      };
    });

    }
  } catch (error) {
    console.error("Erro ao buscar catequizandos:", error);
  }
},

async buscarTurmas() {
  const response = await api.get("/api/Turma");
  this.turmasMapa = {};

  response.data.forEach((t: any) => {
    this.turmasMapa[t.id_turma] = t.nome; 
  });
},


async deletarCatequizando(id: number) {
  try {
    const confirm = await Swal.fire({
      title: "Confirmar exclusão",
      text: "Deseja realmente excluir este catequizando?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    const response = await api.delete(`/api/Catequizando/${id}`);

    if (response.status === 200 || response.status === 204) {

      await Swal.fire({
        icon: "success",
        title: "Excluído!",
        text: "O catequizando foi removido com sucesso.",
      });

      this.buscarCatequizandos();
    }

  } catch (error) {
    console.error("Erro ao excluir catequizando:", error);

    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Não foi possível excluir o catequizando.",
    });
  }
}



  },

  mounted() {
    this.buscarTurmas().then(() => {
    this.buscarCatequizandos();
  });
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

.catequizandos_pagina {
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
  align-items: center;
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
  width: 220px;
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

.table-container table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
}

.table-container th, 
.table-container td {
  padding: 14px 18px;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  vertical-align: middle;
}

.table-container thead th {
  background-color: #FFFFFF;
  color: #1a1a1a;
  font-weight: 600;
}

.table-container tbody tr:hover {
  background-color: #F6F7FB;
}


.status-ativo {
  color: #28a745;
  font-weight: 600;
}

.status-inativo {
  color: #dc3545;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-buttons button {
    width: 24px; 
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: background-image 0.2s, transform 0.2s;
}

.action-buttons .btn-visualizar {
    background-image: url('/src/assets/icones/acoes/olho.svg');
}

.table-container tbody tr:hover .action-buttons .btn-visualizar {
    background-image: url('/src/assets/icones/acoes/olho2.svg'); 
    transform: scale(1.1);
}

.action-buttons .btn-editar{
  background-image: url('/src/assets//icones/acoes/edit.svg');
}

.table-container tbody tr:hover .action-buttons .btn-editar{
  background-image: url('/src/assets/icones/acoes/edit2.svg');
  transform: scale(1.1);
}

.action-buttons .btn-deletar{
  background-image: url('/src/assets/icones/acoes/lixo.svg');
}

.table-container tbody tr:hover .action-buttons .btn-deletar{
  background-image: url('/src/assets/icones/acoes/lixo2.svg');
  transform: scale(1.0);
}

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