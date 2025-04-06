<template>
    <div class="rssi-widget">
      <div class="rssi-icon">
        <i class="el-icon-wifi"></i>
      </div>
      <div class="rssi-status">
        <h3>Connection status</h3>
        <p>Reply time (in ms): {{ replyTime }}</p>
      </div>
    </div>
  </template>

  <script setup>
  // Фиктивные данные
  import { ref } from 'vue';
  const replyTime = ref(15); // Фиктивное значение времени ответа
  </script>

  <style scoped>
  .rssi-widget {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #6c63ff; /* Основной цвет */
    color: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
  }

  .rssi-widget .rssi-icon {
    font-size: 36px;
    margin-bottom: 10px;
  }

  .rssi-widget h3 {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  }

  .rssi-widget p {
    font-size: 14px;
    margin: 5px 0 0;
  }
  </style>
