<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import StoreHeader from './components/StoreHeader.vue'

const router = useRouter()
const cart = ref([])
const search = ref('')
const cartCount = computed(() =>
  cart.value.reduce((count, item) => count + item.quantity, 0),
)
const cartTotal = computed(() =>
  cart.value.reduce((total, item) => total + item.price * item.quantity, 0),
)
function showProduct(id) {
  router.push({ name: 'product-detail', params: { id } })
}

function showHome() {
  router.push({ name: 'home' })
}

function addToCart(product) {
  const cartItem = cart.value.find((item) => item.id === product.id)

  if (cartItem) {
    cartItem.quantity += 1
    return
  }

  cart.value.push({ ...product, quantity: 1 })
}

function changeQuantity(productId, changeBy) {
  const cartItem = cart.value.find((item) => item.id === productId)
  if (!cartItem) return

  cartItem.quantity += changeBy
  if (cartItem.quantity <= 0) removeItem(productId)
}

function removeItem(productId) {
  cart.value = cart.value.filter((item) => item.id !== productId)
}

function clearCart() {
  cart.value = []
}

</script>

<template>
  <div class="app-shell">
    <StoreHeader
      v-model:search="search"
      :cart-count="cartCount"
    />
    <main>
      <RouterView
        v-slot="{ Component }"
      >
        <component
          :is="Component"
          :search="search"
          @view="showProduct"
          @add="addToCart"
          :items="cart"
          :total="cartTotal"
          @change="changeQuantity"
          @remove="removeItem"
          @clear="clearCart"
          @continue-shopping="showHome"
          @open-cart="router.push({ name: 'cart' })"
        />
      </RouterView>
    </main>
    <footer class="site-footer">
      <RouterLink to="/" class="footer-brand">my<span>store</span></RouterLink>
      <span>Món đồ nhỏ, niềm vui lớn.</span>
      <span>© 2026 My Store</span>
    </footer>
  </div>
</template>
