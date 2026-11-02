<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useShopStore } from './stores/shop'

const shop = useShopStore()
</script>

<template>
  <div class="site-shell">
    <header class="topbar">
      <span class="brand">&nbsp;</span>
      <nav class="nav-links" aria-label="Điều hướng chính">
        <RouterLink to="/">Home</RouterLink>
      </nav>
      <RouterLink to="/cart" class="cart-link" aria-label="Mở giỏ hàng">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.3 10.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.5L22 8H7M10 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>
        <span class="cart-count">{{ shop.cartCount }}</span>
      </RouterLink>
    </header>
    <RouterView />
  </div>
</template>
