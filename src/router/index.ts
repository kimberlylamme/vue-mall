import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index'
import GoodsListView from '../views/goods/list'
import GoodsDetailView from '../views/goods/detail'
import MyView from '../views/my/index'
import CartView from '../views/cart/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/goods/list',
      name: 'GoodsListView',
      component: GoodsListView,
    },
    {
      path: '/goods/detail',
      name: 'GoodsDetailView',
      component: GoodsDetailView,
    },
    {
      path: '/cart',
      name: 'CartView',
      component: CartView,
    },
    {
      path: '/my',
      name: 'MyView',
      component: MyView,
    },
  ],
})

export default router
