<template>
  <div class="account-form">
    <div class="step-title">注册-用户信息</div>
    <a-form
      ref="accountFormRef"
      :model="accountForm"
      name="basic"
      autocomplete="off"
    >
      <a-form-item label="" name="name" :rules="rules.account">
        <div class="label">昵称</div>
        <a-input
          v-model:value="userForm.account"
          placeholder="请输入账号名"
          :maxlength="20"
          show-count
          allowClear
          size="large"
        />
      </a-form-item>
      <a-form-item label="" name="mobile" :rules="rules.mobile">
        <div class="label">手机号码</div>
        <a-input
          v-model:value="accountForm.mobile"
          placeholder="请输入手机号码"
          :maxlength="11"
          size="large"
          show-count
          allowClear
        />
      </a-form-item>
      <a-form-item label="" name="captcha" :rules="rules.captcha">
        <div class="label">手机验证码</div>
        <a-input-search
          v-model:value="accountForm.captcha"
          placeholder="请输入手机验证码"
          size="large"
        >
          <template #enterButton>
            <a-button v-if="!codeTime" :disabled="phoneDisabled" @click="getSms"
              >获取验证码</a-button
            >
            <a-button v-else disabled>{{ codeTime }}s后重试</a-button>
          </template>
        </a-input-search>
      </a-form-item>
      <a-form-item label="" name="password" :rules="rules.password">
        <div class="label">
          密码<span class="desc"
            >必须包含大小写字母、特殊符号、数字，限制8-20个字符</span
          >
        </div>
        <a-input-password
          v-model:value="accountForm.password"
          placeholder="请输入密码"
          size="large"
          allowClear
        />
      </a-form-item>
      <a-form-item label="" name="checkPassword" :rules="rules.checkPassword">
        <div class="label">再次输入密码</div>
        <a-input-password
          v-model:value="accountForm.checkPassword"
          placeholder="请再次输入密码"
          size="large"
          allowClear
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message as Message } from 'ant-design-vue'
import useRegister from '../hooks/useRegister'
import _regexp from '@/utils/_regexp'
const { phoneDisabled, codeTime } = useRegister()
const accountForm = ref<any>({
  account: '',
  mobile: '',
  captcha: '',
  password: '',
  checkPassword: '',
})
const accountFormRef = ref<any>(null)
const emit = defineEmits<{
  (e: 'success', formData: any): void
}>()
const loginPassWordReg =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_\\\\[\]/~!@#$%^&*()=+《》？【】‘’|！（）：；“”，。、·±×「」『』〖〗÷→←√{}￥…—:<>;,.?——-])[0-9a-zA-Z_\\\\[\]/~!@#$%^&*()=+《》？【】‘’|！（）：；“”，。、·±×「」『』〖〗÷→←√{}￥…—:<br>;,.?——-]{8,20}$/ // 包含大小写字母和数字、特殊字符，长度在8-20之间
// 校验密码
const validatePassword = (rule, value) => {
  if (!value) return Promise.resolve()
  if (!loginPassWordReg.test(value))
    return Promise.reject('密码须包含大小写字母、特殊符号、数字，8-20个字符')
  if (accountForm.value.checkPassword) {
    accountFormRef.value.validateFields(['checkPassword'])
    return Promise.resolve()
  }
  return Promise.resolve()
}
// 再次确认密码
const validateConfirmPassword = (rule, value) => {
  if (!value) return Promise.resolve()
  if (accountForm.value.password !== value) {
    return Promise.reject('两次密码输入不一致')
  }
  return Promise.resolve()
}
const rules = ref({
  account: [
    { required: true, message: '请输入姓名' },
    {
      pattern: _regexp.accountReg,
      message: '账号允许中英文、数字、下划线，长度5-20个字符',
    },
  ],
  mobile: [
    { required: true, message: '请输入手机号码' },
    { pattern: _regexp.mobile, message: '手机号码格式异常' },
  ],
  captcha: [
    { required: true, message: '请输入手机验证码' },
    { pattern: _regexp.number, message: '手机验证码异常' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    {
      validator: validatePassword,
      trigger: 'change',
    },
  ],
  checkPassword: [
    { required: true, message: '请再次输入密码' },
    {
      validator: validateConfirmPassword,
      trigger: 'change',
    },
  ],
})

const getSms = () => {
  Message.success('验证码是：123456')
}
const validateForm = () => {
  accountFormRef.value
    .validate()
    .then(() => {
      emit('success', { ...accountForm.value })
    })
    .catch(() => {})
}
defineExpose({
  validateForm,
})
</script>

<style scoped lang="less">
.account-form {
  .step-title {
    color: #13161b;
    font-size: 24px;
    margin: 35px 0 40px 0;
  }
  .label {
    color: #13161b;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 6px;
    .desc {
      color: var(--Gray-Gray3, #97a3b7);
      font-size: 12px;
      font-weight: 400;
      margin-left: 6px;
    }
  }
  :deep(.ant-input-search-button) {
    background: #fff;
    span {
      color: #2d77e5;
    }
  }
  :deep(.ant-input-search) {
    .ant-input {
      height: 40px;
    }
  }
}
</style>
