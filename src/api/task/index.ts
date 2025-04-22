import { fetch, Response } from '@/lib/axios'

export const getTaskList = () =>
  fetch<Response<any>>({
    url: '/api/task/',
    method: 'get',
  })
export const assignTask = (data) =>
  fetch<Response<any>>({
    url: '/api/task/assign',
    method: 'post',
    data,
  })
export const editTask = (data) =>
  fetch<Response<any>>({
    url: '/api/task/update',
    method: 'post',
    data,
  })

export const addTask = (data) =>
  fetch<Response<any>>({
    url: '/api/task/create',
    method: 'post',
    data,
  })

export const deleteTask = (data) =>
  fetch<Response<any>>({
    url: '/api/task/delete/' + data.id,
    method: 'post',
  })
