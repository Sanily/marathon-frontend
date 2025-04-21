<template>
  <a-layout-header class="fixed-header">
    <div class="title">
      <span>{{ header.title }}</span>
    </div>
    <div class="menu">
      <FixedMenu></FixedMenu>
    </div>
    <div class="operate">
      <FixedOperate></FixedOperate>
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import FixedOperate from '../FixedOperate/index.vue'
import FixedMenu from '../FixedMenu/index.vue'

const header = ref({
  title: '马拉松志愿者系统',
})

</script>

<style lang="less" scoped>
.fixed-header {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 48px;
  z-index: 999;
  background: white !important;
  backdrop-filter: blur(6px);
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    font-size: 20px;
    cursor: pointer;
    img {
      height: 22px;
    }
    span {
      height: 22px;
      line-height: 24px;
    }
  }
  .login-btn {
    cursor: pointer;
    border: 1px solid #2d77e5;
    color: #2d77e5;
    border-radius: 4px;
    padding: 5px 16px 5px 16px;
    margin-left: 12px;
  }
  .white-title {
    color: #fff;
  }
  .white_btn {
    border: 1px solid #fff;
    color: #fff;
  }
  .menu {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin: 0 10px 0 48px;
    height: 100%;
  }
}
</style>
