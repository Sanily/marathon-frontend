<template>
  <a-config-provider :locale="locale" :autoInsertSpaceInButton="false">
      <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'
import dayjs from 'dayjs'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh_cn')
export default defineComponent({
  name: 'App',
  setup() {
    return {
      locale: zhCN,
    }
  },
})
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
