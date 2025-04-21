<template>
  <div class="login-layout">
    <div class="login-layout-left">
      <img
        id="login-video"
        :src="platform?.background || loginBg"
        preload="auto"
        autoplay="autoplay"
        loop="loop"
        muted="muted"
        style="width: 100%; height: 100vh; object-fit: cover"
      />
      <div class="login-layout-left-copyright">
        {{ platform?.copyright }}
      </div>
    </div>
    <div class="login-layout-container-wrap">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import loginBg from '@/assets/images/bg-login.jpeg'

const platform = ref({
  background: '',
  copyright: '',
})

onMounted(() => {
  const settings = JSON.parse(localStorage.getItem('global_settings') || '{}')
  platform.value = settings.platform
})
</script>

<style lang="less" scoped>
.login-layout {
  width: 100%;
  height: 100%;
  display: flex;
  &-left {
    width: 60%;
    height: 100vh;
    position: relative;

    overflow: hidden;
    .bg {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &-copyright {
      position: absolute;
      width: 100%;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 28px;
      bottom: 32px;
    }
  }
  &-container-wrap {
    flex: 1;
    min-width: 760px;
    padding: 40px 80px;
    background: #fff;
  }
}
</style>
