<template>
  <div class="login">
    <LoginLayout>
      <div class="login-container">
        <div class="login-container-title">
          <div class="title">
            欢迎登录马拉松志愿者系统
          </div>
        </div>
        <div class="login-container-divider"></div>
        <div class="login-container-tabs">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane
              key="account"
              tab="账号登录"
            ></a-tab-pane>
            <a-tab-pane
              key="mobile"
              tab="手机号登录"
              disabled
            ></a-tab-pane>
            <a-tab-pane
              key="wechat"
              tab="微信扫码"
              disabled
            ></a-tab-pane>
            <a-tab-pane
              key="ding"
              tab="钉钉扫码 (内部)"
              disabled
            ></a-tab-pane>
          </a-tabs>
        </div>
        <div class="login-container-type">
          <AccountLogin v-if="activeKey === 'account'" />
        </div>
      </div>
    </LoginLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginLayout from '@/components/loginRegister/layout.vue'
import AccountLogin from './comp/AccountLogin.vue'

const activeKey = ref<string>('account')
</script>

<style scoped lang="less">
.login {
  height: 100%;
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0 auto;
    &-title {
      padding-top: 100px;
      .title {
        color: #13161b;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
      }
      .desc {
        color: #97a3b7;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
      }
    }
    &-divider {
      margin-top: 58px;
      border-bottom: 2px solid #f5f5f5;
    }
    &-tabs {
      margin-top: 40px;

      :deep(.ant-tabs-nav) {
        .ant-tabs-nav-operations {
          display: none !important;
        }
      }
      :deep(.ant-tabs-nav-list) {
        width: 100%;
        display: flex;
      }
      :deep(.ant-tabs-tab) {
        flex: 1;
        justify-content: center;
        padding: 0 0 12px 0;
      }
      :deep(.ant-tabs-tab-btn) {
        color: #232a35;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
      }
      :deep(.ant-tabs-tab-disabled) {
        .ant-tabs-tab-btn {
          color: #97a3b7;
          font-size: 14px;
        }
      }
    }
    &-desc {
      width: 100%;
      color: #97a3b7;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      text-align: center;
      position: absolute;
      bottom: 0px;
    }
  }
}
</style>
