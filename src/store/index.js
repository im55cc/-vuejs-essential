import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'
// 引入 actions.js 的所有导出
import * as moreActions from './actions'
import * as moreGetters from './getters'
Vue.use(Vuex)

const state = {
    user: ls.getItem('user'),
    auth: ls.getItem('auth'),
    articles: ls.getItem('articles')
}

const mutations = {
    UPDATE_USER(state, user) {
        state.user = user
        ls.setItem('user', user)
    },
    // 添加 UPDATE_AUTH 来更改当前用户的登录状态
    UPDATE_AUTH(state, auth) {
        state.auth = auth
        ls.setItem('auth', auth)
    },
    // 更改所有文章的事件类型
    // 更改所有文章的事件类型
    UPDATE_ARTICLES(state, articles) {
        state.articles = articles
        ls.setItem('articles', articles)
    }
}

const actions = {
    login({ commit }, user) {
        if (user) commit('UPDATE_USER', user)
        // 更新当前用户的登录状态为已登录
        commit('UPDATE_AUTH', true)
        router.push('/')
    },
    logout({ commit }) {
        commit('UPDATE_AUTH', false)
        router.push({ name: 'Home', params: { logout: true } })
    },
    updateUser({ state, commit }, user) {
        const stateUser = state.user // 获取仓库的个人信息

        if (stateUser && typeof stateUser === 'object') { // 简单的类型判断
            user = { ...stateUser, ...user } //合并新旧个人信息， 等于 user = Object.assign({}, stateUser,user)
        }
        // 更新个人信息
        commit('UPDATE_USER', user)
    },
    // 使用对象展开运算符混入 moreActions
    ...moreActions
}

// 添加 getters
const getters = {
    // 第一个参数是 state ,因为要传 id，所以这里返回一个函数
    getArticleById: (state) => (id) => {
        // 从仓库获取所有文章 let articles = state.articles
        // 使用派生状态 computedArticles 作为所有文章
        let articles = getters.computedArticles
        // 所有文章是一个数组时
        if (Array.isArray(articles)) {
            articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
            return articles.length ? articles[0] : null
        } else {
            return null
        }
    },
    // 混入 moreGetters, 你可以理解为 getters = Object.assign(getters, moreGetters)
    ...moreGetters
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store