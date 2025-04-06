import { createRouter, createWebHistory } from 'vue-router';
import LocationSelector from '../components/LocationSelector.vue';
import WeatherDetails from '../components/WeatherDetails.vue';
import Home from '../components/Home.vue'; 


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, // Убедитесь, что тут Home
  },
  {
    path: '/locations',
    name: 'Locations',
    component: LocationSelector,
  },
  {
    path: '/weather/:city',
    name: 'WeatherDetails',
    component: WeatherDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
