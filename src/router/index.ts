// @/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
export const routes = [
  { path: '/',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: {
      needAuth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: {
      needAuth: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/index.vue'),
    meta: {
      needAuth: false,
    },
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/personal/index.vue'),
    meta: {
      needAuth: false,
    },
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('../views/statistics/index.vue'),
    meta: {
      needAuth: false,
      title: '数据总览'
    },
  },
  {
    path: '/system/user',
    name: 'user',
    component: () => import('../views/system/user/index.vue'),
    meta: {
      needAuth: false,
      title: '用户管理'
    },
  },
  {
    path: '/system/task',
    name: 'task',
    component: () => import('../views/system/task/index.vue'),
    meta: {
      needAuth: false,
      title: '任务管理'
    },
  },
  {
    path: '/system/event',
    name: 'event',
    component: () => import('../views/system/event/index.vue'),
    meta: {
      needAuth: false,
      title: '赛事管理'
    },
  },
  {
    path: '/system/event/detail',
    name: 'eventDetail',
    component: () => import('../views/system/event/detail.vue'),
    meta: {
      needAuth: false,
      title: '赛事动态'
    },
  },
  {
    path: '/system/feedback',
    name: 'feedback',
    component: () => import('../views/system/feedback/index.vue'),
    meta: {
      needAuth: false,
      title: '反馈管理'
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/expect',
  },
  {
    path: '/expect',
    name: 'expect',
    component: () => import('../views/error/expect.vue'),
    meta: {
      needAuth: true,
    },
  },
]

const getComponentsUrl = import.meta.glob('../views/*/**/*.vue')
// 生成动态路径的路由列表
export const getComponent = (data: any) => {
  data.map((item: any) => {
    // 兼容无权限页面
    item.path = item.route === '/expect' ? '' : item.route
    if (item.path && getComponentsUrl[`../views${item.path}/index.vue`]) {
      item.component = getComponentsUrl[`../views${item.path}/index.vue`]
    } else if (
      item.path &&
      !getComponentsUrl[`../views${item.path}/index.vue`]
    ) {
      item.component = getComponentsUrl[`../views/micro/index.vue`]
    } else if (item.children && item.children.length > 0) {
      item.component = getComponentsUrl[`RouterView/index.vue`]
    } else {
      item.component = getComponentsUrl[`../views/error/expect.vue`]
    }
    if (!routes.filter((i) => i.path === item.path)?.length) {
      item.meta = {
        title: item.name,
        code: item.code,
        parentId: item.parentId,
        layout: true,
        showBreadcrumd: false,
        needAuth: true,
      }
    } else {
      item.meta = routes.filter((i) => i.path === item.path)[0].meta
    }
    if (item.children && item.children.length) {
      getComponent(item.children)
    }
  })
  return data
}

export const menuRecusion = (tree: any) => {
  return tree.reduce((res, item) => {
    const { children, ...i } = item
    return res.concat(
      i,
      children && children.length ? menuRecusion(children) : []
    )
  }, [])
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
