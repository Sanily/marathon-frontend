<template>
  <div class="page-container">
  <a-table :columns="columns" :data-source="data" :pagination="pagination">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'username'">
        <a>
          {{ record.name }}
        </a>
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
  <UserEditDialog
    v-model:visible="userInfoDialogVisible"
    :row="{ ...userInfo }"
    @success="getData(1)"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import UserEditDialog from './userEditDialog.vue'
import { getUserList, deleteUser } from '@/api/user';
import { message as Message } from 'ant-design-vue'

const columns = [
  {
    title: '账号',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    key: 'realName',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '操作项',
    key: 'action',
  },
];

const data = ref([
  {
    key: '1',
    realName: 'John Brown',
    username: 'John Brown',
    age: 32,
    gender: '男',
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
  await getUserList({ ...pagination })
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
  await deleteUser(row)
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