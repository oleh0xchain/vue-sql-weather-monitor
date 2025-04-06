<template>
  <div class="sidebar">
    <el-menu
      :default-active="activeMenu"
      class="menu"
      background-color="#1F2937"
      text-color="#ffffff"
      active-text-color="#4F46E5"
      router
    >
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/weather/Lora">Lora</el-menu-item>
      <el-menu-item index="/weather/Enschede">Enschede</el-menu-item>
      <el-menu-item index="/weather/Wierden">Wierden</el-menu-item>
      <el-menu-item index="/weather/Gronau">Gronau</el-menu-item>
      <el-menu-item index="/locations">Locations</el-menu-item>

    </el-menu>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();
const activeMenu = route.path; // Динамически определяем активное меню
</script>

<style scoped>
.sidebar {
  position: fixed; /* Фиксируем сайдбар */
  top: 0;
  left: 0;
  height: 100vh; /* Полная высота экрана */
  width: 200px; /* Ширина сайдбара */
  background-color: #1F2937; /* Цвет фона */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.menu-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 10px 20px;
}

.menu-link:hover {
  color: #4F46E5;
}
</style>
