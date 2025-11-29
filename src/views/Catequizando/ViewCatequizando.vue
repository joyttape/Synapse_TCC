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

            <h1 class="mb-4 titulo">Visualizar Dados</h1>

            <div class="card form-card mb-4 shadow-sm">
              <div class="row g-0">
                <div class="col-md-9 p-4">
                  <h2 class="secao-titulo">Dados Pessoais</h2>

                  <div class="row">
                    <div class="col-12 mb-3">
                      <label class="form-label">Nome Completo <span class="text-danger">*</span></label>
                      <input v-model="form.nome" type="text" class="form-control input-sim" disabled />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Telefone <span class="text-danger">*</span></label>
                      <input v-model="form.telefone" type="text" class="form-control input-sim" disabled />
                    </div>

                    <div class="col-md-6 d-flex gap-3 mb-3 align-items-end">
                      <div class="flex-fill">
                        <label class="form-label">Data de Nascimento <span class="text-danger">*</span></label>
                        <input v-model="form.nascimento" type="text" class="form-control input-small" disabled />
                      </div>

                      <div class="flex-fill">
                        <label class="form-label">Ativo <span class="text-danger">*</span></label>
                        <select v-model="form.ativo" class="form-select input-small" disabled>
                          <option value="">Selecione</option>
                          <option value="true">Sim</option>
                          <option value="false">Não</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Comunidade <span class="text-danger">*</span></label>
                      <select v-model="form.id_comunidade_fk" class="form-select input-small" disabled>
                        <option value="">Selecione</option>
                        <option
                          v-for="c in comunidades"
                          :key="c.id_comunidade"
                          :value="c.id_comunidade"
                        >
                          {{ c.nome }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Sexo <span class="text-danger">*</span></label>
                      <select v-model="form.sexo" class="form-select input-small" disabled>
                        <option value="">Selecione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                      </select>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Nome do Pai <span class="text-danger">*</span></label>
                      <input v-model="form.nomepai" type="text" class="form-control input-sim" disabled />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Telefone do Pai <span class="text-danger">*</span></label>
                      <input v-model="form.telefonepai" type="text" class="form-control input-sim" disabled />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Nome da Mãe <span class="text-danger">*</span></label>
                      <input v-model="form.nomemae" type="text" class="form-control input-sim" disabled />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Telefone da Mãe <span class="text-danger">*</span></label>
                      <input v-model="form.telefonemae" type="text" class="form-control input-sim" disabled />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label">Email <span class="text-danger">*</span></label>
                      <input v-model="form.email" type="email" class="form-control input-sim" disabled />
                    </div>

                    <div class="col-md-3 mb-3">
                      <label class="form-label">Possui pais juntos? <span class="text-danger">*</span></label>
                      <div class="checkbox-group">
                        <label><input type="radio" value="true" v-model="form.paisjuntos" disabled /> Sim</label>
                        <label><input type="radio" value="false" v-model="form.paisjuntos" disabled /> Não</label>
                      </div>
                    </div>

                    <div class="col-md-3 mb-3">
                      <label class="form-label">Frequenta outras igrejas? <span class="text-danger">*</span></label>
                      <div class="checkbox-group">
                        <label><input type="radio" value="true" v-model="form.frequentaigrejas" disabled /> Sim</label>
                        <label><input type="radio" value="false" v-model="form.frequentaigrejas" disabled /> Não</label>
                      </div>
                    </div>

                    <div class="col-md-3 mb-3">
                      <label class="form-label">É batizado(a)? <span class="text-danger">*</span></label>
                      <div class="checkbox-group">
                        <label><input type="radio" value="true" v-model="form.batizado" disabled /> Sim</label>
                        <label><input type="radio" value="false" v-model="form.batizado" disabled /> Não</label>
                      </div>
                    </div>

                    <div class="col-md-3 mb-3">
                      <label class="form-label">Frequenta a comunidade? <span class="text-danger">*</span></label>
                      <div class="checkbox-group">
                        <label><input type="radio" value="true" v-model="form.frequentacomunidade" disabled /> Sim</label>
                        <label><input type="radio" value="false" v-model="form.frequentacomunidade" disabled /> Não</label>
                      </div>
                    </div>

                  </div>
                </div>

                <div class="col-md-3 d-flex flex-column align-items-center justify-content-center foto-area p-4">
                  <div class="foto-border mb-3">
                    <div class="foto-placeholder">
                      <img src="/src/assets/icones/acoes/iconfomr.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card form-card p-4 mb-4 shadow-sm">
              <h2 class="secao-titulo">Dados de endereço</h2>

              <div class="row mt-3">
                <div class="col-12 mb-3">
                  <label class="form-label">Logradouro <span class="text-danger">*</span></label>
                  <input v-model="form.logradouro" type="text" class="form-control input-sim" disabled />
                </div>

                <div class="col-md-5 mb-3">
                  <label class="form-label">Complemento <span class="text-danger">*</span></label>
                  <input v-model="form.complemento" type="text" class="form-control input-sim" disabled />
                </div>

                <div class="col-md-5 mb-3">
                  <label class="form-label">Bairro <span class="text-danger">*</span></label>
                  <input v-model="form.bairro" type="text" class="form-control input-sim" disabled />
                </div>

                <div class="col-md-3 mb-3">
                  <label class="form-label">Estado <span class="text-danger">*</span></label>
                  <input v-model="form.estado" type="text" class="form-control input-small" disabled />
                </div>

                <div class="col-md-4 mb-3">
                  <label class="form-label">Cidade <span class="text-danger">*</span></label>
                  <input v-model="form.cidade" type="text" class="form-control input-small" disabled />
                </div>

                <div class="col-md-2 mb-3">
                  <label class="form-label">Número <span class="text-danger">*</span></label>
                  <input v-model="form.numero" type="text" class="form-control input-small" disabled />
                </div>

                <div class="col-md-3 mb-3">
                  <label class="form-label">CEP <span class="text-danger">*</span></label>
                  <input v-model="form.cep" type="text" class="form-control input-small" disabled />
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/common/http';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'ViewCatequizando',
  components: { SideBar },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const isSideBarRecolhida = ref(true);
    const comunidades = ref([]);

    const form = reactive({
      nome: '',
      telefone: '',
      nascimento: '',
      ativo: '',
      id_comunidade_fk: '',
      sexo: '',
      email: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      estado: '',
      cidade: '',
      numero: '',
      cep: '',
      nomepai: '',
      telefonepai: '',
      nomemae: '',
      telefonemae: '',
      paisjuntos: '',
      frequentaigrejas: '',
      batizado: '',
      frequentacomunidade: ''
    });

    async function buscarComunidades() {
      try {
        const resposta = await api.get('/api/Comunidade');
        console.log("Comunidades recebidas:", resposta.data);

        comunidades.value = resposta.data;
      } catch (error) {
        console.error('Erro ao buscar comunidades:', error);
      }
    }

    async function carregarCatequizando(id : number) {
      try {
        console.log("Carregando catequizando ID:", id);

        const { data } = await api.get(`/api/Catequizando/${id}`);

        console.log("Dados recebidos da API:", data);

        console.log("data.usuario:", data.usuario);
        console.log("data.usuario.endereco:", data.usuario?.endereco);

        const u = data.usuario ?? {};
        const e = u.endereco ?? {};

        form.nome = u.nome ?? '';
        form.telefone = formatarTelefone(u.telefone ?? '');
        form.nascimento = u.data_nascimento ? formatarDataNascimento(u.data_nascimento) : '';
        form.ativo = u.ativo !== undefined ? String(u.ativo) : '';
        form.sexo = u.sexo ?? '';
        form.email = u.email ?? '';
        form.id_comunidade_fk = u.id_comunidade_fk ?? '';

        console.log(" Dados do usuário preenchidos:", { ...form });


        form.logradouro = e.logradouro ?? '';
        form.complemento = e.complemento ?? '';
        form.bairro = e.bairro ?? '';
        form.estado = e.estado ?? '';
        form.cidade = e.cidade ?? '';
        form.numero = e.numero ?? '';
        form.cep = formatarCEP(e.cep ?? '');

        form.nomepai = data.nome_pai ?? '';
        form.telefonepai = formatarTelefone(data.telefone_pai ?? '');
        form.nomemae = data.nome_mae ?? '';
        form.telefonemae = formatarTelefone(data.telefone_mae ?? '');

        form.paisjuntos = data.pais_juntos !== undefined ? String(data.pais_juntos) : '';
        form.frequentaigrejas =
          data.frequenta_outras_igrejas !== undefined ? String(data.frequenta_outras_igrejas) : '';
        form.batizado = data.batizado !== undefined ? String(data.batizado) : '';
        form.frequentacomunidade =
          data.frequenta_comunidade !== undefined ? String(data.frequenta_comunidade) : '';

      } catch (error) {
        console.error('Erro ao carregar catequizando:', error);
        router.push('/Catequizando');
      }
    }

    function formatarTelefone(valor:string) {
      if (!valor) return '';
      return valor
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    }

    function formatarCEP(valor:string) {
      if (!valor) return '';
      return valor.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
    }

    function formatarDataNascimento(data:string) {
      if (!data) return '';
      return data.split('-').reverse().join('/');
    }
    onMounted(() => {
      buscarComunidades();

      const idParam = route.params.id;
      const id = Number(idParam)
      if (!id) {
        console.error('ID não encontrado na URL');
        return;
      }

      carregarCatequizando(id);
    });

    return {
      isSideBarRecolhida,
      comunidades,
      form
    };
  }
};
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

.barra-lateral {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px; 
  z-index: 30;
  transition: width 0.25s ease; 
  box-sizing: border-box;
}

.barra-lateral.recolhida {
  width: 80px;
}

.form-page {
  flex: 1;
  transition: margin-left 0.25s ease;
  margin-left: 280px; 
  position: relative;
  z-index: 10;
  min-height: 100vh;
  box-sizing: border-box;
}

.form-page.content-recolhido {
  margin-left: 80px;
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

.form-label { 
  font-size: 13px; 
  font-weight: 500; 
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

</style>