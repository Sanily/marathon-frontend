import type { AxiosRequestConfig } from 'axios'

const CACHE_PREFIX = 'C_'

const I64BIT_TABLE =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('')

function hash(input) {
  let hash = 5381
  let i = input.length - 1

  if (typeof input == 'string') {
    for (; i > -1; i--) hash += (hash << 5) + input.charCodeAt(i)
  } else {
    for (; i > -1; i--) hash += (hash << 5) + input[i]
  }
  let value = hash & 0x7fffffff

  let retValue = ''
  do {
    retValue += I64BIT_TABLE[value & 0x3f]
  } while ((value >>= 6))

  return retValue
}
function getCacheKey(config: AxiosRequestConfig) {
  return CACHE_PREFIX + hash(JSON.stringify(config))
}
const cacheData = {
  get: (key: string) => {
    const data = sessionStorage.getItem(key)
    let result
    if (data) {
      result = JSON.parse(data)
    }
    return result
  },
  set: (key: string, data: any) => {
    sessionStorage.setItem(key, JSON.stringify(data))
  },
}
export function getCacheData(config: AxiosRequestConfig) {
  const key = getCacheKey(config)
  let data
  try {
    data = cacheData.get(key)
  } catch (error) {
    console.log(error)
  }
  return data
}
export function setCacheData(config: AxiosRequestConfig, data: any) {
  const key = getCacheKey(config)
  cacheData.set(key, data)
}
