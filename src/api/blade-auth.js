import request from '@/utils/request'

/**
 * @param parameter
 * @returns {*}
 */
export function ApiLogin (parameter) {
  return request({
    url: '/blade-auth/token',
    method: 'post',
    data: parameter
  })
}
export function ApiLogout () {
  return request({
    url: '/blade-auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
