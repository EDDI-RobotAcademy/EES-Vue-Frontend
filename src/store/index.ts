import { createStore } from 'vuex'

import reviewModule from "@/review/store/reviewModule"
import authenticationModule from '@/authentication/store/authenticationModule'
import productModule from "@/product/store/productModule"
import accountModule from '@/account/store/accountModule'
import boardModule from '@/board/store/boardModule'

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
    authenticationModule,
    productModule,
    accountModule,
    boardModule,
  }
})