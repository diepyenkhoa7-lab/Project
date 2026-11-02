<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useShopStore } from './stores/shop'

const shop = useShopStore()
</script>

<template>
  <div class="app-shell">
    <header class="navbar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/cart" class="cart-link">Cart<span v-if="shop.cartCount" class="cart-badge">{{ shop.cartCount }}</span></RouterLink>
    </header>
    <RouterView />
  </div>
</template>
