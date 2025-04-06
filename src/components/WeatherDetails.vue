<template>
  <div class="weather-details-container">
    <!-- Графики в самом верху -->
    <div class="chart-container">
      <div class="charts-grid">
        <WeatherChart title="Temperature" parameter="temperature" :location="city" />
        <WeatherChart title="Humidity" parameter="humidity" :location="city" />
        <WeatherChart title="Pressure" parameter="pressure" :location="city" />
        <WeatherChart title="Lighting Level" parameter="lighting_level" :location="city" />

      </div>
    </div>



    <!-- Loading Screen -->
    <div>
    <div v-if="isLoading" class="loading-container">
      <p>Loading...</p>
      <div class="spinner"></div>
    </div>
    <!-- Main Content -->
      <div v-else class="weather-main-widget">
        <div class="weather-icon">
          <img :src="weatherIcon" alt="Weather Icon" />
        </div>
        <div class="weather-info">
          <h2>Weather Details for {{ city }}</h2>
          <p>Temperature: {{ temperature !== null ? `${temperature}°C` : 'N/A' }}</p>
          <p>Humidity: {{ humidity !== null ? `${humidity}%` : 'N/A' }}</p>
          <p>Lighting level: {{ lightingLevel !== null ? `${lightingLevel}%` : 'N/A' }}</p>
        </div>
      </div>
    </div>


    <!-- Виджеты в одну строку -->
    <div class="info-widgets-row">
      <div class="connection-status">
        <h3>Connection Status</h3>
        <p>Signal Strength (dBi): <strong>{{ connectionStatus !== null ? connectionStatus : 'N/A' }}</strong></p>
      </div>
      <div class="battery-status">
        <h3>Battery Status</h3>
        <p>🔋 Battery Level: <strong>{{ batteryStatus !== null ? batteryStatus : 'N/A' }}</strong></p>
        <p>⚡ Battery Voltage: <strong>{{ batteryVoltage !== null ? `${batteryVoltage} V` : 'N/A' }}</strong></p>
      </div>
      <div class="sun-info">
        <h3>Sunrise & Sunset</h3>
        <p>🌅 Sunrise: 08:42 AM</p>
        <p>🌇 Sunset: 16:31 PM</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import WeatherChart from '../components/WeatherChart.vue';

const route = useRoute();
const router = useRouter();
const city = ref(route.params.city);

const temperature = ref(null);
const humidity = ref(null);
const lightingLevel = ref(null);
const connectionStatus = ref(null);
const batteryStatus = ref(null);
const batteryVoltage = ref(null);
const weatherIcon = ref('');
const isLoading = ref(true);

const updateWeatherIcon = () => {
  if (temperature.value === null || humidity.value === null) return;

  const isDay = new Date().getHours() >= 8 && new Date().getHours() < 16;
  if (isDay) {
    if (temperature.value > 20 && humidity.value < 30) {
      weatherIcon.value = '/weather/sunny-day.gif';
    } else if (humidity.value >= 30 && humidity.value <= 70) {
      weatherIcon.value = '/weather/cloudy-day.gif';
    } else if (humidity.value > 70) {
      weatherIcon.value = '/weather/rainy-day.gif';
    }
  } else {
    if (temperature.value > 10 && humidity.value < 30) {
      weatherIcon.value = '/weather/clear-night.gif';
    } else if (humidity.value >= 30 && humidity.value <= 70) {
      weatherIcon.value = '/weather/cloudy-night.gif';
    } else if (humidity.value > 70) {
      weatherIcon.value = '/weather/rainy-night.gif';
    }
  }
};

const fetchWeatherData = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(`http://localhost:3000/weather?location=${city.value}`);
    if (!response.ok) throw new Error('Server Error');

    const data = await response.json();
    if (data.length > 0) {
      const weatherData = data[0];
      temperature.value = weatherData.temperature || null;
      humidity.value = weatherData.humidity || null;
      connectionStatus.value = weatherData.rssi || null;
      batteryVoltage.value = weatherData.battery_voltage || null;
      batteryStatus.value = weatherData.battery_status || null;
      lightingLevel.value = weatherData.illumination !== null
          ? weatherData.illumination.toFixed(2)
          : 'N/A';
      updateWeatherIcon();
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    isLoading.value = false;
  }
};

watch(() => route.params.city, (newCity) => {
  city.value = newCity;
  fetchWeatherData();
});

onMounted(() => {
  fetchWeatherData();
});

</script>




<style scoped>
.weather-details-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
  width: 100%;
  box-sizing: border-box;
}

.chart-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}


.weather-main-widget {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.weather-icon img {
  width: 350px; /* Увеличенный размер гифки */
  height: 350px;
}

.weather-info {
  flex: 1;
  color: black;
  margin-left: 20px; /* Отступ от гифки */
}

.weather-info h2 {
  margin-bottom: 10px;
}

.info-widgets-row {
  display: flex;
  justify-content: space-between; /* Размещаем виджеты равномерно */
  gap: 20px; /* Отступ между виджетами */
}

.connection-status,
.battery-status,
.sun-info {
  flex: 1; /* Все виджеты одинаковой ширины */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.connection-status {
  background: #7b61ff;
  color: white;
}

.battery-status {
  background: #dfffd9;
  color: #3e8e41;
  text-align: center;
}

.sun-info {
  color: black;
  background: #eef5ff;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 380px;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.loading-container p {
  font-size: 1.2rem;
  color: grey;
  margin-bottom: 10px;
}


.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: black;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
