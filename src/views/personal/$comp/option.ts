import _regexp from '@/utils/_regexp'
import { ref } from 'vue'
export const userInfoRules = ref<any>({
  account: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'change',
    },
    {
      pattern: _regexp.accountReg,
      message: '允许中英文、数字、下划线，长度5-20个字符',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'change',
    },
    {
      pattern: _regexp.nicknameReg,
      message: '允许中英文、数字、下划线，长度1-20个字符',
    },
  ],
  mobile: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'change',
    },
    { pattern: _regexp.phoneOrMoblie, message: '手机号码格式异常' },
  ],
  age: [
    {
      required: true,
      message: '请选择年龄区间',
      trigger: 'change',
    },
  ],
  overdue: [
    {
      required: true,
      message: '请选择账号有效期',
      trigger: 'change',
    },
  ],
  gender: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change',
    },
  ],
})
