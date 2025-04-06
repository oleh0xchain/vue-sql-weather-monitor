import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { Chart as ChartJS, registerables } from 'chart.js';

import router from './router';

import './style.css';

// Регистрация всех компонентов Chart.js
ChartJS.register(...registerables);



const app = createApp(App);

app.use(router); // Сначала подключаем роутер
app.use(ElementPlus); // Затем подключаем Element Plus


// Только после всего монтируем приложение
app.mount('#app');
