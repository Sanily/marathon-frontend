<template>
  <div class="register-form">
    <div class="register-form-steps">
      <span class="step-item" :class="{ 'is-active': regitStep >= 1 }"></span>
      <span class="step-item" :class="{ 'is-active': regitStep >= 2 }"></span>
      <!-- <span class="step-item" :class="{ 'is-active': regitStep >= 3 }"></span> -->
    </div>
    <div class="register-form-content">
      <div v-show="regitStep === 1">
        <UserForm ref="userFormRef" @success="validateSuccess" />
      </div>
      <div v-show="regitStep === 2">
        <AccountForm ref="accountFormRef" @success="successValidateLast" />
      </div>
      <div class="btn-list">
        <a-button
          v-show="regitStep === 2"
          class="previous-btn com-btn"
          size="large"
          @click="handlePrevious"
          >上一步</a-button
        >
        <a-button
          v-show="regitStep === 1"
          class="next-btn com-btn"
          type="primary"
          size="large"
          @click="handleNext"
          >下一步</a-button
        >
        <a-button
          v-show="regitStep >= 2"
          class="submit-btn com-btn"
          type="primary"
          size="large"
          @click="handleSubmit"
          >确定注册</a-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import useRegister from '../hooks/useRegister'
import AccountForm from './AccountForm.vue'
import UserForm from './UserForm.vue'
const { handleRegister } = useRegister()
const props = defineProps({
  invitationObj: {
    type: Object,
    default: () => {},
  },
})

const invitationVal = ref<string>('')
const regitStep = ref<number>(1) // 注册步骤
const accountFormRef = ref<any>(null)
const userFormRef = ref<any>(null)
const formData = ref<any>({})
const handleNext = () => {
  // 先校验当前表单是否通过校验，然后进入下一步
  userFormRef.value.validateForm()
}
const handlePrevious = () => {
  regitStep.value = 1
}
const validateSuccess = (val: any) => {
  formData.value = { ...formData.value, ...val }
  regitStep.value++
}
// 最后一次验证成功,成功后提交注册
const successValidateLast = (val: any) => {
  formData.value = {
    invitation: invitationVal.value,
    ...formData.value,
    ...val,
  }
  handleRegister(formData.value)
}
// 点击提交注册 -- 先校验密码是否填写正确
const handleSubmit = () => {
  accountFormRef.value.validateForm()
}
watch(
  () => props.invitationObj,
  (val: any) => {
    invitationVal.value = val?.invitation || ''
    nextTick(() => {
      accountFormRef.value?.getHash(val.hash)
    })
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.register-form {
  &-steps {
    width: 100px;
    position: relative;
    height: 24px;
    .step-item {
      display: inline-block;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #fff;
      border: 3px solid #277be1;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      &:nth-child(1) {
        left: 0;
      }
      &:nth-child(2) {
        right: 0;
      }
      // &:nth-child(3) {
      //   right: 0;
      // }
      &.is-active::before {
        content: '';
        width: 12px;
        height: 12px;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #277be1;
        border-radius: 50%;
      }
    }
    &::before {
      content: '';
      left: 3px;
      right: 3px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      height: 4px;
      background: #dbd7f3;
    }
  }
  .btn-list {
    margin-top: 32px;
    .com-btn {
      width: 126px;
      border-radius: 6px;
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
    .previous-btn {
      background: #f4f5f8;
    }
    .submit-btn {
      background: #2d77e5;
    }
    .next-btn {
      background: #2d77e5;
    }
  }
}
</style>
