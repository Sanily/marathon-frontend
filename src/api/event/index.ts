import { fetch, Response } from '@/lib/axios'

export const getEventList = () =>
  fetch<Response<any>>({
    url: '/api/event/',
    method: 'get',
  })

export const getEventById = (data) =>
  fetch<Response<any>>({
    url: '/api/event/' + data.id,
    method: 'get',
  })

export const editEvent = (data) =>
  fetch<Response<any>>({
    url: '/api/event/update',
    method: 'post',
    data,
  })

export const addEvent = (data) =>
  fetch<Response<any>>({
    url: '/api/event/create',
    method: 'post',
    data,
  })

export const deleteEvent = (data) =>
  fetch<Response<any>>({
    url: '/api/event/delete/' + data.id,
    method: 'post',
  })
