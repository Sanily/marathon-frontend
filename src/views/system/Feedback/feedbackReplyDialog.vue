<template>
  <div class="user-info-dialog">
    <a-modal
      v-model:visible="visibleChange"
      title="处理反馈"
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
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="内容" name="content">
              <a-textarea
                v-model:value="userForm.content"
                placeholder="请输入内容"
                :maxlength="200"
                allow-clear
                show-count
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="回复内容" name="replyContent">
              <a-textarea
                v-model:value="userForm.replyContent"
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
import { editFeedback } from '@/api/feedback'
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
  content: '',
  title: '',
  replyContent: '',
})

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
    } else {
      handleReset()
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
        status: '已处理',
      }
      const { message } = await editFeedback(params)
      Message.success(message || '操作成功')
      visibleChange.value = false
      emits('success')
    })
    .catch(() => {})
}
const handleReset = () => {
  userFormRef.value.resetFields()
  userForm.value = {
    id: '',
    content: '',
    title: '',
    replyContent: '',
  }
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
