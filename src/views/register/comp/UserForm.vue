<template>
  <div class="user-form">
    <div class="step-title">注册-基础信息</div>
    <a-form ref="userFormRef" :model="userForm" name="basic" autocomplete="off">
      <a-form-item label="" name="name" :rules="rules.name">
        <div class="label">姓名</div>
        <a-input
          v-model:value="userForm.name"
          placeholder="请输入姓名"
          :maxlength="20"
          show-count
          allowClear
          size="large"
        />
      </a-form-item>
      <a-form-item label="" name="email" :rules="rules.email">
        <div class="label">邮箱</div>
        <a-input
          v-model:value="userForm.email"
          placeholder="请输入邮箱"
          :maxlength="320"
          show-count
          allowClear
          size="large"
        />
      </a-form-item>
      <a-form-item label="" name="gender" :rules="rules.gender">
        <div class="label">性别</div>
        <div class="com-tag-wrap">
          <div
            class="tag-item"
            :class="{ 'tag-item-active': userForm.gender === item.value }"
            v-for="(item, index) in genderOpt"
            :key="index"
            @click="changeGender(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </a-form-item>
      <a-form-item label="" name="age" :rules="rules.age">
        <div class="label">年龄区间</div>
        <div class="com-tag-wrap">
          <div
            class="tag-item"
            :class="{ 'tag-item-active': userForm.age === item.value }"
            v-for="(item, index) in ageOpt"
            :key="index"
            @click="changeAge(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </a-form-item>
      <a-form-item label="" name="emergencyContact" :rules="rules.emergencyContact">
        <div class="label">紧急联系人电话</div>
        <a-input
          v-model:value="userForm.emergencyContact"
          placeholder="请输入邮箱"
          :maxlength="320"
          show-count
          allowClear
          size="large"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import _regexp from '@/utils/_regexp'
const userForm = ref<any>({
  name: '',
  email: '',
  gender: '',
  age: '',
})
const ageOpt = ref<Array<any>>([
  { value: '18-20岁', label: '18-20岁' },
  { value: '21-30岁', label: '21-30岁' },
  { value: '31-40岁', label: '31-40岁' },
  { value: '40岁以上', label: '40岁以上' },
])
const genderOpt = ref<Array<any>>([
  { value: 'male', label: '男' },
  { value: 'female', label: '女' },
])
const rules = ref({
  name: [
    { required: true, message: '请输入姓名' },
    {
      pattern: _regexp.nicknameReg,
      message: '允许中英文、数字、下划线，长度1-20个字符',
    },
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    {
      pattern: _regexp.email,
      message: '请输入正确格式的邮箱',
    },
  ],
  gender: [{ required: true, message: '请选择性别' }],
  age: [{ required: true, message: '请选择年龄区间' }],
  emergencyContact: [
    { required: true, message: '请输入紧急联系人电话' },
    { pattern: _regexp.mobile, message: '手机号码格式异常' },
  ],
})
const userFormRef = ref<any>(null)
const emit = defineEmits<{
  (e: 'success', formData: any): void
}>()
const changeGender = (val: any) => {
  userForm.value.gender = val.value || ''
  userFormRef.value.validateFields(['gender'])
}
const changeAge = (val: any) => {
  userForm.value.age = val.value || ''
  userFormRef.value.validateFields(['age'])
}
const validateForm = () => {
  userFormRef.value
    .validate()
    .then(() => {
      emit('success', userForm.value)
    })
    .catch(() => {})
}
defineExpose({
  validateForm,
})
</script>

<style scoped lang="less">
.user-form {
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
  .com-tag-wrap {
    margin-top: 8px;
    display: flex;
    .tag-item {
      width: 66px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #5f7292;
      font-size: 14px;
      border-radius: 6px;
      cursor: pointer;
      background: #f4f5f8;
      &:not(:last-child) {
        margin-right: 12px;
      }
    }
    .tag-item-active {
      color: #2d77e5;
      background: rgba(45, 119, 229, 0.08);
    }
  }
}
</style>
