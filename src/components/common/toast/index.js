import Toast from './Toast.vue'
const toast = {}

toast.install = function (Vue) {
  //创建组件构造器
  const ToastContrcstor = Vue.extend(Toast)
  //new出来一个组件对象
  const toast = new ToastContrcstor()
  //将组件对象手动挂载到元素上
  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default toast;