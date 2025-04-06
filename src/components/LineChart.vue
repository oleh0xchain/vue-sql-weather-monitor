<template>
    <div>
      <canvas ref="canvas" />
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref, watch } from 'vue';
  import { Chart } from 'chart.js/auto';
  
  export default defineComponent({
    props: {
      chartData: { type: Object, required: true },
      chartOptions: { type: Object, required: true },
    },
    setup(props) {
      const canvas = ref(null);
      let chart = null;
  
      const renderChart = () => {
        if (chart) chart.destroy();
        chart = new Chart(canvas.value, {
          type: 'line',
          data: props.chartData,
          options: props.chartOptions,
        });
      };
  
      onMounted(renderChart);
      watch(() => props.chartData, renderChart, { deep: true });
  
      return { canvas };
    },
  });
  </script>
  
  <style scoped>
  canvas {
    color: #1a1a1a;
    width: 100%;
    height: 400px;
  }
  </style>
  