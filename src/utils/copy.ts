import Clipboard from 'clipboard'
import { message } from 'ant-design-vue'

export default function handleClipboard(text: string, event: any) {
  let copyObj: any = null
  copyObj = new Clipboard(event.target, {
    text: () => text,
  })
  copyObj.on('success', () => {
    message.success('已复制')
    copyObj.destroy()
    copyObj = null
  })
  copyObj.on('error', () => {
    copyObj.destroy()
    copyObj = null
  })
  copyObj.onClick(event)
}
