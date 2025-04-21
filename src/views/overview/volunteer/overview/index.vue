<template>
  <div class="grid-layout">
    <a-card class="line-card" title="每月任务参与 & 完成情况">
      <div ref="lineChart" class="chart-container"></div>
    </a-card>

    <a-card class="pie-card" title="总任务 & 完成分布">
      <div ref="pieChart" class="chart-container"></div>
    </a-card>

    <a-card class="carousel-card" title="赛事动态轮播">
      <a-carousel autoplay>
        <div v-for="item in carouselData" :key="item.id" class="carousel-item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </a-carousel>
    </a-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

// 示例数据，替换为实际接口调用
const carouselData = ref([
  { id: 1, title: '赛事A 报名开始', description: '2025-04-20 赛事A报名已开放' },
  { id: 2, title: '赛事B 成绩公布', description: '2025-04-18 赛事B成绩已公布，请查看详情' },
  { id: 3, title: '赛事C 完赛', description: '2025-04-15 赛事C圆满结束，感谢参与' }
]);

const lineData = ref({
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  participated: [5, 8, 12, 10, 7, 9, 11, 6, 13, 8, 10, 14],
  completed:   [4, 7, 11, 9, 6, 8, 10, 5, 12, 7, 9, 13]
});

const totalStats = ref({ participated: 120, completed: 110 });

const lineChart = ref(null);
const pieChart = ref(null);

onMounted(() => {
  // 折线图
  const lineChartInstance = echarts.init(lineChart.value);
  lineChartInstance.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['参与次数', '完成次数'] },
    xAxis: { type: 'category', data: lineData.value.months },
    yAxis: { type: 'value' },
    series: [
      { name: '参与次数', type: 'line', data: lineData.value.participated },
      { name: '完成次数', type: 'line', data: lineData.value.completed }
    ]
  });

  // 饼图
  const pieChartInstance = echarts.init(pieChart.value);
  pieChartInstance.setOption({
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: '任务分布',
        type: 'pie',
        radius: '60%',
        data: [
          { name: '参与次数', value: totalStats.value.participated },
          { name: '完成次数', value: totalStats.value.completed }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
});
</script>

<style scoped>
.grid-layout {
  padding: 80px 20px 20px 20px;
  height: 100vh;
  box-sizing: border-box;
  display: grid;
  grid-template-areas:
    "line pie"
    "carousel carousel";
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
}
.carousel-card { grid-area: carousel; }
.line-card { grid-area: line; }
.pie-card  { grid-area: pie; }
.chart-container { width: 100%; height: 300px; }
.carousel-item { text-align: center; padding: 16px; }
</style>
