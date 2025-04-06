<style scoped>

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
.main-container {
  margin-left: 100px; /* Делаем отступ слева равным ширине сайдбара */
  padding: 20px; /* Добавляем отступы для содержимого */
}
</style>

<template>
  <div>
    <Sidebar />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
</script>
