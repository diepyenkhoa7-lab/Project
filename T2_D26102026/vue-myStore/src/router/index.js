import { createRouter, createWebHistory } from 'vue-router'
import StoreHome from '../views/StoreHome.vue'
import StoreProductDetail from '../views/StoreProductDetail.vue'
import StoreCart from '../views/StoreCart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: StoreHome,
  },
  {
    path: '/product/:id(\\d+)',
    name: 'product-detail',
    component: StoreProductDetail,
    props: true,
  },
  {
    path: '/cart',
    name: 'cart',
    component: StoreCart,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
