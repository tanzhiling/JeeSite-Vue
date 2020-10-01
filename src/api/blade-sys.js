import request from '@/utils/request'

export function ApiGetSysOfficeTree (params) {
  return request({ url: '/blade-sys/office/tree', method: 'get', params })
}

export function ApiGetSysOfficeList (params) {
  return request({ url: '/blade-sys/office/list', method: 'get', params })
}
