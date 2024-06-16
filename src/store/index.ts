import { createStore } from 'vuex'
import reviewModule from "@/review/store/reviewModule"
import authenticationModule from '@/authentication/store/authenticationModule'

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
  }
})