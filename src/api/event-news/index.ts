import { fetch, Response } from '@/lib/axios'

export const getEventNewsList = (params) =>
  fetch<Response<any>>({
    url: '/api/event-news/',
    method: 'get',
    params: {
      ...params,
      pageSize: 1000
    }
  })

export const getEventNewsById = (data) =>
  fetch<Response<any>>({
    url: '/api/event-news/' + data.id,
    method: 'get',
  })

export const editEventNews = (data) =>
  fetch<Response<any>>({
    url: '/api/event-news/update',
    method: 'post',
    data,
  })

export const addEventNews = (data) =>
  fetch<Response<any>>({
    url: '/api/event-news/create',
    method: 'post',
    data,
  })

export const deleteEventNews = (data) =>
  fetch<Response<any>>({
    url: '/api/event-news/delete/' + data.id,
    method: 'post',
  })
