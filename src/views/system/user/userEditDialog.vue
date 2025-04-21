<template>
  <div class="user-info-dialog">
    <a-modal
      v-model:visible="visibleChange"
      title="编辑用户"
      class="user-info-dialog-wrap"
      :centered="true"
      :maskClosable="false"
      width="760px"
    >
      <a-form
        ref="userFormRef"
        :model="userForm"
        autocomplete="off"
        labelAlign="right"
        layout="vertical"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="username">
              <template #label>
                <span>用户名</span>
                <span class="tip">支持字母、数字、下划线，6-20字符</span>
              </template>
              <a-input
                v-model:value="userForm.username"
                placeholder="请输入用户名"
                :maxlength="20"
                allow-clear
                show-count
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="姓名" name="realName">
              <a-input
                v-model:value="userForm.realName"
                placeholder="请输入姓名"
                :maxlength="20"
                allow-clear
                show-count
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="性别" name="gender">
              <a-radio-group
                style="width: 100%"
                v-model:value="userForm.gender"
                button-style="solid"
              >
                <a-radio-button
                  v-for="(itm, idx) in sexOpt"
                  :value="itm.value"
                  :key="idx"
                  >{{ itm.label }}</a-radio-button
                >
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="手机号码" name="phone">
              <a-input
                v-model:value="userForm.phone"
                placeholder="请输入手机号码"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="年龄区间" name="age">
              <a-radio-group
                style="width: 100%"
                v-model:value="userForm.age"
                button-style="solid"
              >
                <a-radio-button
                  v-for="(itm, idx) in ageOpt"
                  :value="itm.value"
                  :key="idx"
                  >{{ itm.label }}</a-radio-button
                >
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #footer>
        <div class="footer-wrapper">
          <div></div>
          <a-space>
            <a-button @click="handleReset">重置</a-button>
            <a-button type="primary" @click="handleSubmit">提交</a-button>
          </a-space>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { editUser, addUser } from '@/api/user'
import { message as Message } from 'ant-design-vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  row: {
    type: Object,
    default: () => {},
  },
})
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'success'): void
}>()
const userForm = ref<any>({
  id: '',
  phone: '',
  realName: '',
  username: '',
  gender: '',
  age: '',
})
const sexOpt = ref<Array<any>>([
  { value: '18-20岁', label: '18-20岁' },
  { value: '21-30岁', label: '21-30岁' },
  { value: '31-40岁', label: '31-40岁' },
  { value: '40岁以上', label: '40岁以上' },
])
const ageOpt = ref<Array<any>>([
  { value: 'male', label: '男' },
  { value: 'female', label: '女' },
])
const userFormRef = ref<any>(null)

const visibleChange = computed({
  get: () => props.visible,
  set: (val: boolean) => {
    emits('update:visible', val)
  },
})
watch(
  () => visibleChange.value,
  async (value) => {
    if (value) {
      userForm.value = { ...userForm.value, ...props.row }
    }
  }
)

const handleSubmit = () => {
  userFormRef.value
    .validate()
    .then(async () => {
      const params = {
        id: props.row.id,
        ...userForm.value,
      }
      let fn = null
      if (props.row.id) {
        fn = editUser
      } else {
        fn = addUser
      }
      const { code, message } = await editUser(params)
      if (code === 200) {
        Message.success(message || '编辑成功')
        visibleChange.value = false
        emits('success')
      } else {
        message && Message.error(message)
      }
    })
    .catch(() => {})
}
const handleReset = () => {
  userFormRef.value.resetFields()
  userForm.value = { ...userForm.value, ...props.row }
}
</script>

<style scoped lang="less">
.user-info-dialog-wrap {
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
  .tip {
    font-size: 12px;
    color: #97a3b7;
    margin-left: 5px;
  }
}
</style>
