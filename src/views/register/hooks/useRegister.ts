import { ref, onBeforeUnmount } from 'vue'
import { message as Message } from 'ant-design-vue'
import { authRegister, authSms } from '@/api/login'
import useRouter from '@/hooks/useRouter'

export default function useRegister() {
  const { router } = useRouter()

  // 是否禁用
  const phoneDisabled = ref(false)
  // 验证码读秒
  const codeTime = ref(0)
  // 最新一次的 hash
  const latestHash = ref<string>('')
  const curHash = ref<string>('')
  // 执行获取短信验证码
  const handleGetSms = async (smsObj: any) => {
    if (phoneDisabled.value) return
    phoneDisabled.value = true
    curHash.value = latestHash.value || smsObj.hash || ''
    const _params = {
      purpose: 1, //场景;1:注册,2:变更手机号码,3:修改/找回密码
      mobile: smsObj.mobile || '',
      hash: curHash.value,
    }
    await authSms(_params)
      .then(async ({ code, message, data }) => {
        latestHash.value = data || ''
        phoneDisabled.value = false
        codeTime.value = 60
        timeReduce()
        if (code === 200) {
          message && Message.success(message)
        } else {
          message && Message.error(message)
        }
      })
      .catch(async () => {
        phoneDisabled.value = false
      })
  }

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
    authRegister(_params).then(({ code, message }) => {
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

  const protocolClick = () => {
    window.open('/protocol', '_blank')
  }

  return {
    curHash,
    phoneDisabled,
    codeTime,
    handleRegister,
    handleGetSms,
    protocolClick,
  }
}
