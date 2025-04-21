import { fetch } from '@/lib/axios'
import { downloadFile } from '@/utils/downloadFile'

export const getSettings = () =>
  fetch({
    url: '/api/v1/system/portal/settings',
    method: 'get',
  })

export const getSettingFiles = (params: { fileId: string }) =>
  fetch({
    url: '/api/system/v1/file',
    method: 'get',
    params,
  })

// 登录获取资源不需权限
export const getAuthImage = (params: { fileId: string }) =>
  fetch({
    url: 'api/system/v1/auth/image',
    method: 'get',
    params,
    responseType: 'blob',
  }).then((res: any) => {
    const url = window.URL.createObjectURL(res.data)
    return url
  })

// 文件上传
export const uploadFiles = (data: {
  bucket: string
  maxSize: string
  allowType: string
  file: File
}) => {
  const formData = new FormData()
  Object.keys(data).forEach((itm) => {
    formData.append(itm, data[itm])
  })
  return fetch({
    url: '/api/v1/system/file/upload',
    method: 'post',
    data: formData,
  })
}

export const downloadImg = (params: { fileId: string }) =>
  fetch<string>({
    url: `/api/v1/system/file/download?fileId=${params.fileId}`,
    method: 'get',
    responseType: 'blob',
  }).then((res: any) => {
    const url = window.URL.createObjectURL(res.data)
    return url
  })
export const downloadFilesByFileId = (params: { fileId: string }) =>
  fetch<string>({
    url: `/api/system/v1/file/download?fileId=${params.fileId}`,
    method: 'get',
    responseType: 'blob',
  }).then((res: any) => {
    downloadFile(res)
  })

export const downloadFiles = (url: string) =>
  fetch<string>({
    url,
    method: 'get',
    responseType: 'blob',
  }).then((res: any) => {
    downloadFile(res)
  })

//获取下拉数据通用方法
export const getSelectOpt = async (apiFun: () => any) => {
  const { data } = await apiFun()
  return data || []
}

export const downloadFileByUrl = (params: { url: string }) =>
  fetch<string>({
    url: `${params.url}`,
    method: 'get',
    responseType: 'blob',
  }).then((res: any) => {
    downloadFile(res)
  })

export const fetchByUrl = (params: { url: string }) =>
  fetch<string>({
    url: `${params.url}`,
    method: 'get',
    Authorization: false,
  })
