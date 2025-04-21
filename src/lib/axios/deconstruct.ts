import { AxiosInstance } from 'axios'

export const deconstruct = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    (response) =>
      response.request.responseType === 'blob' ? response : response.data,
    (error) => Promise.reject(error.response.data)
  )
}
