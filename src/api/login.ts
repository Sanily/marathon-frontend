import { fetch, Response } from '@/lib/axios'
import CryptoJS from 'crypto-js'
 
function md5Encrypt(text) {
  return CryptoJS.MD5(text).toString();
}

export interface LoginRes {
  token: string
}
export const login = (params: Record<string, any>) => {
  const result = md5Encrypt(params.password);
  return fetch<Response<LoginRes>>({
    url: '/api/login/in',
    method: 'post',
    data: {
      name: params.account,
      password: result,
    },
  })
}

export const register = (params: Record<string, any>) => {
  const result = md5Encrypt(params.password);
  return fetch<Response<LoginRes>>({
    url: '/api/users/create',
    method: 'post',
    data: {
      username: params.account,
      realName: params.name,
      email: params.email,
      gender: params.gender,
      age: params.age,
      emergencyContact: params.emergencyContact,
      phone: params.mobile,
      password: result,
      role: 'VOLUNTEER',
    },
  })
}

export const logout = () =>
  fetch<Response<any>>({
    url: '/api/login/out',
    method: 'get',
  })
