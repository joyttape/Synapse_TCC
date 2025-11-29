<template>
  <div class="page-wrapper">
    <!-- botão voltar -->
    <RouterLink to="/Turma/DetalhesTurma/Encontro" class="btn-voltar">← Voltar para Detalhes de Turma</RouterLink>

    <h1 class="titulo">Editar Encontro</h1>

    <div class="card form-card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3 mb-3">
            <label>Data do Encontro <span class="req">*</span></label>
            <input type="text" v-model="form.data" placeholder="dd/mm/yyyy" class="form-control" />
          </div>

          <div class="col-md-3 mb-3">
            <label>Tema <span class="req">*</span></label>
            <input type="text" v-model="form.tema" class="form-control" />
          </div>

          <div class="col-12 mb-3">
            <label>Observações</label>
            <textarea v-model="form.obs" class="form-control textarea"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de catequizandos -->
    <div class="list-section">
      <div class="list-header">
        <h3>Catequizandos</h3>
        <button class="btn-presenca" @click="abrirModal">Registrar Presença</button>
      </div>

      <table class="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nascimento</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, i) in catequizandos" :key="i">
            <td>{{ c.nome }}</td>
            <td>{{ c.nasc }}</td>
            <td>{{ c.tel }}</td>
            <td>{{ c.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="save-area">
      <button class="btn-salvar">Salvar Encontro</button>
    </div>

    <!-- MODAL -->
    <div v-if="modal" class="modal-overlay" @click.self="modal=false">
      <div class="modal-card">
        <div class="modal-search">
          <input type="text" v-model="busca" placeholder="Buscar..." />
          <button class="btn-icon" @click="busca=''">✕</button>
        </div>

        <div class="modal-list">
          <table class="modal-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nascimento</th>
                <th>Presente</th>
                <th>Ausente</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(c, i) in filtrados" :key="i">
                <td>{{ c.nome }}</td>
                <td>{{ c.nasc }}</td>
                <td><input type="checkbox" v-model="c.presente" /></td>
                <td><input type="checkbox" v-model="c.ausente" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal-actions">
          <button class="btn-salvar-freq">Salvar Frequência</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { data: '', tema: '', obs: '' },
      modal: false,
      busca: '',
      catequizandos: [
        { nome: 'João Pé de Feijão', nasc: '15/03/1990', tel: '69 00000-0000', email: 'seumail@gmail.com', presente:false, ausente:false },
        { nome: 'João Pé de Feijão', nasc: '15/03/1990', tel: '69 00000-0000', email: 'seumail@gmail.com', presente:false, ausente:false },
        { nome: 'João Pé de Feijão', nasc: '15/03/1990', tel: '69 00000-0000', email: 'seumail@gmail.com', presente:false, ausente:false }
      ]
    };
  },
  computed: {
    filtrados() {
      if (!this.busca) return this.catequizandos;
      return this.catequizandos.filter(c => c.nome.toLowerCase().includes(this.busca.toLowerCase()));
    }
  },
  methods: {
    abrirModal() { this.modal = true; }
  }
};
</script>

<style scoped>
.page-wrapper { padding: 20px 40px; }
.btn-voltar { display:inline-block; padding:8px 16px; border:1px solid #0d6efd; border-radius:20px; color:#0d6efd; margin-bottom:20px; }
.titulo { font-size:24px; font-weight:700; margin-bottom:20px; }

.form-card { background:#fff; border-radius:16px; box-shadow:0 8px 30px rgba(0,0,0,0.07); margin-bottom:30px; }
.card-body { padding:30px; }
.form-control { width:100%; height:44px; background:#f3f6fb; border:1px solid #e6eef9; border-radius:10px; padding:10px; }
.textarea { height:110px !important; }
.req { color:red; }

.list-section { margin-top:25px; }
.list-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
.btn-presenca { background:#44c051; border:none; color:white; padding:10px 20px; border-radius:20px; }

.tabela { width:100%; border-collapse:collapse; background:white; border-radius:12px; overflow:hidden; }
.tabela th { text-align:left; padding:12px; background:#eef0f3; }
.tabela td { padding:14px; border-bottom:1px solid #f1f1f1; }

.save-area { display:flex; justify-content:flex-end; margin-top:20px; }
.btn-salvar { padding:10px 20px; background:#0d6efd; color:white; border-radius:20px; }

/* MODAL */
.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.35); display:flex; align-items:center; justify-content:center; padding:40px; }
.modal-card { width:100%; max-width:900px; background:white; border-radius:20px; box-shadow:0 20px 60px rgba(0,0,0,0.15); overflow:hidden; }

.modal-search { padding:20px; display:flex; gap:10px; border-bottom:1px solid #eee; }
.modal-search input { flex:1; height:45px; border-radius:40px; border:1px solid #eaeaea; padding:10px 14px; background:#f7f7f7; }

.modal-list { max-height:450px; overflow:auto; padding:20px; }
.modal-table { width:100%; border-collapse:collapse; }
.modal-table th { background:#eef0f3; padding:12px; text-align:left; }
.modal-table td { padding:12px; border-bottom:1px solid #f1f1f1; }

.modal-actions { padding:20px; display:flex; justify-content:flex-end; }
.btn-salvar-freq { background:#0d6efd; color:white; padding:10px 20px; border-radius:20px; }
</style>
