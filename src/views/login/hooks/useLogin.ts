import { ref } from 'vue'
import { message as Message } from 'ant-design-vue'
import { login as loginApi } from '@/api/login'
import { useRouter } from 'vue-router'

export default function useLogin() {
  const router = useRouter()
  // 登录表单
  const formState = ref({
    account: '',
    password: '',
  })

  // 执行密码登录
  const handleLogin = (params) => {
    return loginApi(params)
      .then(async (data) => {
        if (data.token) {
          localStorage.setItem('global_token', data?.token)
          localStorage.setItem('global_role', data?.role)
          localStorage.setItem('global_userId', data?.userId)
          localStorage.setItem('global_userInfo', JSON.stringify(data))
          // 跳转至重定向地址C
          Message.success('登录成功')
          router.push('/overview')
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
