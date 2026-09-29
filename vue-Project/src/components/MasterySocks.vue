<script setup>
import { computed, ref } from 'vue'

const socks = ref([
  { id: 'green', color: 'Xanh lá', hex: '#079321', stock: 4, inCart: 0, price: 2.99, image: '/images/socks-green.png' },
  { id: 'blue', color: 'Xanh dương', hex: '#123be8', stock: 4, inCart: 0, price: 2.99, image: '/images/socks-blue.png' },
  { id: 'red', color: 'Đỏ', hex: '#ed1010', stock: 2, inCart: 0, price: 3.5, image: '/images/socks-green.png', filter: 'hue-rotate(231deg) saturate(1.2)' },
  { id: 'brown', color: 'Nâu đỏ', hex: '#a52f36', stock: 2, inCart: 0, price: 3.5, image: '/images/socks-green.png', filter: 'hue-rotate(226deg) saturate(.8) brightness(.85)' },
  { id: 'purple', color: 'Tím', hex: '#82008d', stock: 2, inCart: 0, price: 2.99, image: '/images/socks-green.png', filter: 'hue-rotate(165deg) saturate(1.2)' },
])

const selectedSockId = ref('green')
const previewSockId = ref(null)
const selectedSock = computed(() => socks.value.find(sock => sock.id === selectedSockId.value))
const displayedSock = computed(() => socks.value.find(sock => sock.id === (previewSockId.value || selectedSockId.value)))
const title = computed(() => 'Vue Mastery Socks')
const inStock = computed(() => selectedSock.value.stock > 0)
const sale = computed(() => true)
const cartCount = computed(() => socks.value.reduce((total, sock) => total + sock.inCart, 0))
const cartTotal = computed(() => socks.value.reduce((total, sock) => total + sock.inCart * sock.price, 0))
const cartOpen = ref(false)
const imageFilter = computed(() => displayedSock.value.filter || 'none')

function addToCart() {
  if (!inStock.value) return
  selectedSock.value.stock -= 1
  selectedSock.value.inCart += 1
}

function removeFromCart() {
  if (selectedSock.value.inCart === 0) return
  selectedSock.value.inCart -= 1
  selectedSock.value.stock += 1
}

function removeSockFromCart(sock) {
  sock.stock += sock.inCart
  sock.inCart = 0
}
</script>

<template>
  <main class="sock-shop">
    <div class="top-bar" aria-hidden="true"></div>
    <button class="cart-count" aria-live="polite" @click="cartOpen = true">Cart ({{ cartCount }})</button>

    <section class="product">
      <div class="image-frame">
        <img :src="displayedSock.image" :alt="`${title} màu ${displayedSock.color}`" :style="{ filter: imageFilter }" />
      </div>

      <div class="details">
        <h1>{{ title }}</h1>
        <p class="description">{{ title }} <span v-if="sale">đang giảm giá.</span></p>
        <p class="stock" :class="{ 'out-of-stock': displayedSock.stock === 0 }">
          <template v-if="displayedSock.stock === 0">Out of stock 😟</template>
          <template v-else-if="displayedSock.stock <= 2">Almost sold out, only {{ displayedSock.stock }} items are available!</template>
          <template v-else>In Stock: {{ displayedSock.stock }}</template>
        </p>

        <ul class="materials" aria-label="Thành phần">
          <li v-for="material in ['80% cotton', '20% Polyester', 'Gender Neutral', 'One Size']" :key="material">
            {{ material }}
          </li>
        </ul>

        <div class="swatches" aria-label="Chọn màu tất">
          <button
            v-for="sock in socks"
            :key="sock.id"
            class="swatch"
            :class="{ selected: selectedSockId === sock.id }"
            :style="{ backgroundColor: sock.hex }"
            :aria-label="`Chọn màu ${sock.color}`"
            :aria-pressed="selectedSockId === sock.id"
            @mouseenter="previewSockId = sock.id"
            @mouseleave="previewSockId = null"
            @focus="previewSockId = sock.id"
            @blur="previewSockId = null"
            @click="selectedSockId = sock.id"
          />
        </div>

        <button class="action-button add-button" :disabled="!inStock" @click="addToCart">Add to Cart</button>
      </div>
    </section>

    <div v-if="cartOpen" class="modal-backdrop" @click.self="cartOpen = false">
      <section class="cart-modal" role="dialog" aria-modal="true" aria-label="Your Cart">
        <header class="cart-header"><h2>Your Cart</h2><button class="close-button" aria-label="Close cart" @click="cartOpen = false">×</button></header>
        <p v-if="cartCount === 0" class="empty-cart">Your cart is empty.</p>
        <div v-else class="cart-items">
          <article v-for="sock in socks.filter(item => item.inCart > 0)" :key="sock.id" class="cart-item">
            <img :src="sock.image" :alt="`Socks – ${sock.color}`" :style="{ filter: sock.filter || 'none' }" />
            <div class="cart-item-info"><strong>Socks – {{ sock.color }}</strong><span>Price: ${{ sock.price.toFixed(2) }} | Qty: {{ sock.inCart }}</span></div>
            <button class="remove-button" @click="removeSockFromCart(sock)">Remove</button>
          </article>
        </div>
        <footer class="cart-footer"><strong>Total: ${{ cartTotal.toFixed(2) }}</strong><button class="close-cart" @click="cartOpen = false">Close</button><button class="checkout" :disabled="cartCount === 0">Checkout</button></footer>
      </section>
    </div>
  </main>
</template>

<style scoped>
.sock-shop { min-height: 100vh; background: #fff; color: #292929; font-family: Arial, sans-serif; position: relative; }
.top-bar { height: 16px; background: linear-gradient(90deg, #16b7a5, #74c95a); }
.cart-count { position: absolute; top: 32px; right: 30px; padding: 10px 17px; background: white; font-size: 14px; border: 1px solid #ddd; cursor: pointer; }
.product { max-width: 1120px; margin: 52px auto; padding: 0 28px; display: grid; grid-template-columns: minmax(280px, 390px) 1fr; gap: 68px; align-items: start; }
.image-frame { padding: 14px; border: 1px solid #ddd; background: #fff; box-shadow: 0 0 0 5px #eee; }
.image-frame img { display: block; width: 100%; aspect-ratio: 1; object-fit: contain; }
.details h1 { margin: -8px 0 20px; font-size: clamp(32px, 5vw, 48px); }
.description, .stock { font-size: 17px; }
.stock { margin: 20px 0 22px; color: #707b81; }
.out-of-stock { color: #bd3029; }
.materials { margin: 14px 0 12px 24px; padding: 0; list-style: none; line-height: 1.25; }
.swatches { display: flex; flex-direction: row; gap: 13px; align-items: center; margin-top: 30px; }
.swatch { width: 48px; height: 48px; border: 0; border-radius: 50%; cursor: pointer; }
.swatch.selected { outline: 3px solid #fff; box-shadow: 0 0 0 2px #555; }
.add-button { min-width: 148px; min-height: 48px; padding: 10px 18px; border: 0; border-radius: 5px; background: #087ce5; color: #fff; font-size: 16px; cursor: pointer; margin-left: 8px; }
.add-button:disabled { background: #9aa1a6; color: #fff; cursor: not-allowed; }
.modal-backdrop { position: fixed; inset: 0; z-index: 5; display: grid; place-items: center; background: #0005; }
.cart-modal { width: min(920px, calc(100% - 32px)); max-height: 90vh; overflow: auto; background: white; box-shadow: 0 8px 35px #0003; }
.cart-header, .cart-footer { display: flex; align-items: center; padding: 16px 20px; border-bottom: 1px solid #e5e5e5; }
.cart-header { justify-content: space-between; }.cart-header h2 { margin: 0; font-size: 22px; font-weight: 400; }.close-button { border: 0; background: none; color: #777; font-size: 32px; cursor: pointer; }
.cart-items { padding: 18px 20px; }.cart-item { min-height: 76px; display: flex; align-items: center; gap: 18px; border: 1px solid #eee; padding: 8px 18px; }.cart-item + .cart-item { border-top: 0; }.cart-item img { width: 52px; height: 58px; object-fit: contain; }.cart-item-info { display: grid; gap: 8px; flex: 1; }.remove-button { border: 0; border-radius: 4px; background: #dc3545; color: white; padding: 9px 14px; cursor: pointer; }.empty-cart { padding: 18px 20px; }
.cart-footer { gap: 16px; justify-content: flex-end; border-top: 1px solid #eee; border-bottom: 0; }.cart-footer strong { margin-right: auto; font-size: 20px; font-weight: 400; }.close-cart, .checkout { border: 0; border-radius: 4px; padding: 10px 16px; color: white; background: #6c757d; cursor: pointer; }.checkout { background: #087ce5; }.checkout:disabled { opacity: .55; cursor: not-allowed; }
@media (max-width: 700px) { .product { grid-template-columns: 1fr; gap: 34px; margin-top: 48px; } .image-frame { max-width: 390px; } .cart-count { top: 24px; right: 16px; } .swatches { flex-wrap: wrap; } .cart-footer { flex-wrap: wrap; } }
</style>
