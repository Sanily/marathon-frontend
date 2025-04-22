import { fetch, Response } from '@/lib/axios'
import CryptoJS from 'crypto-js'
 
function md5Encrypt(text) {
  return CryptoJS.MD5(text).toString();
}

export const getUserList = () =>
  fetch<Response<any>>({
    url: '/api/users/',
    method: 'get',
  })

export const editUser = (data) => {
  const result = md5Encrypt(data.password);
  return fetch<Response<any>>({
    url: '/api/users/update',
    method: 'post',
    data: {
      ...data,
      password: result,
    },
  })
}

export const addUser = (data) => {
  const result = md5Encrypt(data.password);
  return fetch<Response<any>>({
    url: '/api/users/create',
    method: 'post',
    data: {
      ...data,
      password: result,
    },
  })
}
  

export const deleteUser = (data) =>
  fetch<Response<any>>({
    url: '/api/users/delete/' + data.id,
    method: 'post',
  })
