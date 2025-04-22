<template>
  <div class="page-container">
    <a-descriptions title="赛事信息" layout="vertical" bordered>
      <a-descriptions-item label="赛事名称">{{ info.name }}</a-descriptions-item>
      <a-descriptions-item label="日期" :span="2">{{ info.eventDate }}</a-descriptions-item>
      <a-descriptions-item label="起点位置">{{ info.startLocation }}</a-descriptions-item>
      <a-descriptions-item label="终点位置" :span="2">{{ info.endLocation }}</a-descriptions-item>
      <a-descriptions-item label="赛事路线图" :span="3">
        <img width="100%" src="@/assets/demo.webp" />
      </a-descriptions-item>
    </a-descriptions>
  </div>
  <div class="page-container">
    <a-list item-layout="horizontal" :data-source="news">
      <template #header>
        <div class="header">赛事动态 <PlusOutlined v-if="role === 'ADMIN'" style="cursor: pointer;" @click="handleAdd" /></div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta
            :description="item.content"
          >
            <template #title>
              <a>{{ item.createdAt }}</a>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
  <NewsEditDialog
    v-model:visible="userInfoDialogVisible"
    :row="{ ...userInfo }"
    @success="getData(1)"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getEventById } from '@/api/event';
import { getEventNewsList } from '@/api/event-news';
import { useRoute } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'
import NewsEditDialog from './newsEditDialog.vue'

const role = ref('')
onMounted(() => {
  role.value = localStorage.getItem('global_role')
  getData()
})

const info = ref({})
const news = ref([])
const route = useRoute()
const getData = async () => {
  info.value = await getEventById({ id: route.query.id })
  const { records } = await getEventNewsList({ eventId: route.query.id })
  news.value = records || []
  console.log(news.value)
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

const userInfo = ref<any>({})
const userInfoDialogVisible = ref<boolean>(false)
const handleAdd = () => {
  userInfo.value = {id: route.query.id}
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