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
                <RouterLink :to="`/Turma/EditTurma/${form.id_turma}`">
                  <button class="btn-edit">Editar Turma</button>
                </RouterLink>

                <button class="btn-delete" @click="deletarTurma(form.id_turma)">Deletar</button>
              </div>
            </header>

            <div class="card bloco">
              <div class="bloco-body">
                <div class="row">

                  <div class="col-md-6 mb-4">
                    <label class="form-label">Nome da Turma <span class="text-danger">*</span></label>
                    <input v-model="form.nome" type="text" class="form-control" readonly />
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Data <span class="text-danger">*</span></label>
                    <input v-model="form.dataturma" type="date" class="form-control" readonly />
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Idade Mínima / Máxima</label>
                    <div class="d-flex gap-2">
                      <input v-model="form.idademin" type="number" class="form-control" readonly />
                      <input v-model="form.idademax" type="number" class="form-control" readonly />
                    </div>
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Quantidade Catequizandos <span class="text-danger">*</span></label>
                    <input v-model="form.limitecatequizando" type="text" class="form-control" readonly />
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Dia da Semana <span class="text-danger">*</span></label>
                    <select v-model="form.diasemana" class="form-select" disabled>
                      <option value="Segunda-feira">Segunda-feira</option>
                      <option value="Terça-feira">Terça-feira</option>
                      <option value="Quarta-feira">Quarta-feira</option>
                      <option value="Quinta-feira">Quinta-feira</option>
                      <option value="Sexta-feira">Sexta-feira</option>
                      <option value="Sábado">Sábado</option>
                      <option value="Domingo">Domingo</option>
                    </select>
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Ativo <span class="text-danger">*</span></label>
                    <select v-model="form.status" class="form-select" disabled>
                      <option :value="true">Sim</option>
                      <option :value="false">Não</option>
                    </select>
                  </div>

                  <div class="col-md-3 mb-4">
                    <label class="form-label">Horário Inic. / Horário Fim</label>
                    <div class="d-flex gap-2">
                      <input v-model="form.horarioinicial" type="time" class="form-control" readonly />
                      <input v-model="form.horariofinal" type="time" class="form-control" readonly />
                    </div>
                  </div>

                  <div class="campo full">
                    <label>Descrição</label>
                    <textarea v-model="form.descricao" class="input textarea" readonly></textarea>
                  </div>

                </div>
              </div>
            </div>

            <div class="card bloco">
              <label class="sec-title">Catequista(s)</label>

              <div class="lista tabela">
                <div v-for="c in catequistas" :key="c.id" class="lista linha">
                  <div class="linha-item">{{ c.nome }}</div>
                  <div class="linha-item">{{ c.nascimento }}</div>
                  <div class="linha-item">{{ c.telefone }}</div>
                  <div class="linha-item">{{ c.email }}</div>
                </div>
              </div>
            </div>

            <div class="card bloco">
              <label class="sec-title">Catequizandos</label>

              <div class="lista tabela">
                <div class="t-row" v-for="p in catequizandos" :key="p.id">
                  <span>{{ p.nome }}</span>
                  <span>{{ p.nascimento }}</span>
                  <span>{{ p.telefone }}</span>
                  <span>{{ p.email }}</span>
                </div>
              </div>
            </div>

            <div class="encontros-header">
              <h3>Encontros</h3>
              <RouterLink :to="`/Turma/DetalhesTurma/${form.id_turma}/Encontro`">
                <button class="btn-add">Adicionar Encontro</button>
              </RouterLink>
            </div>

          </div>
        </main>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/SideBar.vue";
import { api } from "@/common/http";
import Swal from "sweetalert2";

export default {
  name: "DetalhesTurmas",
  components: { SideBar },

  data() {
    return {
      isSideBarRecolhida: true,

      form: {
        id_turma: null,
        nome: "",
        descricao: "",
        dataturma: "",
        idademin: "",
        idademax: "",
        limitecatequizando: "",
        diasemana: "",
        status: true,
        horarioinicial: "",
        horariofinal: "",
      },

      catequistas: [],
      catequizandos: [],
    };
  },

  mounted() {
    this.carregarTurma();
  },

  methods: {
    async carregarTurma() {
      try {
        const id = this.$route.params.id;
        const { data } = await api.get(`/api/Turma/${id}`);

        this.form = {
          id_turma: data.id_turma,
          nome: data.nome,
          descricao: data.descricao,
          dataturma: data.dataturma?.substring(0, 10) || "",
          idademin: data.idademin,
          idademax: data.idademax,
          limitecatequizando: data.limitecatequizando,
          diasemana: data.diasemana,
          status: data.status,
          horarioinicial: data.horarioinicial,
          horariofinal: data.horariofinal,
        };

        this.catequistas =
          data.catequistas?.map((c) => ({
            nome: c.usuario?.nome,
            nascimento: c.usuario?.data_nascimento?.substring(0, 10),
            telefone: c.usuario?.telefone,
            email: c.usuario?.email,
          })) || [];

        this.catequizandos =
          data.catequizandos?.map((c) => ({
            nome: c.usuario?.nome,
            nascimento: c.usuario?.data_nascimento?.substring(0, 10),
            telefone: c.usuario?.telefone,
            email: c.usuario?.email,
          })) || [];
      } catch (err) {
        console.error("Erro ao carregar turma:", err);
      }
    },

    async deletarTurma(id: number) {
      try {
        const confirm = await Swal.fire({
          title: "Confirmar exclusão",
          text: "Deseja realmente excluir esta turma?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sim, excluir",
          cancelButtonText: "Cancelar",
        });

        if (!confirm.isConfirmed) return;

        const response = await api.delete(`/api/Turma/${id}`);

        if (response.status === 200 || response.status === 204) {
          await Swal.fire({
            icon: "success",
            title: "Excluído!",
            text: "A turma foi removida com sucesso.",
          });

          this.$router.push("/Turma");
        }
      } catch (error) {
        console.error("Erro ao deletar turma", error);

        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível excluir a turma.",
        });
      }
    },
  },
};
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

.detalhes-page {
  flex: 1;
  padding: 40px;
  transition: margin-left .28s ease;
}

.content-recolhido {
  margin-left: 80px;
}

.container-detalhes {
  max-width: 1200px;
  margin: 0 auto;
}

.btn-return {
  border: 1.5px solid #0d6efd;
  color: #0d6efd;
  padding: 8px 18px;
  border-radius: 25px;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 20px;
}

.btn-return:hover {
  background: #0d6efd;
  color: #fff;
}

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.top-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
}

.btn-group {
  display: flex;
  gap: 12px;
}

.btn-edit {
  background: #d9dce2;
  border: none;
  padding: 8px 18px;
  border-radius: 25px;
}

.btn-delete {
  background: #e01a1a;
  border: none;
  color: #fff;
  padding: 8px 18px;
  border-radius: 25px;
}

.card {
  background: #fff;
  border: 1px solid #eef0f3;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
}

.row-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.full {
  grid-column: span 3;
}

.label {
  font-weight: 600;
}

.input {
  background: #f3f6fb;
  border: 1px solid #e6eef9;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
}

.textarea {
  height: 90px;
  resize: none;
}

.lista.linha {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px;
  background: #f3f6fb;
  border-radius: 12px;
}

.linha-item {
  padding: 8px;
}

.tabela {
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

.encontros-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
}

.btn-add {
  background: #0d6efd;
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 25px;
}

.search-box {
  margin-bottom: 20px;
}

.cards-encontros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.encontro-card {
  background: #6464ff;
  color: #fff;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.enc-title {
  font-size: 1.1rem;
  font-weight: 700;
}

.enc-sub {
  opacity: .9;
}

.enc-date {
  font-size: .9rem;
  opacity: .9;
}

.icons {
  margin-top: 8px;
  display: flex;
  gap: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>
