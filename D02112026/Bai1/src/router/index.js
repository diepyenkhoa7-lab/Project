import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/ProductsView.vue') },
    { path: '/product/:id', name: 'product', component: () => import('../views/ProductDetail.vue'), props: true },
    { path: '/cart', name: 'cart', component: () => import('../views/CartView.vue') },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
