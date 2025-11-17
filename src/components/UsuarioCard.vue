<template>
  <div class="usuario-card">
    <img src="" alt="Foto do usuário">
    <div class="usuario-info">
      <strong>{{ nome }}</strong>
      <span>{{ email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
    nome: String,
    email: String
})
</script>

<style scoped>
.usuario-card {
  display: flex;
  align-items: center;
  background: rgba(162, 22, 22, 0);
  padding: 10px 25px;
  border-radius: 10px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  align-content: flex-start;
  margin-bottom: 20px;
}

.usuario-card img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: black;
  object-fit: cover;
  margin-right: 20px;
}

.usuario-info {
  display: flex;
  flex-direction: column;
  line-height: 1.4; 
}

.usuario-info strong {
  font-size: 1rem;
  color: #222;
}

.usuario-info span {
  font-size: 0.9rem;
  color: #666;
}
</style>