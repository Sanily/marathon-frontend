<template>
  <div class="layout-operate">
    <a-dropdown :trigger="['click']">
      <div :class="['layout-avatar']">
        {{ username }}
        <img :src="bottom" />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="handleClick" key="0">
            <span class="operate-item"
              ><UserOutlined
                style="color: #26244c; margin-right: 5px"
              />个人中心</span
            >
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="handleloginOut" key="3">
            <span class="operate-item"
              ><ExportOutlined
                style="color: #26244c; margin-right: 5px"
              />退出登录</span
            >
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { message as Message } from 'ant-design-vue'
import { UserOutlined, ExportOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { logout } from '@/api/login'
import usePerson from '@/views/personal/usePerson'
import bottom from '@/assets/images/layout/bottom.svg'
import { showConfirm } from '@/hooks/useConfirm'

const { username, getPersonData } = usePerson()

onMounted(() => {
  getPersonData()
})
const router = useRouter()

// 点击跳转个人中心
const handleClick = () => {
  router.push('/personal')
}

// 点击退出登录 & 重置状态
const handleloginOut = async () => {
  showConfirm('退出登录', '确定退出登录嘛？', async () => {
    return new Promise((resolve) => {
      goLoginOut()
      resolve('ok')
    }).catch(() => console.log('loginOut->confirm->resolve->errors!'))
  })
}

const goLoginOut = async () => {
  const { message } = await logout()
  sessionStorage.clear()
  localStorage.clear()
  router.replace({ path: '/login' })
  message && Message.success(message)
}
</script>

<style lang="less" scoped>
:deep(.operate-info) {
  width: 200px !important;
}
.layout-operate {
  .white-avatar {
    color: #fff !important;
  }
  .layout-avatar {
    height: 48px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #13161b;
    cursor: pointer;
    img {
      width: 18px;
      height: 18px;
      margin-left: 2px;
      margin-bottom: 4px;
    }
  }
  .operate-item {
    color: #26244c;
    width: 200px !important;
    .icon {
      color: #26244c;
    }
  }
}
</style>
