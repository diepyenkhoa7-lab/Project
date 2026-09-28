<script setup>
import { computed, ref } from 'vue'

const socks = ref([
  { id: 'green', color: 'Xanh lá', hex: '#079321', stock: 3, inCart: 0 },
  { id: 'blue', color: 'Xanh dương', hex: '#123be8', stock: 2, inCart: 0 },
])

const selectedSockId = ref('green')
const selectedSock = computed(() => socks.value.find(sock => sock.id === selectedSockId.value))
const title = computed(() => 'Vue Mastery Socks')
const inStock = computed(() => selectedSock.value.stock > 0)
const sale = computed(() => true)
const cartCount = computed(() => socks.value.reduce((total, sock) => total + sock.inCart, 0))

const image = computed(() => selectedSock.value.id === 'green'
  ? '/images/socks-green.png'
  : '/images/socks-blue.png')

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
</script>

<template>
  <main class="sock-shop">
    <div class="top-bar" aria-hidden="true"></div>
    <div class="cart-count" aria-live="polite">Cart ({{ cartCount }})</div>

    <section class="product">
      <div class="image-frame">
        <img :src="image" :alt="`${title} màu ${selectedSock.color}`" />
      </div>

      <div class="details">
        <h1>{{ title }}</h1>
        <p class="description">{{ title }} <span v-if="sale">đang giảm giá.</span></p>
        <p class="stock" :class="{ 'out-of-stock': !inStock }">
          {{ inStock ? 'Còn hàng' : 'Hết hàng' }}
        </p>

        <ul class="materials" aria-label="Thành phần">
          <li v-for="material in ['50% cotton', '30% wool', '20% polyester']" :key="material">
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
            @click="selectedSockId = sock.id"
          />
        </div>

        <div class="actions">
          <button class="action-button" :disabled="!inStock" @click="addToCart">Thêm vào giỏ</button>
          <button class="action-button" :disabled="selectedSock.inCart === 0" @click="removeFromCart">
            Xóa khỏi giỏ
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.sock-shop { min-height: 100vh; background: #f4f4f4; color: #292929; font-family: Arial, sans-serif; }
.top-bar { height: 16px; background: linear-gradient(90deg, #16b7a5, #74c95a); }
.cart-count { position: absolute; top: 32px; right: 30px; padding: 10px 17px; background: white; font-size: 14px; }
.product { max-width: 1120px; margin: 52px auto; padding: 0 28px; display: grid; grid-template-columns: minmax(280px, 390px) 1fr; gap: 68px; align-items: start; }
.image-frame { padding: 14px; border: 1px solid #ddd; background: #fff; box-shadow: 0 0 0 5px #eee; }
.image-frame img { display: block; width: 100%; aspect-ratio: 1; object-fit: contain; }
.details h1 { margin: -8px 0 20px; font-size: clamp(32px, 5vw, 48px); }
.description, .stock { font-size: 17px; }
.stock { margin: 20px 0 12px; }
.out-of-stock { color: #bd3029; }
.materials { margin: 14px 0 12px 24px; padding: 0; list-style: none; line-height: 1.25; }
.swatches { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; margin-top: 12px; }
.swatch { width: 36px; height: 36px; border: 0; border-radius: 50%; cursor: pointer; }
.swatch.selected { outline: 3px solid #fff; box-shadow: 0 0 0 2px #555; }
.actions { display: flex; gap: 24px; margin: 28px 0 0 18px; }
.action-button { min-width: 148px; min-height: 48px; padding: 10px 18px; border: 1px solid #17212c; border-radius: 4px; background: linear-gradient(#45566b, #253344); color: #fff; font-size: 15px; cursor: pointer; }
.action-button:disabled { border-color: #bbb; background: #d0d0d0; color: #fff; cursor: not-allowed; }
@media (max-width: 700px) { .product { grid-template-columns: 1fr; gap: 34px; margin-top: 48px; } .image-frame { max-width: 390px; } .cart-count { top: 24px; right: 16px; } .actions { margin-left: 0; gap: 12px; } .action-button { min-width: 0; flex: 1; } }
</style>
