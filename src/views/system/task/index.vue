<template>
  <div class="page-container">
  <a-table :columns="columns" :data-source="data">
    <template #title>
      <a-button v-if="role === 'ADMIN'" type="primary" @click="handleEdit({})">新增</a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'time'">
        <span>
          {{ record.startTime }}至{{ record.endTime }}
        </span>
      </template>
      <template v-else-if="column.key === 'category'">
        <span>
          <a-tag
            color="green"
          >
          {{ record.category }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'status'">
        <span>
          <a-tag
            :color="record.status === '未分配' ? '#1677ff'
            : record.status === '未确认' ? 'geekblue' 
            : record.status === '已拒绝' ? 'red' 
            : 'green'"
          >
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <div v-if="role === 'ADMIN'" style="width: 200px" class="btn-op">
          <a-button type="link" @click="onAsign(record)">分配</a-button>
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
        <div v-if="role === 'VOLUNTEER'" style="width: 200px" class="btn-op">
          <a-button type="link" @click="onReceipt(record)">接受</a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定拒绝?"
            ok-text="是"
            cancel-text="否"
            @confirm="(e) => confirm1(e, record)"
          >
            <a-button danger type="text">拒绝</a-button>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a-button type="link" @click="onCompletion(record)">确认完成</a-button>
          
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
  <a-modal v-model:open="open" title="任务分配" @ok="handleAsign">
    <a-select
      v-model:value="asignList"
      mode="multiple"
      style="width: 100%"
      placeholder="分配给谁"
      :options="users"
      :fieldNames="{ label: 'realName', value: 'id' }"
    ></a-select>
  </a-modal>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import TaskEditDialog from './taskEditDialog.vue'
import { getTaskList, deleteTask, assignTask } from '@/api/task';
import { getVolunteerTaskList, receiptVolunteerTask, completionVolunteerTask } from '@/api/volunteer-task';
import { getUserList } from '@/api/user';
import { message as Message } from 'ant-design-vue'

// confirmed
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
    title: '状态', // 未分配，0待确认，1.已接受，2已拒绝
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作项',
    key: 'action',
  },
];

const data = ref([]);
const users = ref([])

const role = ref('')
onMounted(async () => {
  role.value = localStorage.getItem('global_role')
  getData()
  const { records } = await getUserList({ pageSize: 1000 })
  users.value = records || []
})

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

const getData = async (pageNum = 1) => {
  pagination.value.current = pageNum
  const fn = role.value === 'ADMIN' ? getTaskList : getVolunteerTaskList
  const { records, total, current } = await fn({ ...pagination })
  pagination.value.current = current
  pagination.value.total = total
  data.value = records || []
}

const open = ref(false)
const onAsign = (row) => {
  open.value = true
  userInfo.value = { ...row }
}
const asignList = ref([])
const handleAsign = async () => {
  open.value = false
  await assignTask({
    taskId: userInfo.value.id,
    volunteerId: asignList.value
  })
  Message.success('分配成功');
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
  getData(1)
}

const confirm1 = async (e: MouseEvent, row) => {
  await receiptVolunteerTask({
    taskId: row.id,
    receipt: 2
  })
  Message.success('操作成功');
};
const onReceipt = async (row) => {
  await receiptVolunteerTask({
    taskId: row.id,
    receipt: 1
  })
  Message.success('操作成功');
}
const onCompletion = async (row) => {
  await completionVolunteerTask({
    taskId: row.id,
  })
  Message.success('操作成功');
}
</script>

<style lang="less" scoped>
.btn-op {
  :deep(.ant-btn) {
    padding: 4px 2px;
  }
}
</style>