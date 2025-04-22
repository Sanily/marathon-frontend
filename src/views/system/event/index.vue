<template>
  <div class="page-container">
  <a-table :columns="columns" :data-source="data">
    <template #title>
      <a-button type="primary" @click="handleEdit({})">新增</a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'time'">
        <span>
          {{ record.startTime }}至{{ record.endTime }}
        </span>
      </template>
      <template v-else-if="column.key === 'status'">
        <span>
          <a-tag
            :color="record.status === 'loser' ? 'volcano' : record.status ? 'geekblue' : 'green'"
          >
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <div style="width: 150px" class="btn-op">
          <a-button type="link" @click="handleDetail(record)">详情</a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="handleEdit(record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定删除?"
            ok-text="是"
            cancel-text="否"
            @confirm="(e) => confirm(e, record)"
          >
            <a-button danger type="text">删除</a-button>
          </a-popconfirm>
        </div>
      </template>
    </template>
  </a-table>
  </div>
  <EventEditDialog
    v-model:visible="userInfoDialogVisible"
    :row="{ ...userInfo }"
    @success="getData(1)"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import EventEditDialog from './eventEditDialog.vue'
import { getEventList, deleteEvent } from '@/api/event';
import { message as Message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const columns = [
  {
    title: '赛事名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '日期',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '起点位置',
    dataIndex: 'startSite',
    key: 'startSite',
  },
  {
    title: '终点位置',
    dataIndex: 'endSite',
    key: 'endSite',
  },
  {
    title: '操作项',
    key: 'action',
  },
];

const data = ref([]);

onMounted(() => {
  getData()
})

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

const getData = async (pageNum = 1) => {
  pagination.value.current = pageNum
  const { records, total, current } = await getEventList({ ...pagination })
  pagination.value.current = current
  pagination.value.total = total
  data.value = records
}

const router = useRouter()
const handleDetail = (row) => {
  router.push('/system/event/detail?id=' + row.id)
}

const userInfo = ref<any>({})
const userInfoDialogVisible = ref<boolean>(false)
const handleEdit = (row) => {
  userInfo.value = { ...row }
  userInfoDialogVisible.value = true
}

const confirm = (e: MouseEvent, row) => {
  handleDelete(row)
};

const handleDelete = async (row) => {
  await deleteEvent(row)
  Message.success('删除成功');
  getData(1)
}
</script>

<style lang="less" scoped>
.btn-op {
  :deep(.ant-btn) {
    padding: 4px 2px;
  }
}
</style>