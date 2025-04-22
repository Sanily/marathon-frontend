<template>
  <div class="page-container">
  <a-table :columns="columns" :data-source="data">
    <template #title>
      <a-button type="primary" @click="handleEdit({})">新增</a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'content'">
        <TextOverflow :text="record.content || '--'" />
      </template>
      <template v-if="column.key === 'replyContent'">
        <TextOverflow :text="record.replyContent || '--'" />
      </template>
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
        <div v-if="role === 'ADMIN'" style="width: 80px" class="btn-op">
          <a-button type="link" @click="handleReply(record)">处理</a-button>
        </div>
        <div v-if="role === 'VOLUNTEER'" style="width: 100px" class="btn-op">
          <a-button type="link" @click="handleEdit(record)" :disabled="record.replyContent">编辑</a-button>
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
  <FeedbackEditDialog
    v-model:visible="userInfoDialogVisible"
    :row="{ ...userInfo }"
    @success="getData(1)"
  />
  <FeedbackReplyDialog
    v-model:visible="replyDialogVisible"
    :row="{ ...userInfo }"
    @success="getData(1)"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import FeedbackEditDialog from './feedbackEditDialog.vue'
import FeedbackReplyDialog from './feedbackReplyDialog.vue'
import { getFeedbackList, deleteFeedback } from '@/api/Feedback';
import TextOverflow from '@/components/contents/textOverflow.vue'
import { message as Message } from 'ant-design-vue'
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
    dataIndex: 'replyContent',
    key: 'replyContent',
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

const data = ref([]);
const role = ref('')
onMounted(() => {
  role.value = localStorage.getItem('global_role')
  getData()
})

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

const getData = async (pageNum = 1) => {
  pagination.value.current = pageNum
  const { records, total, current } = await getFeedbackList({ ...pagination })
  pagination.value.current = current
  pagination.value.total = total
  data.value = records
}

const userInfo = ref<any>({})
const userInfoDialogVisible = ref<boolean>(false)
const replyDialogVisible = ref<boolean>(false)
const handleReply = (row) => {
  userInfo.value = { ...row }
  replyDialogVisible.value = true
}

const handleEdit = (row) => {
  userInfo.value = { ...row }
  userInfoDialogVisible.value = true
}

const confirm = (e: MouseEvent, row) => {
  handleDelete(row)
};

const handleDelete = async (row) => {
  await deleteFeedback(row)
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