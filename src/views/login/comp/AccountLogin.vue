<template>
  <div class="account-login">
    <a-spin :spinning="spinning">
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="" name="account" :rules="rules.account">
          <div class="label">用户名</div>
          <a-input
            v-model:value="formState.account"
            placeholder="请输入用户名"
            size="large"
            allowClear
          />
        </a-form-item>
        <a-form-item label="" name="password" :rules="rules.password">
          <div class="label">密码</div>
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入密码"
            size="large"
            allowClear
          />
        </a-form-item>
        <a-form-item >
          <a-checkbox v-model:checked="protoChecked">
            <span class="tip"
              >同意<span>相关协议与声明</span></span
            >
          </a-checkbox>
        </a-form-item>
        <a-form-item style="margin-top: 80px">
          <a-button
            type="primary"
            size="large"
            html-type="submit"
            block
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import useLogin from '../hooks/useLogin'
import _regexp from '@/utils/_regexp'
import { useRouter } from 'vue-router'

const router = useRouter()
const { formState, handleLogin } =
  useLogin()
const spinning = ref<boolean>(false)
const protoChecked = ref<boolean>(false)

const loginPassWordReg =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_\\\\[\]/~!@#$%^&*()=+《》？【】‘’|！（）：；“”，。、·±×「」『』〖〗÷→←√{}￥…—:<>;,.?——-])[0-9a-zA-Z_\\\\[\]/~!@#$%^&*()=+《》？【】‘’|！（）：；“”，。、·±×「」『』〖〗÷→←√{}￥…—:<br>;,.?——-]{6,20}$/ // 包含大小写字母和数字、特殊字符，长度在8-20之间
const rules = ref({
  account: [
    { required: true, message: '请输入用户名' },
    {
      pattern: _regexp.accountReg,
      message: '账号允许中英文、数字、下划线，长度6-20个字符',
    },
  ],
  password: [
    { required: true, message: '请输入密码' },
    {
      pattern: loginPassWordReg,
      message: '密码须包含大小写字母、特殊符号、数字，限制6-20个字符',
    },
  ],
})

const form = ref({} as any)
const onFinish = async (params) => {
  form.value = { ...params }
  if (!protoChecked.value) {
    Modal.confirm({
      title: '暂未勾选同意用户协议',
      content: '登录则表示您同意用户协议，是否继续？',
      okText: '同意并继续',
      icon: createVNode(ExclamationCircleFilled),
      centered: true,
      async onOk() {
        protoChecked.value = true
        handleLogin({ ...params }).then((success) => {
          console.log('登录成功', success)
        })
      },
      onCancel() {
        console.log('取消登录')
      },
    })
  } else {
    handleLogin({ ...params }).then((success) => {
      console.log('登录成功', success)
    })
  }
}

const onFinishFailed = (errors) => {
  console.log(errors)
}
</script>

<style lang="less" scoped>
.account-login {
  margin-top: 12px;
  .label {
    width: 100px;
    color: #13161b;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 6px;
  }
  .tip {
    color: var(--Gray-Gray3, #97a3b7);
    font-size: 12px;
    span {
      cursor: pointer;
      font-weight: 500;
    }
  }
  .forget-pwd {
    color: #97a3b7;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
    margin-top: 18px;
  }
}
</style>
