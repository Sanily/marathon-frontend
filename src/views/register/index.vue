<template>
  <div class="register">
    <LoginLayout>
      <div class="register-container">
        <div class="register-container-type">
          <RegisterForm />
        </div>
        <div class="register-container-desc">
          已有账号?
          <span class="go-login" @click="goLogin">去登录</span>
        </div>
      </div>
    </LoginLayout>
  </div>
</template>

<script setup lang="ts">
import LoginLayout from '@/components/loginRegister/layout.vue'
import RegisterForm from './comp/RegisterForm.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goLogin = () => {
  router.replace('/login')
}
</script>

<style scoped lang="less">
.register {
  &-container {
    height: 100%;
    position: relative;
    &-type {
      padding-top: 100px;
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
      .go-login {
        color: #2d77e5;
        cursor: pointer;
      }
    }
  }
}
</style>
