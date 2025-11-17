<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">

      <div class="col-md-6 d-flex flex-column justify-content-between  text-white text-start quadrado_esquerdo">

        <div class="p-4">
            <img src="@/assets/logos/logo_branca.svg" alt="Logo Synapse na cor azul." style="width: 10rem;">
        </div>

        <div class="m-5">
        <h1 class="fw-bold mb-3">Bem vindo(a)!</h1>
        <p class="fs-5">O Synapse te auxilia à gerenciar encontros, <br/>turmas, documentos e muito mais.</p>
        </div>

        <div>
        </div>
       
      </div>

      <div class="col-md-6 d-flex justify-content-center align-items-center bg-white shadow-lg">
        <div class="w-75">

          

          <h3 class="mt-2 text-center">Log In</h3>
          <p class="mt-2 text-center">Acesse o Synapse</p>

          <form>
            <div class="form-floating mb-3">
              <input type="email" class="form-control input-login rounded-1 fw-medium" id="email" placeholder="seuemail@email.com">
              <label for="email">Email</label>
            </div>

            <div class="form-floating mb-3">
              <input type="password" class="form-control input-login rounded-1 fw-medium" id="senha" placeholder="Insira sua senha">
              <label for="senha">Senha</label>
            </div>

            <div class="mb-3 text-end">
              <a href="#" class="small text-decoration-none">Esqueceu ou deseja alterar sua senha?</a>
            </div>

            <router-link to="/catequizando" class="btn btn-primary w-100 rounded-3">
              Acessar
            </router-link>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

.quadrado_esquerdo {
  background: linear-gradient(135deg, #2968DA, #2575fc);
}

.input-login {
  border: 2px solid #0d6efd;
  border-left: 6px solid #0d6efd;
}

.btn-primary {
  background-color: #0d6efd;
  border: none;
  height: 45px;
  font-size: 1rem;
  font-weight: 500;
}
.btn-primary:hover {
  background-color: #2968DA;
}
</style>
