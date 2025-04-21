<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :items="menuList"
    @click="handleClick"
  ></a-menu>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { routes } from '@/router'

const route = useRoute()
const router = useRouter()
const handleClick: MenuProps['onClick'] = ({ key }) => {
  router.push(key)
}

const menuList = computed(() => {
  return routes
    .filter(route => route.path.includes('/system') && !route.path.includes('/detail'))
    .map(route => ({
      key: route.path,
      label: route.meta.title,
      title: route.meta.title
    }))
})

const openKeys = computed<string[]>(() => {
  return menuList.value.map((menu) => menu.code)
})
const selectedKeys = computed(() => {
  const key = route.path.split('/').splice(0, 3).join('/')
  return [key]
})
</script>

<style lang="less" scoped>
:deep(.ant-menu) {
  height: 100% !important;
}

.ant-menu-root {
  width: 180px !important;
  height: 100% !important;

  :deep(.ant-menu-sub) {
    background: rgba(255, 255, 255, 0);
  }
  :deep(.ant-menu-item) {
    margin-top: 0 !important;
  }

  :deep(.ant-menu-submenu-title) {
    padding-left: 20px !important;
    color: #232a35;

    &:hover {
      color: #2d77e5;
    }
  }

  :deep(.ant-menu-item) {
    padding-left: 20px !important;
    color: #232a35;
    text-indent: 8px;

    &.ant-menu-item-selected {
      background: #eff5ff;
      color: #2d77e5;
    }

    &:hover {
      color: #2d77e5;
    }
  }

  .submenu-title {
    text-indent: 8px;
    display: flex;
    align-items: center;
    .text {
      flex: 1;
    }
  }
}
</style>
