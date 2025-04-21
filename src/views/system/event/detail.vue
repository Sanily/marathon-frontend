<template>
  <div class="page-container">
    <a-descriptions title="基本信息" layout="vertical" bordered>
      <a-descriptions-item label="赛事名称">Cloud Database</a-descriptions-item>
      <a-descriptions-item label="日期" :span="2">2019-04-24 18:00:00</a-descriptions-item>
      <a-descriptions-item label="起点">Cloud Database</a-descriptions-item>
      <a-descriptions-item label="终点" :span="2">2019-04-24 18:00:00</a-descriptions-item>
      <a-descriptions-item label="Status" :span="3">
        <a-badge status="processing" text="Running" />
      </a-descriptions-item>
    </a-descriptions>
  </div>
  <div class="page-container">
    <a-list item-layout="horizontal" :data-source="data">
      <template #header>
      <div class="header">赛事动态 <PlusOutlined style="cursor: pointer;" @click="handleAdd" /></div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getEventById } from '@/api/event';
import { useRoute } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'

onMounted(() => {
  getData()
})

const info = ref({})
const route = useRoute()
const getData = async () => {
  const { data } = await getEventById({ id: route.query.id })
  info.value = info
}

interface DataItem {
  title: string;
}
const data: DataItem[] = [
  {
    title: '时间1',
  },
  {
    title: '时间1',
  },
  {
    title: '时间1',
  },
  {
    title: '时间1',
  },
];

const userInfoDialogVisible = ref<boolean>(false)
const handleAdd = (row) => {
  userInfoDialogVisible.value = true
}

</script>

<style lang="less" scoped>
.page-container {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  .header {
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
  }
}
</style>