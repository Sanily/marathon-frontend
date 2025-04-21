import { computed, ref } from 'vue'
import { message as Message } from 'ant-design-vue'
import { editUserInfo } from '@/api/person/index'
import type { UserInfoRes } from '@/api/person/index'

export default function usePerson() {
  // 表单数据
  const formState = ref<UserInfoRes>({
    id: 0,
    name: '',
    mobile: '',
    email: '',
    ageName: '',
    sexName: '',
    industryName: '',
    promoter: false, //具备邀请权限
    total: '', //邀请码-限制人数
    access: '', //邀请码-链接时效/h
    overdue: '', //邀请码-账号有效期/d
    rebind: '', //注册换绑
    recover: '', //	重置密码;1:禁用,2:短信方式,3:密码方式
    hash: '',
  })
  // 表单实例
  const personFormRef = ref()

  // 获取个人信息
  const getPersonData = async () => {
    const data = []
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  const username = computed(() => {
    const data = JSON.parse(localStorage.getItem('userInfo')) || {}
    return data.name
  })

  // 修改名称
  const handleEditName = () => {
    personFormRef.value.validate(['name']).then(async () => {
      const params = {
        id: formState.value.id,
        name: formState.value.name,
      }
      // 若姓名没有改变 不做修改
      if (username.value === formState.value.name) return
      // 执行修改姓名接口
      editUserInfo(params).then(() => {
        Message.success('姓名修改成功')
        getPersonData()
      })
    })
  }

  return {
    formState,
    username,
    personFormRef,
    getPersonData,
    handleEditName,
  }
}
