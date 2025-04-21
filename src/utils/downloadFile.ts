import { saveAs } from 'file-saver'

export const downloadFile = (res) => {
  let name = res.headers['content-disposition']
  const nameArr = res.config.url.split('/')
  const url_name = nameArr[nameArr.length - 1]
  name = name?.replace("attachment;filename*=utf-8''", '') || url_name
  name = decodeURI(name)
  saveAs(new Blob([res.data]), name)
}

export const downloadPkg = (res) => {
  const disposition = res.headers['content-disposition']
  const name = decodeURIComponent(disposition.split('=')[1])
  saveAs(new Blob([res.data]), name)
}
