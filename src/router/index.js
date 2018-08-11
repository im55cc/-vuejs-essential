import Vue from 'vue'
import Router from 'vue-router'
// 引入 ./routes.js 的默认值
import routes from './routes'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const auth = router.app.$options.store.state.auth

    if(auth && to.path.indexOf('/auth/') !== -1) {
        next('/')
    } else {
        next()
    }
})

export default router