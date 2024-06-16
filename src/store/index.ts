import { createStore } from 'vuex'
import reviewModule from "@/review/store/reviewModule"
import productModule from "@/product/store/productModule"

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    reviewModule,
    productModule,
  }
})