// 用户 接口请求文档
import request from '@/utils/request'
/**
 * 登录
 * @param {String} mobile 手机号
 * @param {Number} code 手机号
 * @return Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
