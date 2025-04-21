import { message as Message } from 'ant-design-vue'
import { AxiosInstance } from 'axios'

// 从Blob对象中获取信息
/**
 * 尝试从传入的Blob对象中读取信息，并解析为JSON对象。
 * 如果传入的数据不是Blob对象，将直接返回一个空的Promise对象。
 * @param data 待解析的Blob对象。
 * @returns 返回一个Promise对象，解析后的结果为JSON对象或空对象。
 */
function getBlobInfo(data) {
  if ({}.toString.call(data) !== '[object Blob]') return Promise.resolve({})
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(data, 'utf-8')
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(JSON.parse(reader.result))
      } else {
        resolve({})
      }
    }
  })
}

// 定义HTTP状态码的处理逻辑
/**
 * 为axios实例添加响应拦截器，用于处理不同的HTTP状态码。
 * @param axios Axios实例。
 */
export const httpStatus = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    (response) => {
      // 请求成功时的默认处理
      if (response) return response
    },
    async (error) => {
      // 请求错误时的处理
      if (error.response) {
        const { status, data } = error.response
        let errData = data
        // 如果响应数据为Blob类型，则尝试解析其内容
        if ({}.toString.call(data) === '[object Blob]') {
          errData = (await getBlobInfo(data)) as any
        }
        // 根据状态码调用相应的错误处理函数
        const handler = errorHandlers[status] || errorHandlers.default
        handler({ ...error.response, data: errData })
      }
      return Promise.reject(error)
    }
  )
}

/**
 * 显示错误或警告消息的函数。
 * 该函数将根据传入的消息类型和内容，决定是否显示消息。
 * 为了避免重复显示相同的消息，它会记录最后显示的消息。
 * 消息将在一秒后自动清除。
 *
 * @param params 包含消息类型和内容的对象。
 * @param params.type 消息类型，可以是 'warning' 或 'error'。
 * @param params.message 消息内容，将根据类型显示在界面上。
 */

let lastMessage = ''

const errorMessage = (params: {
  type: 'warning' | 'error'
  message: string
}) => {
  // 如果当前消息与上次消息不同，则显示消息，并更新最后消息为当前消息
  if (lastMessage !== params.message) {
    params.message && Message[params.type](params.message)
    lastMessage = params.message
  }
  // 设置一秒钟后清除消息的定时器，以便可以只显示最近的消息
  setTimeout(() => {
    lastMessage = ''
  }, 1000)
}

// 错误处理函数集合
const errorHandlers = {
  400: ({ data }) => {
    // 处理400状态码：显示错误消息
    errorMessage({ type: 'warning', message: data.message })
  },
  401: ({ data }) => {
    // 处理401状态码：显示错误消息，清理本地存储并跳转到首页
    errorMessage({ type: 'warning', message: data.message })
    localStorage.clear()
    sessionStorage.clear()
    setTimeout(() => {
      window.location.href = '/'
    }, 500)
  },
  402: ({ data }) => {
    // 处理402状态码：显示错误消息，清理本地存储
    errorMessage({ type: 'warning', message: data.message })
    localStorage.clear()
  },
  403: ({ data }) => {
    // 处理403状态码：显示错误消息 data中有地址进行跳转
    errorMessage({ type: 'warning', message: data.message })
    if (data?.data) {
      setTimeout(() => {
        window.location.href = data.data
      }, 200)
    }
  },
  404: ({ status, data }) => {
    // 处理404状态码：保存错误码和消息到本地存储，跳转到首页
    localStorage.setItem('global_errorCode', status)
    localStorage.setItem('global_errorMes', data.message)
    window.location.href = '/'
  },
  default: ({ data }) => {
    // 默认错误处理函数：显示错误消息
    errorMessage({ type: 'error', message: data.message })
  },
}
