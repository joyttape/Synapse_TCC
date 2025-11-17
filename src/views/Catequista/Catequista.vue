<template>
  <div class="page-wrapper">
    <div class="layout-container">
      
      <SideBar v-model:recolhida="isSideBarRecolhida" />

      <div class="catequizandos_pagina" :class="{ 'content-recolhido': isSideBarRecolhida }">
        <main class="page-content">
        
          <div>
              <UsuarioCard nome="{{ pessoa.nome }}" email="{{ pessoa.email }}"></UsuarioCard>
          </div>

          <header class="page-header">
            
            <div class="header-left">
              <h1 class="title">Catequistas ({{ total }})</h1>
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
                <router-link to="/Catequista/CatequistaForm" class="btn-add">
                  Cadastrar Catequista
                </router-link>
            </div>
        
              
              
          </header>

          
          <div class="filter-bar">
            
            
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
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pessoa,index) in listacatequizandos" :key="index">
                  <td>{{ pessoa.nome }}</td>
                  <td>{{ pessoa.dataNascimento }}</td>
                  <td>{{ pessoa.sexo }}</td>
                  <td>{{ pessoa.email }}</td>
                  <td>{{ pessoa.telefone }}</td>
                  <td>
                    {{ pessoa.status }}
                  </td>
                  <td class="action-buttons">
                      <button title="Visualizar" class="btn-visualizar"></button>
                      <button title="Editar" class="btn-editar"></button>
                      <button title="Deletar" class="btn-deletar"></button>
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

<script>
import SideBar from '@/components/SideBar.vue';
import UsuarioCard from '@/components/UsuarioCard.vue';

export default {
  name: "Catequizandos",
  components: {SideBar, UsuarioCard},
  data(){
    return{
      isSideBarRecolhida: true, 
      catequizandos: [], //os dados vão ser guardados aqui
      pesquisa: "", //inicia sem nada
      filtroTurma: "Todos",
      filtroOrdem: "Crescente",
      filtroSexo: "Todos",
      filtroStatus: "Todos",

      itens: 10,
      paginaAtual: 1
    };
  },
  computed:{
   total(){
    return this.catequizandos.length; 
   },

   listafiltrada(){
      let lista = this.catequizandos;

      if(this.pesquisa){
        const termo = this.pesquisa.toLowerCase();
        lista = lista.filter(p => p.nome.toLowerCase().includes(termo));
      }

      if (this.filtroTurma !== "Todos") {
        lista = lista.filter(p => p.turma === this.filtroTurma);
      }


      if(this.filtroSexo !== "Todos"){
        lista = lista.filter(p => p.sexo === this.filtroSexo);
      }

      if(this.filtroStatus !== "Todos"){
        lista = lista.filter(p => p.status === this.filtroStatus)
      }

      lista.sort((a, b) => {
        const nomeA = a.nome.toLowerCase();
        const nomeB = b.nome.toLowerCase();
        
        if (this.filtroOrdem === 'Crescente') {
          return nomeA.localeCompare(nomeB); // A-Z
        } else { // Decrescente
          return nomeB.localeCompare(nomeA); // Z-A
        }
      });

      return lista;
   },

   listacatequizandos(){
    const inicio = (this.paginaAtual - 1) * this.itens;
    const fim = inicio + this.itens;
    return this.listafiltrada.slice(inicio, fim)
    ;
   },

   totalPaginas() {
      return Math.ceil(this.listafiltrada.length / this.itens);
    },

    infoResultados() {
      const inicio = (this.paginaAtual - 1) * this.itens+ 1;
      const fim = Math.min(this.paginaAtual * this.itens, this.listafiltrada.length);
      return `${inicio} - ${fim}`;
    }

  },
  mounted(){
    this.catequizandos = [
  {
    nome: "Paula Cristina Martins",
    dataNascimento: "12/08/1984",
    sexo: "Feminino",
    email: "paula.martins@paroquia.com",
    telefone: "(11) 99876-5432",
    status: "Ativo"
  },
  {
    nome: "Rogério Alves Pereira",
    dataNascimento: "04/02/1979",
    sexo: "Masculino",
    email: "rogerio.pereira@paroquia.com",
    telefone: "(21) 98765-1234",
    status: "Ativo"
  },
  {
    nome: "Luciana Gomes da Silva",
    dataNascimento: "19/09/1990",
    sexo: "Feminino",
    email: "luciana.silva@paroquia.com",
    telefone: "(31) 99654-7890",
    status: "Ativo"
  },
  {
    nome: "Carlos Eduardo Batista",
    dataNascimento: "23/03/1988",
    sexo: "Masculino",
    email: "carlos.batista@paroquia.com",
    telefone: "(41) 96543-2121",
    status: "Ativo"
  },
  {
    nome: "Fernanda Lopes Costa",
    dataNascimento: "07/05/1992",
    sexo: "Feminino",
    email: "fernanda.costa@paroquia.com",
    telefone: "(51) 95432-7650",
    status: "Ativo"
  },
  {
    nome: "André Luiz Moura",
    dataNascimento: "11/11/1981",
    sexo: "Masculino",
    email: "andre.moura@paroquia.com",
    telefone: "(61) 98888-4321",
    status: "Ativo"
  },
  {
    nome: "Patrícia de Souza Lima",
    dataNascimento: "28/01/1986",
    sexo: "Feminino",
    email: "patricia.lima@paroquia.com",
    telefone: "(62) 97777-1111",
    status: "Ativo"
  },
  {
    nome: "João Marcos Ferreira",
    dataNascimento: "05/06/1977",
    sexo: "Masculino",
    email: "joao.ferreira@paroquia.com",
    telefone: "(63) 96666-2222",
    status: "Afastado"
  },
  {
    nome: "Aline Castro Prado",
    dataNascimento: "14/12/1994",
    sexo: "Feminino",
    email: "aline.prado@paroquia.com",
    telefone: "(64) 95555-3333",
    status: "Ativo"
  },
  {
    nome: "Eduardo Henrique Pires",
    dataNascimento: "22/10/1983",
    sexo: "Masculino",
    email: "eduardo.pires@paroquia.com",
    telefone: "(65) 94444-4444",
    status: "Ativo"
  },
  {
    nome: "Tatiane Rodrigues Melo",
    dataNascimento: "08/09/1991",
    sexo: "Feminino",
    email: "tatiane.melo@paroquia.com",
    telefone: "(66) 93333-5555",
    status: "Ativo"
  },
  {
    nome: "Rafael Moreira Dias",
    dataNascimento: "30/04/1989",
    sexo: "Masculino",
    email: "rafael.dias@paroquia.com",
    telefone: "(67) 92222-6666",
    status: "Ativo"
  },
  {
    nome: "Camila Teixeira Ramos",
    dataNascimento: "09/07/1993",
    sexo: "Feminino",
    email: "camila.ramos@paroquia.com",
    telefone: "(68) 91111-7777",
    status: "Afastado"
  },
  {
    nome: "Ricardo Oliveira Nunes",
    dataNascimento: "01/03/1982",
    sexo: "Masculino",
    email: "ricardo.nunes@paroquia.com",
    telefone: "(69) 90000-8888",
    status: "Ativo"
  },
  {
    nome: "Sandra Regina Carvalho",
    dataNascimento: "17/05/1987",
    sexo: "Feminino",
    email: "sandra.carvalho@paroquia.com",
    telefone: "(11) 98822-3344",
    status: "Ativo"
  },
  {
    nome: "Felipe Antunes Rocha",
    dataNascimento: "27/01/1990",
    sexo: "Masculino",
    email: "felipe.rocha@paroquia.com",
    telefone: "(21) 97744-5566",
    status: "Ativo"
  },
  {
    nome: "Adriana Souza Barros",
    dataNascimento: "10/11/1985",
    sexo: "Feminino",
    email: "adriana.barros@paroquia.com",
    telefone: "(31) 96633-7788",
    status: "Ativo"
  },
  {
    nome: "Marcelo Cunha Ribeiro",
    dataNascimento: "15/02/1978",
    sexo: "Masculino",
    email: "marcelo.ribeiro@paroquia.com",
    telefone: "(41) 95522-8899",
    status: "Ativo"
  },
  {
    nome: "Juliana Brito Fernandes",
    dataNascimento: "06/09/1995",
    sexo: "Feminino",
    email: "juliana.fernandes@paroquia.com",
    telefone: "(51) 94411-9900",
    status: "Afastado"
  },
  {
    nome: "Gustavo Lima Tavares",
    dataNascimento: "18/04/1980",
    sexo: "Masculino",
    email: "gustavo.tavares@paroquia.com",
    telefone: "(61) 93300-1122",
    status: "Ativo"
  }
];
  }
}
  
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
  background-color: #F6F7FB;
  color: #000000;
  font-weight: 600;
}

.table-container tbody td{
  color: #878787;
}

.table-container tbody tr:hover {
  background-color: #F6F7FB;
}

.table-container tbody tr:hover td {
color: #000000;
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
  transform: scale(1.1);
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