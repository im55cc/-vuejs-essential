import MessageComponent from '../components/Message'

export default {
    // 插件的公开方法 install
    install: (Vue) => {
        // 使用 Vue.extend 基于我们传入的组件生成一个新的子类
        const Message = Vue.extend(MessageComponent)
        // new 一个新的实例
        const vm = new Message()
        // 挂在实例后返回实例目标
        const $el = vm.$mount().$el

        Vue.nextTick(() => {
            // 在下一次 DOM 更新后，将实例添加到 #main-container 元素内部的前面
            document.querySelector('#main-container').prepend($el)
        })
        // 监听 show 值的改变
        vm.$on('update:show', (value) => {
            // 更改当前的 show 值
            vm.show = value
        })
        // 添加 show 和 hide 方法来显示和关闭提示框
        const message = {
            // 更改消息并显示提示框，其逻辑跟我们之前写的 showMsg 一模一样
            show(msg = '', type = 'success') {
                vm.msg = msg
                vm.type = type
                vm.show = false

                Vue.nextTick(() => {
                    vm.show = true
                })
            },
            hide() {
                Vue.nextTick(() => {
                    vm.show = false
                })
            }
        }
        // 添加实例方法
        Vue.prototype.$message = message
    }
}