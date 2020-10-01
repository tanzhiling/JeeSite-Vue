import { BasicLayout, BlankLayout, PageView } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '主页' },
    redirect: '/sys-organization',
    children: [
      {
        path: '/sys-organization',
        name: 'sysOrganization',
        redirect: '/sys-organization/user',
        component: PageView,
        meta: { title: '组织管理', keepAlive: true, icon: 'appstore' },
        children: [
          {
            path: '/sys-organization/user',
            name: 'sysOrganizationUser',
            component: () => import('@/views/sys/organization/User'),
            meta: { title: '用户管理', keepAlive: true }
          },
          {
            path: '/sys-organization/office',
            name: 'sysOrganizationOffice',
            redirect: '/sys-organization/office/index',
            component: RouteView,
            meta: { title: '机构管理', keepAlive: true },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/sys-organization/office/index',
                name: 'sysOrganizationOfficeIndex',
                component: () => import('@/views/sys/organization/office/Index'),
                meta: { title: '机构列表', hidden: true }
              },
              {
                path: '/sys-organization/office/add',
                name: 'sysOrganizationOfficeAdd',
                component: () => import('@/views/sys/organization/office/Add'),
                meta: { title: '新增机构', hidden: true }
              }
            ]
          },
          {
            path: '/sys-organization/company',
            name: 'sysOrganizationCompany',
            component: () => import('@/views/sys/organization/Company'),
            meta: { title: '公司管理', keepAlive: true }
          },
          {
            path: '/sys-organization/post',
            name: 'sysOrganizationPost',
            component: () => import('@/views/sys/organization/Post'),
            meta: { title: '岗位管理', keepAlive: true }
          }
        ]
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: BlankLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
