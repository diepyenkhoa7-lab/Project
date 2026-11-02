<script setup>
import { useShopStore } from '../stores/shop'

const shop = useShopStore()
const money = (amount) => `$${(amount / 1000).toFixed(2)}`
</script>

<template>
  <main class="cart-page">
    <h1>Shopping Cart</h1>
    <section v-if="shop.cart.length" class="cart-list">
      <article v-for="item in shop.cart" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" />
        <div class="quantity-control"><button :aria-label="`Giảm ${item.name}`" @click="shop.changeQuantity(item.id, -1)">-</button><span>{{ item.quantity }}</span><button :aria-label="`Tăng ${item.name}`" @click="shop.changeQuantity(item.id, 1)">+</button></div>
        <div class="cart-description"><strong>{{ item.name }}</strong><p>{{ money(item.price) }}</p><p>Total: <b>{{ money(item.price * item.quantity) }}</b></p><button class="remove-button" @click="shop.removeFromCart(item.id)">Remove</button></div>
      </article>
      <div class="cart-total">Grand Total: {{ money(shop.grandTotal) }}</div>
      <button class="clear-button" @click="shop.clearCart()">Clear Cart</button>
    </section>
    <p v-else class="empty-cart">Your cart is empty.</p>
  </main>
</template>
