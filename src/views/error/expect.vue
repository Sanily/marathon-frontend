<template>
  <div class="result">
    <a-result status="404" title="即将上线,敬请期待!" sub-title="">
      <template #extra>
        <a-button type="primary" @click="goFirstRoute">返回首页</a-button>
        <a-button type="primary" @click="goBack">返回上一页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goFirstRoute = () => {
  router.replace('/login')
}

const goBack = () => {
  router.go(-1)
}
</script>
<style lang="less" scoped>
.result {
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
