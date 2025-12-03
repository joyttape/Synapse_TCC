<template>
  <div v-if="loading" class="loader-screen">
    <img src="../assets/logos/logoazul.svg" class="loading-logo" />
  </div>

  <div v-else>
    <slot />
  </div>
</template>



<script setup>
import { ref, onMounted } from "vue";

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 2400);
});
</script>



<style scoped>
.loader-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  z-index: 9999;
  overflow: hidden;
}

.loading-logo {
  width: 150px;
  animation:
    pulse 1.4s ease-in-out infinite,
    fadeOut 0.7s ease forwards 1.7s; 
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.12);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: scale(0.88);
  }
}
</style>
