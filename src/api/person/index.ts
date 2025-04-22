import { fetch, Response } from '@/lib/axios'

export interface UserInfoRes {
  ding: string // 钉钉好
  id: number // id
  mobile: string // 手机号
  name: string // 昵称
  wechat: string // 微信号
  promoter: boolean // 邀请人 true:点击按钮获取邀请码 false:不展示按钮
  hash: string // 手机号换绑 & 重置密码 需要传递hash
}

export const getUserInfo = () =>
  fetch<Response<UserInfoRes>>({
    url: '/api/users/',
    method: 'get',
  })
export const getUserInfoById = (params) =>
  fetch<Response<UserInfoRes>>({
    url: '/api/users/' + params.id,
    method: 'get',
  })

// 个人中心-修改昵称
export const editUserInfo = (data) =>
  fetch<Response<UserInfoRes>>({
    url: '/api/users/update',
    method: 'post',
    data,
  })

export interface authUpdateReq {
  account?: string //当前账号对应手机号
  captcha?: string //短信验证码
  hash?: string //	短信编号
  mobile?: string //变更后的手机号
  password?: string //变更后的密码
  accountPwd?: string
}

// 修改密码
export const resetPwd = (data: authUpdateReq) => {
  const _data = Object.assign({}, data, { password: data.password })
  return fetch<Response<string>>({
    url: '/api/v1/system/auth/update',
    method: 'post',
    data: _data,
  })
}

export interface InvitationParams {
  total: number | string //限制人数
  remark: string //备注
}

