<template>
  <div>
    <button
      class="botao botao-claro d-lg-none m-2"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#sidebarMobile"
      aria-controls="sidebarMobile"
    >
      <i class="bi bi-list"></i>
    </button>

    <div
      class="barra-lateral d-none d-lg-flex flex-column"
      :class="{ recolhida: recolhida }"
      @mouseenter="$emit('update:recolhida', false)"
      @mouseleave="$emit('update:recolhida', true)"
    >
      <div class="cabecalho-barra-lateral d-flex align-items-center p-3">
        <div class="container-logo d-flex align-items-center">
          <div class="container-icone">
            <img src="@/assets/icones/logo/logo_black_icone.svg" alt="Logo Synapse" class="icone-logo">
          </div>
          <transition name="desvanecimento">
            <span v-if="!recolhida" class="texto-logo ms-3">Synapse</span>
          </transition>
        </div>
      </div>

      <nav class="navegacao flex-column px-3 mt-3">
        <router-link to="/catequizando" class="link-navegacao d-flex align-items-center" active-class="ativo">
          <div class="container-icone">
            <img src="@/assets/icones/catequizando/catequizando_icone.svg" alt="Ícone de catequizandos" class="icone-barra-lateral">
          </div>
          <transition name="desvanecimento">
            <span v-if="!recolhida" class="texto-navegacao ms-3">Catequizandos</span>
          </transition>
        </router-link>

        <router-link to="/catequista" class="link-navegacao d-flex align-items-center" active-class="ativo">
          <div class="container-icone">
            <img src="@/assets/icones/catequista/catequista_icone.svg" alt="Ícone de catequistas" class="icone-barra-lateral">
          </div>
          <transition name="desvanecimento">
            <span v-if="!recolhida" class="texto-navegacao ms-3">Catequistas</span>
          </transition>
        </router-link>

        <router-link to="/" class="link-navegacao d-flex align-items-center" active-class="ativo">
          <div class="container-icone">
            <img src="@/assets/icones/turma/turma_icone.svg" alt="Ícone de turmas" class="icone-barra-lateral">
          </div>
          <transition name="desvanecimento">
            <span v-if="!recolhida" class="texto-navegacao ms-3">Turmas</span>
          </transition>
        </router-link>

        <router-link to="/Documento" class="link-navegacao d-flex align-items-center" active-class="ativo">
          <div class="container-icone">
            <img src="@/assets/icones/documento/documentos_icone.svg" alt="Ícone de documentos" class="icone-barra-lateral">
          </div>
          <transition name="desvanecimento">
            <span v-if="!recolhida" class="texto-navegacao ms-3">Documentos</span>
          </transition>
        </router-link>
      </nav>

      <div class="flex-grow-1"></div>

      <div class="secao-logout p-3">
        <router-link to="/" class="link-navegacao d-flex align-items-center link-logout">
          <div class="container-icone">
            <img src="@/assets/icones/acoes/logout_black.svg" alt="Ícone de logout" class="icone-barra-lateral">
          </div>
          <transition name="desvanecimento">
            <span v-if="!recolhida" class="texto-navegacao ms-3">Log Out</span>
          </transition>
        </router-link>
      </div>
    </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  recolhida: {
    type: Boolean,
    required: true
  }
});

defineEmits(['update:recolhida']);
</script>

<style scoped>
.barra-lateral {
  position: fixed;
  top: 0;
  height: 100vh;
  left: 0;
  width: 280px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: hidden;
  white-space: nowrap;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}


.barra-lateral.recolhida {
  width: 80px;
}

.cabecalho-barra-lateral {
  min-height: 80px;
  border-bottom: 1px solid #f3f4f6;
  background: #ffffff;
}

.container-logo {
  width: 100%;
  justify-content: flex-start;
  margin: 2px 0;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.container-logo:hover {
  background: transparent;
}

.container-logo:hover .icone-barra-lateral {
  filter: brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(1986%) hue-rotate(214deg) brightness(97%) contrast(97%);
}

.container-logo:hover .texto-navegacao {
  color: #3b82f6;
}

.container-icone {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.icone-barra-lateral {
  width: 20px;
  height: 20px;
  transition: filter 0.2s ease;
}

.icone-logo{
  width: 30px;
}

.texto-logo{
  font-size: 1.2rem;
  font-weight: 600;
}

.navegacao {
  padding-top: 8px;
}

.link-navegacao {
  color: black;
  border-radius: 8px;
  margin: 2px 0;
  padding: 12px 16px;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  min-height: 48px;
}

.link-navegacao:hover {
  background: #3b82f6;
  color: #ffffff;
  text-decoration: none;
}

.link-navegacao:hover .icone-barra-lateral {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(109deg) brightness(101%) contrast(101%);
}

.link-navegacao.ativo {
  background: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.3);
}

.link-navegacao.ativo .icone-barra-lateral {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(109deg) brightness(101%) contrast(101%);
}

.texto-navegacao {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  transition: color 0.2s ease;
}


.secao-logout {
  border-top: 1px solid #f3f4f6;
  margin-top: auto;
}

.link-logout {
  color: black;
  margin: 0;
}

.link-logout:hover {
  background: #fef2f2;
  color: #dc2626;
}

.link-logout:hover .icone-barra-lateral {
  filter: brightness(0) saturate(100%) invert(17%) sepia(95%) saturate(7471%) hue-rotate(356deg) brightness(91%) contrast(91%);
}

.desvanecimento-enter-active,
.desvanecimento-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.desvanecimento-enter-from,
.desvanecimento-leave-to {
  opacity: 0;
}

.offcanvas {
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
}

.offcanvas-header {
  border-bottom: 1px solid #f3f4f6;
}

.icone-mobile {
  width: 20px;
  height: 20px;
  filter: brightness(0) saturate(100%) invert(44%) sepia(7%) saturate(1190%) hue-rotate(201deg) brightness(95%) contrast(86%);
}

.link-navegacao-mobile {
  border-radius: 8px;
  margin: 4px 16px;
  padding: 12px 16px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.link-navegacao-mobile:hover {
  background: #f9fafb;
  text-decoration: none;
}

@media (max-width: 991.98px) {
  .barra-lateral {
    display: none !important;
  }
}

.botao {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.botao-claro {
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}

.botao-claro:hover {
  color: #212529;
  background-color: #d3d4d5;
  border-color: #c6c7c8;
}
</style>
