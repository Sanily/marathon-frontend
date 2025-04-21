import { fetch, Response } from '@/lib/axios'

export interface LoginRes {
  token: string
}
export const login = (params: Record<string, any>) => {
  return fetch<Response<LoginRes>>({
    url: '/api/login/in',
    method: 'post',
    data: {
      name: params.account,
      password: params.password,
    },
  })
}

export const logout = () =>
  fetch<Response<any>>({
    url: '/api/login/out',
    method: 'get',
  })
