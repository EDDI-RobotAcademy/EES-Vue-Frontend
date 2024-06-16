import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReviewRoutes from '@/review/router/ReviewRoutes'
import AccountRoutes from '@/account/router/AccountRoutes'
import ProductRoutes from '@/product/router/ProductRoutes'

const routes: Array<RouteRecordRaw> = [
  ...AccountRoutes,
  ...ReviewRoutes,
  ...ProductRoutes,
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router