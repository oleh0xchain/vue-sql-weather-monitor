<template>
  <div class="chart-container">
    <h3>{{ title }}</h3>
    <div class="timeframe-buttons">
      <el-button
          v-for="(time, index) in timeframes"
          :key="index"
          @click="fetchAndSetChartData(time.value)"
          :type="timeframe === time.value ? 'primary' : 'default'"
      >
        {{ time.label }}
      </el-button>
    </div>
    <line-chart v-if="chartData.datasets.length" :chart-data="chartData" :chart-options="chartOptions" />
    <p v-else>Loading data...</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import LineChart from './LineChart.vue';

export default {
  components: {
    LineChart,
  },
  props: {
    title: String, // Название графика
    parameter: String, // 'temperature', 'humidity', etc.
    location: String,
  },
  setup(props) {
    const timeframes = [
      { label: '24 hours', value: '1day' },
      { label: '3 days', value: '3days' },
      { label: '7 days', value: '7days' },
    ];

    const timeframe = ref('1day'); // Начальное значение (последние 24 часа)
    const chartData = ref({
      labels: [],
      datasets: [],
    });

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    };

    // Функция для запроса данных с сервера
    const fetchAndSetChartData = async (selectedTimeframe) => {
      timeframe.value = selectedTimeframe;

      try {
        console.log('Location in the frontend:', props.location);
        const response = await fetch(
            `http://localhost:3000/weather/${props.location}?parameter=${props.parameter === 'lighting_level' ? 'illumination' : props.parameter}&timeRange=${selectedTimeframe}`
        );
        if (!response.ok) throw new Error('Failed to fetch chart data');

        const data = await response.json();

        // Если параметр 'lighting_level', преобразуем illumination в проценты
        const transformedData =
            props.parameter === 'lighting_level'
                ? data.map((entry) => ({
                  ...entry,
                  parameter_value: entry.parameter_value
                      ? Math.log(entry.parameter_value) * 0.9
                      : 0,
                }))
                : data;

        // Обновляем данные графика
        chartData.value = {
          labels: data.map((entry) =>
              new Date(entry.timestamp).toLocaleString('en-US', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                hour12: false, // Использовать 24-часовой формат
              })
          ), // Временные метки
          datasets: [
            {
              label: props.parameter,
              data: data.map((entry) => entry.parameter_value), // Значения параметра
              borderColor: '#42A5F5',
              backgroundColor: 'rgba(66, 165, 245, 0.2)',
              fill: true,
            },
          ],
        };

      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    // Загружаем данные при монтировании компонента
    fetchAndSetChartData(timeframe.value);

    return {
      timeframes,
      timeframe,
      chartData,
      chartOptions,
      fetchAndSetChartData,
    };
  },
};
</script>

<style scoped>
.chart-container {
  color: #1a1a1a;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.timeframe-buttons {
  color: #1a1a1a;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
</style>
