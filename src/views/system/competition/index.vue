<template>
  <div class="page-container">
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-button type="link">详情</a-button>
          <a-divider type="vertical" />
          <a-button type="link">发布</a-button>
          <a-divider type="vertical" />
          <a-button type="link">分配</a-button>
          <a-divider type="vertical" />
          <a-button danger type="text">删除</a-button>
        </span>
      </template>
    </template>
  </a-table>
  </div>
</template>
<script lang="ts" setup>
// 任务名称、描述、时间、地点和所需人数
const columns = [
  {
    name: '任务名称',
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
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '地点',
    dataIndex: 'site',
    key: 'site',
  },
  {
    title: '所需人数',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    gender: '男',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    gender: '男',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    gender: '男',
    tags: ['cool', 'teacher'],
  },
];
</script>

