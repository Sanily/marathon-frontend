import { computed, ref } from 'vue'
import { message as Message } from 'ant-design-vue'
import { getUserInfoById, editUserInfo } from '@/api/person/index'
import type { UserInfoRes } from '@/api/person/index'

export default function usePerson() {
  // 表单数据
  const formState = ref<UserInfoRes>({
    id: 0,
    name: '',
    mobile: '',
  })
  // 表单实例
  const personFormRef = ref()
  const username = ref('')
  const userInfo = ref({})

  // 获取个人信息
  const getPersonData = async () => {
    const userId = localStorage.getItem('global_userId')
    const data = await getUserInfoById({ id: userId })
    localStorage.setItem('global_userInfo', JSON.stringify(data))
    userInfo.value = data || {}
    username.value = userInfo.value.realName
  }

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
    userInfo,
    personFormRef,
    getPersonData,
    handleEditName,
  }
}
