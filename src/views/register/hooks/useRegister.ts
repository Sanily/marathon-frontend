import { ref, onBeforeUnmount } from 'vue'
import { message as Message } from 'ant-design-vue'
import { register, authSms } from '@/api/login'
import { useRouter } from 'vue-router'

export default function useRegister() {
  const router = useRouter()

  // 是否禁用
  const phoneDisabled = ref(false)
  // 验证码读秒
  const codeTime = ref(0)
  // 最新一次的 hash

  let timer: any = null
  const timeReduce = () => {
    codeTime.value--
    if (codeTime.value < 0) {
      codeTime.value = 0
      return
    }
    timer = setTimeout(timeReduce, 1000)
  }
  // 执行注册
  const handleRegister = async (formData: any) => {
    const _params = Object.assign({}, formData)
    delete _params.checkPassword
    register(_params).then(({ code, message }) => {
      if (code === 200) {
        message && Message.success(message)
        setTimeout(() => {
          router.push('/login')
        }, 500)
      } else {
        message && Message.error(message)
      }
    })
  }
  onBeforeUnmount(() => timer && clearTimeout(timer))

  return {
    phoneDisabled,
    codeTime,
    handleRegister,
  }
}
