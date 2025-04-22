<template>
  <div class="page-container">
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <span>
          <a-tag
            :color="record.status === '未处理' ? 'volcano' : 'green'"
          >
          {{ record.status }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <div style="width: 100px" class="btn-op">
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
  <FeedbackEditDialog
    v-model:visible="userInfoDialogVisible"
    :row="{ ...userInfo }"
    @success="getData(1)"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import FeedbackEditDialog from './feedbackEditDialog.vue'
import { getEventList, deleteEvent } from '@/api/event';
import { message as Message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
// 标题、内容、状态
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '回复内容',
    dataIndex: 'answer',
    key: 'answer',
  },
  {
    title: '状态', // 已处理、未处理
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '操作项',
    key: 'action',
  },
];

const data = ref([
  {
    "content": "string",
    "createdAt": "2025-04-22T01:56:21.571Z",
    "id": 0,
    "status": "已处理",
    "volunteerId": 0
  }
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
  await getEventList({ ...pagination })
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
}
</script>

<style lang="less" scoped>
.btn-op {
  :deep(.ant-btn) {
    padding: 4px 2px;
  }
}
</style>