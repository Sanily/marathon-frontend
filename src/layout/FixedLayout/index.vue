<template>
  <a-layout :class="['layout', { 'default-header': showDefault }]">
    <FixedHeader></FixedHeader>
    <div :class="['main', { 'side-container': isSystem }]">
      <div v-if="isSystem" class="side-menu">
        <SideMenu></SideMenu>
      </div>
      <div
        :class="[
          'main-content',
          { default: showDefault },
        ]"
      >
        <slot></slot>
      </div>
    </div>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import FixedHeader from './FixedHeader/index.vue'
import { useRoute } from 'vue-router'
import SideMenu from '@/layout/SideMenu/index.vue'

const route = useRoute()

// 判断路由是否包含path
const routeHasPath = (path: string[]) => {
  return [...path, ...path.map((i) => `${i}/`)].includes(route.path)
}

const isSystem = computed(() => {
  const path = [
    '/personal',
    '/overview',
    '/system/event/detail'
  ]
  
  return (
    route.path.includes('/system/') ||
    !routeHasPath(path)
  )
})
const showDefault = computed(() => {
  const path = ['/personal', '/expect']
  return routeHasPath(path)
})
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.default-header {
  :deep(.fixed-header) {
    background: #fff !important;
  }
}
.layout {
  height: 100vh;
  width: 100vw;
  .side-container {
    display: flex;
    .side-menu {
      padding-top: 48px;
      height: 100vh;
    }
    .main-content {
      width: calc(100vw - 200px);
      height: 100vh;
      padding: 80px 0 0 20px;
      overflow-y: auto;
    }
  }
  .main {
    height: 100%;
    overflow-y: overlay;
    position: relative;
    flex: 1;
    .chat {
      padding: 65px 16px 16px 16px;
      background: url(@/assets/images/layout/bg.png) top center no-repeat !important;
      background-size: 100% 100% !important;
      height: 100%;
    }
    .market {
      background: url(@/assets/images/layout/bg-market.jpg) top center no-repeat !important;
      background-size: 100% 100% !important;
      min-height: 100%;
      :deep(.fixed-header) {
        border-bottom: 1px solid #fff !important;
      }
    }
    .agent {
      padding: 65px 16px 16px 16px;
      background: url(@/assets/images/layout/bg.png) top center no-repeat !important;
      background-size: 100% 100% !important;
      height: 100%;
      :deep(.fixed-header) {
        border-bottom: 1px solid #fff !important;
      }
    }
    .screen {
      padding: 65px 16px 16px 16px;
      background: url(@/assets/images/layout/bg-market.jpg) top center no-repeat !important;
      background-size: 100% 100% !important;
      height: 100%;
    }
    .cockpit {
      padding: 0 16px;
      height: 100%;
      background: url(@/assets/images/layout/bg-market.jpg) top center no-repeat !important;
      background-size: 100% 100% !important;
    }
    .default {
      padding: 65px 16px 16px 16px;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
