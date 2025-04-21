import { fetch, Response } from '@/lib/axios'

export interface LoginRes {
  force: boolean // true:当前用户已在线
  reset: boolean // true:需要强制修改密码
  hash: string // 首次登录或强制登录的校验
  token: string
  redirect: string
  mobile: string
}
export const login = (params: Record<string, any>) => {
  return fetch<Response<LoginRes>>({
    url: '/api/v1/system/auth/login',
    method: 'post',
    data: {
      account: params.account,
      mobile: params.mobile,
      password: params.password,
      captcha: params.captcha,
      hash: params.hash,
    },
  })
}
export interface CaptchaRes {
  base64: string
  hash: string
}

export const getCaptcha = () =>
  fetch<Response<CaptchaRes>>({
    url: '/api/v1/system/auth/captcha',
    method: 'get',
  })

export const logout = () =>
  fetch<Response<any>>({
    url: '/api/v1/system/auth/logout',
    method: 'delete',
  })

export interface changePasswordReq {
  oldPassword: string
  newPassword: string
}

// 修改密码
export const changePassword = (params: changePasswordReq) => {
  return fetch({
    url: '/api/system/v1/user_center/password',
    method: 'put',
    data: {
      oldPassword: params.oldPassword,
      newPassword: params.newPassword,
    },
  })
}

export interface firstEditPwdReq extends changePasswordReq {
  hash: string
  name: string
  captcha: string
}

// 首次登录修改密码
export const firstEditPwd = (data: firstEditPwdReq) => {
  const encrypt = setEncrypt(
    { oldPassword: data.oldPassword, newPassword: data.newPassword },
    ['oldPassword', 'newPassword']
  )
  return fetch({
    headers: { Times: encrypt.timestamp, hash: data.hash },
    url: '/api/system/v1/auth/password',
    method: 'put',
    data: {
      name: data.name,
      captcha: data.captcha,
      oldPassword: encrypt.oldPassword,
      newPassword: encrypt.newPassword,
    },
  })
}

// 注册-STEP1 校验邀请码 & 手机号 有效性
export const authVerify = (params: { invitation: string; mobile: string }) =>
  fetch<Response<string>>({
    url: '/api/v1/system/auth/verify',
    method: 'get',
    params,
  })

export interface authRegisterReq {
  captcha: string // 短信验证码
  hash: string // 验证码编号
  invitation: string // 邀请码
  mobile: string // 手机号
  password: string // 密码
  name: string // 姓名
  checkPassword?: string // 确认密码
}

export interface authRegisterRes {
  reset: string
  token: string
}

// 注册
export const authRegister = (data: authRegisterReq) => {
  const encrypt = setEncrypt({ password: data.password })
  const _data = Object.assign({}, data, { password: encrypt.password })
  return fetch<Response<authRegisterRes>>({
    headers: {
      Times: encrypt.timestamp,
    },
    url: '/api/v1/system/auth/register',
    method: 'post',
    data: _data,
  })
}

export interface authSmsReq {
  purpose?: number
  hash?: string
  mobile: string
}

// 短信码
export const authSms = (params: authSmsReq) =>
  fetch<Response<string>>({
    url: '/api/v1/system/auth/sms',
    method: 'get',
    params,
  })

// 获取二维码
export const getQrCode = (source) =>
  fetch<Response<CaptchaRes>>({
    url: `/api/v1/system/auth/qrcode/${source}`,
    method: 'get',
  })

// 获取二维码
export const getScanStatus = (params: { hash: string }) =>
  fetch<Response<{ status: number; result: LoginRes }>>({
    url: '/api/v1/system/auth/qrcode/status',
    method: 'get',
    params,
  })

export const ScanCallback = (params: { code: string }, source = 3) =>
  fetch<Response<{ status: number; result: LoginRes }>>({
    url: `/api/v1/system/auth/qrcode/callback/${source}`,
    method: 'get',
    params: {
      ...params,
    },
  })

// 信息不全
export const authCompletion = (data: authRegisterReq) => {
  const encrypt = setEncrypt({ password: data.password })
  const _data = Object.assign({}, data, { password: encrypt.password })
  return fetch<Response<authRegisterRes>>({
    headers: {
      Times: encrypt.timestamp,
    },
    url: '/api/v1/system/auth/completion',
    method: 'post',
    data: _data,
  })
}

// 凭证登录
export const authSign = (data: { sign: string }) =>
  fetch<Response<string>>({
    url: `/api/v1/system/auth/sign?sign=${data.sign}`,
    method: 'post',
  })
