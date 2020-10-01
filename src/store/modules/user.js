import storage from 'store'
import { ApiLogin, ApiLogout } from '@/api/blade-auth'
import { ApiGetInfo } from '@/api/blade-base'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  namespaced: true,
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name }) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    async login ({ commit }, { payload }) {
      const { data } = await ApiLogin(payload)
      storage.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000)
      commit('SET_TOKEN', data.token)
    },
    // 获取用户信息
    getInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        ApiGetInfo()
          .then(response => {
            const data = response.data
            if (data.role && data.role.permissions.length > 0) {
              const role = data.role
              role.permissions = data.role.permissions
              role.permissions.map(per => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map(action => {
                    return action.action
                  })
                  per.actionList = action
                }
              })
              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId
              })
              commit('SET_ROLES', data.role)
              commit('SET_INFO', data)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }
            commit('SET_NAME', { name: data.name })
            commit('SET_AVATAR', data.avatar)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    async logout ({ commit, state }) {
      const { success } = await ApiLogout(state.token)
      if (success) {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        storage.remove(ACCESS_TOKEN)
      }
    }
  }
}

export default user
