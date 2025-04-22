<template>
  <div :class="['layout-menu']">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      @click="handleClick"
      mode="horizontal"
      :items="menuList"
    ></a-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MenuListRes } from '@/api/auth'
import type { MenuProps } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()

const selectedKeys = ref<(string | number)[]>([])
const role = computed(() => {
  return localStorage.getItem('global_role')
})
const menuList = ref<MenuListRes[]>([
  {
    key: '/statistics',
    label: '数据总览',
    title: '数据总览',
  },
  {
    key: role.value === 'ADMIN' ? '/system/user' : '/system/task',
    label: '系统管理',
    title: '系统管理',
  }
])
const openKeys = ref<(string | number)[]>([])

const handleClick: MenuProps['onClick'] = ({ key }) => {
  router.push(key)
}

onMounted(async () => {
  route.matched.forEach((item) => {
    selectedKeys.value = [item.path, item.meta?.parentId as string]
    const paths = item.path.split('/')
    let pathStr = ''
    paths.forEach((i) => {
      if (i) {
        pathStr += `/${i}`
        openKeys.value.push(pathStr)
      }
    })
  })
})

watch(
  () => route,
  () => {
    if (route.path === '/personal') {
      openKeys.value = []
      selectedKeys.value = []
    } else {
      openKeys.value = []
      selectedKeys.value = [route.path, route.meta?.parentId as string]
    }
  },
  { deep: true }
)

</script>

<style lang="less" scoped>
.whiteMenu {
  :deep(.ant-menu-item-selected::after) {
    background: linear-gradient(to right, #ffffff, #61b0ff) !important;
  }
  :deep(.ant-menu-submenu-selected::after) {
    background: linear-gradient(to right, #ffffff, #61b0ff) !important;
  }
  .ant-menu-title-content {
    color: #fff !important;
  }
  :deep(.ant-menu-title-content) {
    color: #fff !important;
  }
}
:deep(.ant-menu-item-selected::after) {
  position: absolute !important;
  bottom: 3px !important;
  left: 50% !important;
  border: none;
  width: 16px;
  height: 4px;
  background: #1c79f4;
  border-radius: 5px;
  transform: translateX(-8px);
}
:deep(.ant-menu-submenu-selected::after) {
  position: absolute !important;
  bottom: 3px !important;
  left: 50% !important;
  border: none !important;
  width: 16px;
  height: 4px;
  background: #1c79f4;
  border-radius: 5px;
  transform: translateX(-8px);
}
:deep(.ant-menu-submenu::after) {
  border: none !important;
}
.layout-menu {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  :deep(.ant-menu) {
    height: 100%;
    background: rgba(255, 255, 255, 0);
    border: none;
    box-shadow: none;
  }
  :deep(.ant-menu-submenu-title) {
    height: 100%;
    display: flex;
    align-items: center;
  }
  :deep(.ant-menu-item-selected) {
    position: relative !important;
    .ant-menu-title-content {
      font-family: PingFang SC;
      font-weight: 600;
      color: #2d77e5;
    }
  }
  :deep(.ant-menu-title-content) {
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #13161b;
    height: 100%;
    display: flex;
    align-items: center;
  }
  :deep(.ant-menu-submenu-selected) {
    .ant-menu-submenu-title {
      .ant-menu-title-content {
        font-family: PingFang SC;
        font-weight: 600;
        color: #2d77e5;
      }
    }
  }
  :deep(.ant-menu-item:hover::after) {
    border: none !important;
  }
  :deep(.ant-menu-submenu:hover::after) {
    border: none !important;
  }
  :deep(.ant-menu-submenu-active) {
    border: none !important;
  }
  :deep(.ant-menu-item) {
    display: flex;
    align-items: center;
  }
  :deep(.ant-menu-submenu) {
    display: flex;
    align-items: center;
  }
  :deep(
      .ant-menu-horizontal > .ant-menu-item::after,
      .ant-menu-horizontal > .ant-menu-submenu::after,
      .ant-menu-horizontal > .ant-menu-item::before,
      .ant-menu-horizontal > .ant-menu-submenu::before,

    ) {
    border: none !important;
  }
}
</style>
