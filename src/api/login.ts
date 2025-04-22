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
  console.log(result); // 输出MD5加密后的字 符串
  return fetch<Response<LoginRes>>({
    url: '/api/login/in',
    method: 'post',
    data: {
      name: params.account,
      password: result,
    },
  })
}

// {"invitation":"","name":"123","email":"11@cc.om","gender":"male","age":"18-20岁","emergencyContact":"13333333333","mobile":"13333333333","captcha":"123456","password":"1111@!Aa"}
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
