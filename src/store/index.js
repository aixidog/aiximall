import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [],
    userInfo: {
      avatar: "http://112.124.22.145/api/static/images/profile/avatar.png",
      user: "登录/注册",
      phe: "暂无绑定手机号",
    }
  },
  mutations: {
    addCount(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.count = 1
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      // 判断是否是新插入的数据

      return new Promise((res, rej) => {
        let product = context.state.cartList.find(item => {
          return item.iid === payload.iid
        })
        // 有+1
        if (product) {
          context.commit('addCount', product)
          res('在购物车等亲~')
        } else {
          // 无push
          context.commit('addToCart', payload)
          res("商品添加成功~")
        }
      })
    }
  },
  modules: {}
})