<template>
  <div class="chart-container w-100">
    <div ref="chartRef" class="chart" />
  </div>
</template>
<script setup>
  import * as echarts from 'echarts';
  import { onMounted, ref, watch, nextTick } from 'vue';

  const props = defineProps({
    labels: { type: Array, required: true },
    values: { type: Array, required: true },
  });

  const chartRef = ref(null);
  let chartInstance = null;

  const renderChart = () => {
    if (!chartRef.value) return;
    if (!chartInstance) {
      chartInstance = echarts.init(chartRef.value);
    }

    chartInstance.setOption({
      grid: {
        top: 15,
        left: 0,
        right: 0,
        bottom: 30,
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        data: props.labels.map((v) => v.toString()),
        axisLabel: {
          formatter: function (value) {
            return ['1', '10', '20', '30'].includes(value) ? value : '';
          },
          color: '#666D80',
          opacity: 0.5,
          fontSize: 12,
          fontWeight: 400,
          margin: 7,
          interval: 0,
        },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        show: false,
        min: (val) => val.min - 3000000,
        max: (val) => val.max + 2000000,
      },
      tooltip: {
        trigger: 'axis',
        confine: true,
        position: function (point) {
          return [point[0] - 60, point[1] + 13];
        },
        backgroundColor: 'rgba(13, 13, 18, 0.50)',
        borderRadius: 12,
        padding: 12,
        borderWidth: 0,
        className: 'custom-tooltip',
        textStyle: {
          color: '#F8FAFB',
          fontSize: 12,
          fontFamily: 'Vazirmatn',
          textAlign: 'center',
        },
        formatter: function (params) {
          const day = params[0].axisValue;
          const value = params[0].data.toLocaleString('fa-IR');
          return `${day} شهریور ماه<br/><b>${value}</b> ریال`;
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#aaa',
            type: 'dashed',
          },
        },
      },
      series: [
        {
          type: 'line',
          data: props.values,
          smooth: 0.3,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 8,
          animationDuration: 1000,
          animationEasing: 'cubicOut',
          emphasis: {
            focus: 'series',
            scale: true,
            itemStyle: {
              color: '#0171FF',
              borderColor: '#fff',
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(0,0,0,0.2)',
            },
          },
          lineStyle: {
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#0171FF' },
              { offset: 1, color: '#40C4AA' },
            ]),
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(1, 113, 255, 0.15)' },
              { offset: 1, color: 'rgba(1, 113, 255, 0.02)' },
            ]),
          },
        },
      ],
      legend: { show: false },
    });

    chartInstance.resize();
  };

  onMounted(() => nextTick(renderChart));
  watch([() => props.labels, () => props.values], renderChart, { deep: true });
</script>
<style scoped>
  .chart-container {
    height: 230px;
  }

  .chart {
    width: 100%;
    height: 100%;
  }
</style>
<style>
  .chart-container .custom-tooltip {
    font-family: Vazirmatn !important;
    text-align: center !important;
    backdrop-filter: blur(5px);
  }
</style>
