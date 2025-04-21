import type { AxiosInstance } from 'axios'

export const axiosRequest = (axios: AxiosInstance) => {
  axios.interceptors.request.use((config: any) => {
    const token: string = localStorage.getItem('global_token')
      ? (localStorage.getItem('global_token') as string)
      : ''
    if (config.Authorization === false) {
      return config
    }
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })
}
