import { ref, createVNode } from 'vue'
import { message as Message, Modal } from 'ant-design-vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import useRouter from '@/hooks/useRouter'
import { login as loginApi } from '@/api/login'

export default function useLogin() {
  const { router } = useRouter()

  // 登录表单
  const formState = ref({
    mobile: '',
    password: '',
  })

  const forceHash = ref<string>('')
  // 执行密码登录
  const handleLogin = (params) => {
    return loginApi(params)
      .then(async ({ code, data, message }) => {
        if (code === 200) {
          localStorage.setItem('global_token', data?.token)
          if (data?.token) {
            // 跳转至重定向地址
            Message.success('登录成功')
          } else {
            return false
          }
          return true
        } else {
          return false
        }
      })
      .catch((error) => {
        // code 400 data包含跳转地址 直接return
        if (error.code === 400 && error.data) {
          return false
        } else {
          // 参数错误等置空验证码 并刷新验证码
          return false
        }
      })
  }

  return {
    formState,
    handleLogin,
  }
}
