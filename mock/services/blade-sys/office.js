import Mock from 'mockjs'
import { builder, getQueryParameters } from '../../util'
const initData = [
  { name: '济南公司', pId: 'SD', id: 'SDJN', fullName: '山东济南公司' },
  { name: '企管部', pId: 'SDJN', id: 'SDJN01', fullName: '山东济南企管部' },
  { name: '企管部', pId: 'SDQD', id: 'SDQD01', fullName: '山东青岛企管部' },
  { name: '山东公司', pId: '0', id: 'SD', fullName: '山东公司' },
  { name: '财务部', pId: 'SDJN', id: 'SDJN02', fullName: '山东济南财务部' },
  { name: '青岛公司', pId: 'SD', id: 'SDQD', fullName: '山东青岛公司' },
  { name: '财务部', pId: 'SDQD', id: 'SDQD02', fullName: '山东青岛财务部' },
  { name: '研发部', pId: 'SDJN', id: 'SDJN03', fullName: '山东济南研发部' },
  { name: '研发部', pId: 'SDQD', id: 'SDQD03', fullName: '山东青岛研发部' }
]
const tree = options => {
  return builder(initData)
}
const list = options => {
  const { pId } = getQueryParameters(options)
  const result = []
  for (let i = 0; i < initData.length; i++) {
    if (pId) {
      if (initData[i].pId === pId) {
        result.push(initData[i])
      }
    } else {
      result.push({ ...initData[i], sort: i * 10, udapteTime: '2020-09-30 11:58:58', statu: i % 2 === 0 ? 0 : 1 })
    }
  }

  return builder(result)
}
Mock.mock(/\/blade-sys\/office\/tree/, 'get', tree)
Mock.mock(/\/blade-sys\/office\/list/, 'get', list)
