import { fetch, Response } from '@/lib/axios'

export const getUserList = () =>
  fetch<Response<any>>({
    url: '/api/users/',
    method: 'get',
  })

export const editUser = (data) =>
  fetch<Response<any>>({
    url: '/api/users/update',
    method: 'post',
    data,
  })

export const addUser = (data) =>
  fetch<Response<any>>({
    url: '/api/users/create',
    method: 'post',
    data,
  })

export const deleteUser = (data) =>
  fetch<Response<any>>({
    url: '/api/users/delete/' + data.id,
    method: 'post',
  })
