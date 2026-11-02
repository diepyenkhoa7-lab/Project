<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { products, useShopStore } from '../stores/shop'

const route = useRoute()
const shop = useShopStore()
const product = computed(() => products.find((item) => item.id === Number(route.params.id)))
</script>

<template>
  <main v-if="product" class="detail-page">
    <div class="breadcrumbs"><RouterLink to="/">Thực đơn</RouterLink><span>/</span><span>{{ product.name }}</span></div>
    <section class="detail-layout">
      <div class="detail-image" :class="`tone-${product.tone}`"><span class="detail-stamp">PHA BẰNG<br />CẢ TẤM LÒNG <b>✳</b></span><img :src="product.image" :alt="product.name" /></div>
      <div class="detail-copy"><span class="eyebrow">{{ product.category }} · MÂY COFFEE</span><h1>{{ product.name }}<span class="heading-period">.</span></h1><p class="detail-subtitle">{{ product.subtitle }}</p><p class="detail-description">{{ product.description }} Được pha mới mỗi ngày với nguyên liệu chọn lọc, dành cho những phút nghỉ ngơi thật trọn vẹn của bạn.</p><div class="detail-price">{{ product.price.toLocaleString('vi-VN') }}<small>đ</small></div><button class="button button-dark detail-add" @click="shop.addToCart(product)">Thêm vào giỏ hàng <span>↗</span></button><p class="detail-footnote">✳ &nbsp;Pha tươi sau khi bạn đặt món</p></div>
    </section>
  </main>
  <main v-else class="empty-state"><span class="eyebrow">MÂY COFFEE</span><h1>Chưa tìm thấy món này.</h1><RouterLink class="button button-dark" to="/">Về thực đơn ↗</RouterLink></main>
</template>
