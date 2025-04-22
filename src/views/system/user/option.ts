import _regexp from '@/utils/_regexp'
import { ref } from 'vue'
export const userInfoRules = ref<any>({
  userName: [
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
  realName: [
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
  phone: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'change',
    },
    { pattern: _regexp.phoneOrMoblie, message: '手机号码格式异常' },
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    {
      pattern: _regexp.email,
      message: '请输入正确格式的邮箱',
    },
  ],
  age: [
    {
      required: true,
      message: '请选择年龄区间',
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
  emergencyContact: [
    { required: true, message: '请输入紧急联系人电话' },
    { pattern: _regexp.mobile, message: '手机号码格式异常' },
  ],
})
