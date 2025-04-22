import { fetch, Response } from '@/lib/axios'

export const getAllEventNews = () =>
  fetch<Response<any>>({
    url: '/statistics/getAllEventNews',
    method: 'get',
  })

export const getMonthlyStats = () =>
  fetch<Response<any>>({
    url: '/statistics/getMonthlyStats',
    method: 'get',
  })

export const getVolunteerTaskStats = () =>
  fetch<Response<any>>({
    url: '/statistics/getVolunteerTaskStats',
    method: 'get',
  })


export const getMonthlyTaskStats = () =>
  fetch<Response<any>>({
    url: '/statistics/getMonthlyTaskStats',
    method: 'get',
  })

export const getTop10Volunteers = () =>
  fetch<Response<any>>({
    url: '/statistics/getTop10Volunteers',
    method: 'get',
  })


export const getTaskProgressList = () =>
  fetch<Response<any>>({
    url: '/statistics/getTaskProgressList',
    method: 'get',
  })