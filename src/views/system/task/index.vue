<template>
  <div class="page-container">
  <a-table :columns="columns" :data-source="data">
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
        <div style="width: 200px" class="btn-op">
          <a-button type="link">发布</a-button>
          <a-divider type="vertical" />
          <a-button type="link">分配</a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="handleEdit(record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定删除?"
            ok-text="是"
            cancel-text="否"
            @confirm="(e) => confirm(e, record)"
          >
            <a-button danger type="text" @click="handleDelete(record)">删除</a-button>
          </a-popconfirm>
        </div>
      </template>
    </template>
  </a-table>
  </div>
  <TaskEditDialog
    v-model:visible="userInfoDialogVisible"
    :row="{ ...userInfo }"
    @success="getData(1)"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import TaskEditDialog from './taskEditDialog.vue'
import { getTaskList, deleteTask } from '@/api/task';
import { message as Message } from 'ant-design-vue'
// {
//   "category": "string",
//   "confirmedNumber": 0,
//   "createdAt": "2025-04-21T11:47:57.845Z",
//   "createdBy": 0,
//   "description": "string",
//   "endTime": "2025-04-21T11:47:57.845Z",
//   "id": 0,
//   "location": "string",
//   "name": "string",
//   "requiredNumber": 0,
//   "startTime": "2025-04-21T11:47:57.845Z"
// }
// 任务名称、描述、时间、地点和所需人数
const columns = [
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '类别',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '地点',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: '所需人数',
    dataIndex: 'requiredNumber',
    key: 'requiredNumber',
  },
  {
    title: '确认人数',
    dataIndex: 'confirmedNumber',
    key: 'confirmedNumber',
  },
  {
    title: '状态', // 未发布、未分配、未开始、进行中、已完成
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data = ref([
  {
    "category": "string",
    "confirmedNumber": 0,
    "createdAt": "2025-04-21T11:47:57.845Z",
    "createdBy": 0,
    "description": "string",
    "endTime": "2025-04-21T11:47:57.845Z",
    "id": 0,
    "location": "string",
    "name": "string",
    "requiredNumber": 0,
    "startTime": "2025-04-21T11:47:57.845Z"
  },
]);

onMounted(() => {
  getData()
})

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

const getData = async (current = 1) => {
  pagination.value.current = current
  await getTaskList({ ...pagination })
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
  await deleteTask(row)
  Message.success('删除成功');
}
</script>

<style lang="less" scoped>
.btn-op {
  :deep(.ant-btn) {
    padding: 4px 2px;
  }
}
</style>