import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
      if (store.getters['user/auth/isAuth']) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    } else {
      next()
    }
    if (to.matched.some(record => record.meta.unAuth)) {
      if (store.getters['user/auth/isAuth']) {
        next({
          path: '/ride'
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
  return Router
}
