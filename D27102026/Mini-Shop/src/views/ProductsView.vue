<script setup>
import { RouterLink } from 'vue-router'
import { products } from '../stores/shop'
</script>

<template>
  <main class="product-list">
    <article v-for="product in products" :key="product.id" class="product-card">
      <RouterLink :to="`/product/${product.id}`" class="product-image"><img :src="product.image" :alt="product.name" /></RouterLink>
      <RouterLink :to="`/product/${product.id}`" class="product-name">{{ product.name }}</RouterLink>
      <p>{{ product.subtitle }}</p>
      <span class="price">${{ (product.price / 1000).toFixed(2) }}</span>
    </article>
  </main>
</template>
