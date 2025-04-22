<template>
  <div class="user-info-dialog">
    <a-modal
      v-model:visible="visibleChange"
      :title="props.row.id ? '编辑任务' : '新增任务'"
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
            <a-form-item label="任务名称" name="name">
              <a-input
                v-model:value="userForm.name"
                placeholder="请输入任务名称"
                :maxlength="20"
                allow-clear
                show-count
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类别" name="category">
              <a-select
                v-model:value="userForm.category"
                style="width: 100%"
                show-search
                placeholder="请选择类别"
                :options="categoryOpt"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="描述" name="description">
              <a-textarea
                v-model:value="userForm.description"
                placeholder="请输入描述"
                :maxlength="200"
                allow-clear
                show-count
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="开始时间" name="time">
              <a-date-picker v-model:value="userForm.startTime" style="width: 100%" show-time placeholder="请选择开始时间" @ok="(value) => onOk(value, 'startTime')"  value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="结束时间" name="time">
              <a-date-picker v-model:value="userForm.startTime" style="width: 100%" show-time placeholder="请选择结束时间" @ok="(value) => onOk(value, 'endTime')"  value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="地点" name="location">
              <a-input
                v-model:value="userForm.location"
                placeholder="请输入地点"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="所需人数" name="requiredNumber">
              <a-input
                v-model:value="userForm.requiredNumber"
                placeholder="请输入所需人数"
                allow-clear
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
import { Dayjs } from 'dayjs';

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
  name: '',
  description: '',
  location: '',
  requiredNumber: '',
  startTime: '',
  endTime: '',
  category: null,
})
const categoryOpt = [
  { label: '赛道引导', value: '赛道引导' },
  { label: '物资发放', value: '物资发放' },
  { label: '医疗辅助', value: '医疗辅助' },
]

const onOk = (value: Dayjs, key) => {
  userForm.value[key] = value
};

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
      }
      let fn = null
      if (props.row.id) {
        fn = editTask
      } else {
        fn = addTask
        delete params.id
      }
      const { message } = await fn(params)
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
    name: '',
    description: '',
    location: '',
    requiredNumber: '',
    startTime: '',
    endTime: '',
    category: null,
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
