import { fetch, Response } from '@/lib/axios'

export const getFeedbackList = () =>
  fetch<Response<any>>({
    url: '/api/feedback/',
    method: 'get',
  })

export const editFeedback = (data) =>
  fetch<Response<any>>({
    url: '/api/feedback/update',
    method: 'post',
    data,
  })

export const addFeedback = (data) =>
  fetch<Response<any>>({
    url: '/api/feedback/create',
    method: 'post',
    data,
  })

export const deleteFeedback = (data) =>
  fetch<Response<any>>({
    url: '/api/feedback/delete/' + data.id,
    method: 'post',
  })
