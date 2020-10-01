import request from '@/utils/request'

export function ApiGetInfo () {
  return request({
    url: '/blade-base/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
