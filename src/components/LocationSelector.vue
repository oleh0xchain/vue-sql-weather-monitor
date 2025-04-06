<template>
  <div class="page-container">
    <div class="map-container">
      <h3>Overall Sensor Locations</h3>
      <div id="map" style="height: 450px; width: 100%;"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();



// Координаты сенсоров
const sensorLocations = [
  { lat: 52.212645, lng: 7.039657, title: "Sensor 1" },
  { lat: 52.221202, lng: 6.886354, title: "Sensor 2" },
  { lat: 52.22121, lng: 6.885737, title: "Sensor 3" },
  { lat: 52.23997, lng: 6.85014, title: "Sensor 4" },
  { lat: 52.368913, lng: 6.602899, title: "Sensor 5" },
];





// Инициализация карты
onMounted(() => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.221537, lng: 6.879702 }, // Центральная точка карты
    zoom: 10,
  });

  // Добавляем маркеры для каждого сенсора
  sensorLocations.forEach((location) => {
    new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map,
      title: location.title,
    });
  });
});
</script>

<style scoped>
h3 {
  color: black;
  margin-bottom: 10px;
}

.map-container {
    margin: 0; /* Remove any default margin */
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 100vh; /* Make it span the full height of the viewport */
    box-sizing: border-box; /* Include padding in height calculations */
  }

  .page-container h3 {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: bold;
  }
</style>
