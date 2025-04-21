import { Modal } from 'ant-design-vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import { createVNode } from 'vue'

export const showConfirm = (title: string, content: string, cb?: any) => {
  return new Promise((resolve) => {
    Modal.confirm({
      title: title,
      content: content,
      icon: createVNode(ExclamationCircleFilled),
      centered: true,
      onOk() {
        resolve(true)
        if (cb) {
          return cb()
        }
      },
      onCancel() {
        resolve(true)
      },
    })
  })
}
