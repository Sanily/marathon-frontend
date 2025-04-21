import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import { deconstruct } from './deconstruct'
import { BASE_URL } from '@/config'
import { httpStatus } from './http-status'
import { axiosRequest } from './setRequest'
import { getCacheData, setCacheData } from './cache'

interface FetchInstance {
  // eslint-disable-next-line no-unused-vars
  <T = any>(config: AxiosRequestConfig): Promise<T>
}

export const fetch: AxiosInstance & FetchInstance = axios.create({
  baseURL: BASE_URL,
})

axiosRequest(fetch)
httpStatus(fetch)
deconstruct(fetch)

interface resquestConfig {
  cache?: boolean
}

export const request: <T>(
  config: AxiosRequestConfig,
  reqConfig?: resquestConfig
) => Promise<T> = (config, reqConfig) => {
  if (reqConfig?.cache) {
    const data = getCacheData(config)
    if (data !== null && data !== undefined) {
      return Promise.resolve(data)
    }
  }
  return fetch(config).then((res) => {
    if (reqConfig?.cache) {
      setCacheData(config, res.data)
    }
    return res.data
  })
}

export interface Response<T> {
  code: number
  data: T
  error_code: string
  message: string
  msg: string
  redirect: string
}

export interface ResponseList<T> extends Response<T> {
  pageSize: number
  pageNum: number
  total: number
}
