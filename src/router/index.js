import Vue from 'vue'
import Router from 'vue-router'
// 引入 ./routes.js 的默认值
import routes from './routes'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const app = router.app
    const store = app.$options.store
    const auth = store.state.auth
    //隐藏消息
    app.$message.hide()

    if (
        (auth && to.path.indexOf('/auth/') !== -1) ||
        (!auth && to.meta.auth)
    ) {
        next('/')
    } else {
        next()
    }
})

export default router