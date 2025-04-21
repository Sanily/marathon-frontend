<template>
  <a-config-provider :locale="zhCN" :autoInsertSpaceInButton="false">
    <template v-if="isFullLayout">
      <router-view></router-view>
    </template>
    <FixedLayout v-else>
      <router-view></router-view>
    </FixedLayout>
  </a-config-provider>
</template>

<script setup lang="ts">
import {
  computed,
} from 'vue'
import dayjs from 'dayjs'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import FixedLayout from '@/layout/FixedLayout/index.vue'
import 'dayjs/locale/zh-cn'
import { useRoute } from 'vue-router'

const route = useRoute()

const paths = ['/login', '/register']
const isFullLayout = computed(() => paths.includes(route.path))

dayjs.locale('zh_cn')
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
}
html {
  overflow-y: hidden;
}
.ant-spin-nested-loading,
.ant-spin-container {
  width: 100%;
  height: 100%;
}
.ant-spin {
  max-height: unset !important;
}
.full {
  width: 100%;
  overflow-y: overlay;
  min-height: 100vh;
}
</style>
