import { fetch, Response } from '@/lib/axios'

export const getVolunteerTaskList = () =>
  fetch<Response<any>>({
    url: '/api/volunteer-task/',
    method: 'get',
  })
export const receiptVolunteerTask = (data) =>
  fetch<Response<any>>({
    url: '/api/volunteer-task/confirmReceipt',
    method: 'post',
    data,
  })
export const completionVolunteerTask = (data) =>
  fetch<Response<any>>({
    url: '/api/volunteer-task/confirmCompletion',
    method: 'post',
    data,
  })
export const editVolunteerTask = (data) =>
  fetch<Response<any>>({
    url: '/api/volunteer-task/update',
    method: 'post',
    data,
  })

export const addVolunteerTask = (data) =>
  fetch<Response<any>>({
    url: '/api/volunteer-task/create',
    method: 'post',
    data,
  })

export const deleteVolunteerTask = (data) =>
  fetch<Response<any>>({
    url: '/api/volunteer-task/delete/' + data.id,
    method: 'post',
  })
