<script setup>
import { RouterLink } from 'vue-router'
import { products } from '../stores/shop'
</script>

<template>
  <main class="home-page">
    <h1>Tea Shop</h1>
    <section class="products-grid">
      <article v-for="product in products" :key="product.id" class="product-card">
        <RouterLink :to="`/product/${product.id}`" class="product-photo"><img :src="product.image" :alt="product.name" /></RouterLink>
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <RouterLink :to="`/product/${product.id}`" class="button button-primary">View Details</RouterLink>
      </article>
    </section>
  </main>
</template>
