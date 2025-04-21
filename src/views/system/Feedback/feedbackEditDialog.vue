<template>
  <div class="user-info-dialog">
    <a-modal
      v-model:visible="visibleChange"
      title="编辑反馈"
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
          <a-col :span="24">
            <a-form-item name="title">
              <a-input
                v-model:value="userForm.title"
                placeholder="请输入标题"
                :maxlength="20"
                allow-clear
                show-count
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="内容" name="content">
              <a-input
                type="textarea"
                v-model:value="userForm.realName"
                placeholder="请输入内容"
                :maxlength="200"
                allow-clear
                show-count
              />
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
import { editTask, addTask } from '@/api/task'
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
        fn = editTask
      } else {
        fn = addTask
      }
      const { code, message } = await editTask(params)
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
