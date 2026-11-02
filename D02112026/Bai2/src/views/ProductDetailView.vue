<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { products, useShopStore } from '../stores/shop'

const route = useRoute()
const shop = useShopStore()
const product = computed(() => products.find((item) => item.id === Number(route.params.id)))
const selectedSize = ref('S')
const added = ref(false)

function addProduct() {
  shop.addToCart(product.value, selectedSize.value)
  added.value = true
  window.setTimeout(() => { added.value = false }, 1600)
}
</script>

<template>
  <main v-if="product" class="detail-card">
    <img class="detail-image" :src="product.image" :alt="product.name" />
    <h1>{{ product.name }}</h1>
    <p class="detail-description">{{ product.description }}</p>
    <div class="size-options" aria-label="Chọn size">
      <button v-for="size in ['S', 'M', 'L']" :key="size" :class="{ selected: selectedSize === size }" @click="selectedSize = size">{{ size }}</button>
    </div>
    <p class="detail-price">Price: <strong>{{ product.prices[selectedSize].toLocaleString('vi-VN') }} đ</strong></p>
    <section class="product-details">
      <h2>Product Details</h2>
      <p><b>Ingredients:</b> {{ product.ingredients }}</p>
      <p><b>Delivery Time:</b> {{ product.deliveryTime }}</p>
      <p><b>Rating:</b> <span class="rating">{{ product.rating }}</span></p>
    </section>
    <button class="button button-success" @click="addProduct">{{ added ? 'Added to Cart ✓' : 'Add to Cart' }}</button>
  </main>
  <main v-else class="not-found"><h1>Không tìm thấy sản phẩm</h1><RouterLink to="/">Quay lại Tea Shop</RouterLink></main>
</template>
