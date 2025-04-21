<template>
  <div class="dashboard-grid">
    <a-card class="card bar-card" title="任务统计（参与次数 & 完成情况）Top10">
      <div ref="barChart" class="chart-container"></div>
    </a-card>
    <a-card class="card pie-card" title="人员完成率分布Top10">
      <div ref="pieChart" class="chart-container"></div>
    </a-card>
    <a-card class="card list-card" title="任务完成进度排名Top10">
      <a-list>
        <a-list-item v-for="item in sortedProgressList" :key="item.name" class='progress-item'>
          <span class="item-name">{{ item.name }}</span>
          <a-progress :percent="item.progress" />
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import * as echarts from 'echarts';

// 示例数据（可替换为实际接口调用）
const barData = ref({
  tasks: ['任务A', '任务B', '任务C', '任务D'],
  participated: [120, 98, 75, 63],
  completed: [110, 90, 60, 55]
});

const pieData = ref([
  { name: 'Alice', value: 85 },
  { name: 'Bob', value: 70 },
  { name: 'Charlie', value: 95 },
  { name: 'Diana', value: 60 }
]);

const progressList = ref([
  { name: '任务A', progress: 92 },
  { name: '任务B', progress: 89 },
  { name: '任务C', progress: 80 },
  { name: '任务D', progress: 75 }
]);

const sortedProgressList = computed(() => {
  return [...progressList.value].sort((a, b) => b.progress - a.progress);
});

const barChart = ref(null);
const pieChart = ref(null);

onMounted(() => {
  // 柱状图
  const barInstance = echarts.init(barChart.value);
  barInstance.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['参与次数', '完成次数'] },
    xAxis: { type: 'category', data: barData.value.tasks },
    yAxis: { type: 'value' },
    series: [
      { name: '参与次数', type: 'bar', data: barData.value.participated },
      { name: '完成次数', type: 'bar', data: barData.value.completed }
    ]
  });

  // 饼图
  const pieInstance = echarts.init(pieChart.value);
  pieInstance.setOption({
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: '完成率',
        type: 'pie',
        radius: '60%',
        data: pieData.value,
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
.dashboard-grid {
  padding: 80px 20px 20px 20px;
  height: 100vh;
  box-sizing: border-box;
  display: grid;
  grid-template-areas:
    "bar pie"
    "list list";
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
}
.bar-card { grid-area: bar; }
.pie-card { grid-area: pie; }
.list-card { grid-area: list; }
.chart-container {
  width: 100%;
  height: 300px;
}
.progress-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.item-name {
  flex: 1;
  margin-right: 16px;
}
</style>
