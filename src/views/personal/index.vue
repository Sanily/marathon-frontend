<template>
  <div class="person">
    <a-spin :spinning="loading">
      <div class="com-module person-info">
        <div class="name">
          {{ userInfo.name || '--' }}
          <div class="icon" @click="handleEdit">
            <edit-outlined />
          </div>
        </div>
        <a-descriptions :column="4">
          <a-descriptions-item
            label="姓名"
            ><TextOverflow :text="userInfo?.name || '--'"
          /></a-descriptions-item>
          <a-descriptions-item
            label="用户名"
            ><TextOverflow :text="userInfo?.account || '--'"
          /></a-descriptions-item>
          <a-descriptions-item
            label="手机号"
            ><TextOverflow :text="userInfo?.mobile || '--'"
          /></a-descriptions-item>
          <a-descriptions-item
            label="性别"
            ><TextOverflow :text="userInfo?.sexName || '--'"
          /></a-descriptions-item>
          <a-descriptions-item
            label="年龄"
            ><TextOverflow :text="userInfo?.ageName || '--'"
          /></a-descriptions-item>
        </a-descriptions>
      </div>
    </a-spin>
    <UserInfoDialog
      v-model:visible="userInfoDialogVisible"
      :row="{ ...userInfo }"
      @success="onReflesh"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  EditOutlined,
} from '@ant-design/icons-vue'
import UserInfoDialog from './$comp/userInfoDialog.vue'
import TextOverflow from '@/components/contents/textOverflow.vue'
import { getUserInfo } from '@/api/person'

const loading = ref<boolean>(false)
const userInfo = ref<any>({})
const userInfoDialogVisible = ref<boolean>(false)

onMounted(() => {
  getPersonData()
})
const onReflesh = async () => {
  getPersonData()
}

const getPersonData = async () => {
  await getUserInfo()
}
const handleEdit = () => {
  userInfoDialogVisible.value = true
}
</script>

<style scoped lang="less">
.person {
  .com-module {
    border-radius: 4px;
    background: #fff;
  }
  &-info {
    padding: 34px 68px;
    .name {
      color: var(--Gray-Gray5, #3c485c);
      font-family: PingFang SC;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      .icon {
        margin-left: 20px;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .icon {
      color: #2d77e5;
      margin-left: 8px;
    }
    :deep(.ant-descriptions) {
      .ant-descriptions-item-container {
        display: flex;
      }
      .ant-descriptions-item-label,
      .ant-descriptions-item-content {
        max-width: calc(100% - 88px);
        color: #13161b;
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        display: flex;
        align-items: center;
      }
    }
  }
  &-banner {
    padding: 16px 36px 40px 36px;
    .module-item {
      display: flex;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid #d6dbe3;
      .img {
        width: 40px;
        height: 40px;
        margin-right: 16px;
      }
      .conc {
        flex: 1;
        color: #13161b;
        .title {
          font-size: 16px;
          font-weight: 500;
        }
        .desc {
          margin-top: 6px;
          font-size: 14px;
          display: flex;
          align-items: center;
          .red {
            font-size: 18px;
            color: #c9353f;
            padding: 0 8px;
          }
          .conc-form {
            display: flex;
            align-items: center;
            .ant-form-item {
              margin-bottom: 0;
            }
            :deep(.ant-form-item-explain) {
              display: none;
            }
          }
        }
      }
      .ope {
        width: 100px;
        text-align: right;
        color: #2d77e5;
        font-family: PingFang SC;
        font-size: 14px;
        cursor: pointer;
        &.disabled {
          color: #3c485c;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
