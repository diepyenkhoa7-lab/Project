<script setup>
import { useShopStore } from '../stores/shop'

const shop = useShopStore()
const money = (value) => `${value.toLocaleString('vi-VN')} đ`
</script>

<template>
  <main class="cart-panel">
    <h1>Shopping Cart</h1>
    <div v-if="shop.cart.length" class="table-wrap">
      <table>
        <thead><tr><th>Image</th><th>Product Name</th><th>Size</th><th>Quantity</th><th>Price</th><th>Total</th><th>Actions</th></tr></thead>
        <tbody>
          <tr v-for="item in shop.cart" :key="`${item.id}-${item.size}`">
            <td><img class="cart-image" :src="item.image" :alt="item.name" /></td>
            <td>{{ item.name }}</td><td>{{ item.size }}</td><td>{{ item.quantity }}</td><td>{{ money(item.price) }}</td><td>{{ money(item.price * item.quantity) }}</td>
            <td><button class="button button-primary" @click="shop.removeFromCart(item.id, item.size)">Remove</button></td>
          </tr>
        </tbody>
        <tfoot><tr><th colspan="5">Total:</th><td colspan="2">{{ money(shop.grandTotal) }}</td></tr></tfoot>
      </table>
      <button class="button button-danger" @click="shop.clearCart()">Clear Cart</button>
    </div>
    <p v-else class="empty-cart">Your cart is empty.</p>
  </main>
</template>
