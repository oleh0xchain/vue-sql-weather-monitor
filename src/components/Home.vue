<template>
    <div class="home-page">
      <div class="content-card">
        <div class="vite-logo">
          <img :src="image" class ="logo"/>
        </div>
        <h1>
          SkyScan
        </h1>
        <p>
          This application is designed to monitor weather data and sensor
          parameters in real-time. The system provides detailed information about
          weather conditions, sensor connectivity, and location, as well as
          graphical data analysis over various timeframes.
        </p>
  
        <h2>How to Use the SkyScan Application</h2>
        <ol>
          <li>
            Navigate to the <strong>Locations</strong> tab to select a city and
            access weather details for a specific sensor.
          </li>
          <li>On the weather details page, you can view:</li>
          <ul>
            <li>Current weather data (temperature, humidity, wind speed).</li>
            <li>Sensor connection status and battery level.</li>
            <li>Sunrise and sunset times.</li>
            <li>The exact location of the sensor on an interactive map.</li>
            <li>
              Graphical analysis of weather parameters over selected timeframes.
            </li>
          </ul>
          <li>
            Customize the data displayed by selecting parameters and timeframes
            for the chart.
          </li>
          <li>
            Use the <strong>"Back to Locations"</strong> button to return to the
            city selection page.
          </li>
        </ol>
  
        <h2>About the Project</h2>
        <p>
          SkyScan is a collaborative project created by <strong>Group 8</strong>.
          The primary goal of this application is to provide an intuitive
          interface for weather monitoring and sensor data analysis. It serves as
          a powerful tool for environmental researchers, IoT developers, and
          anyone interested in real-time weather tracking.
        </p>
  
        <h3>Technologies Used</h3>
        <ul>
          <li><strong>Vue.js</strong>: Frontend framework for building a responsive and dynamic user interface.</li>
          <li><strong>Chart.js</strong>: Library for rendering customizable charts and graphs.</li>
          <li><strong>Google Maps API</strong>: Integration for displaying sensor locations on an interactive map.</li>
          <li><strong>Element Plus</strong>: UI component library for modern design elements.</li>
        </ul>
  
        <h3>Contact</h3>
        <p>If you have any questions or feedback, please reach out to us!</p>
      </div>
    </div>
  </template>




<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: black;
}

.content-card {
  max-width: 800px; /* Ограничиваем ширину текста */
  padding: 20px;
  background: black;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left; /* Текст выровнен по левому краю */
  line-height: 1.6; /* Улучшаем читаемость */
}
.vite-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px; /* Space below the logo */
}

.logo {
  width: 80px;
  height: auto;

}

h1 {
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin: 0 0 20px 0; /* Add space below the h1 */
  text-align: center;

}

h2 {
  font-size: 22px;
  color: white;
  margin-top: 20px;
  margin-bottom: 10px;
}

h3 {
  font-size: 18px;
  color: white;
  margin-top: 15px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: white;
  margin-bottom: 15px;
}

ul, ol {
  margin-left: 20px;
  padding-left: 20px;
  margin-bottom: 15px;
}

ul li, ol li {
  margin-bottom: 10px;
}

strong {
  color: #4f46e5;
}
</style>
<script setup >
import image from '@/assets/vite.svg';
</script>