<script setup>
import { computed } from 'vue'
import { products } from './products.js'

const props = defineProps({
  mode: {
    type: String,
    default: 'catalog',
    validator: (value) => ['catalog', 'detail'].includes(value),
  },
  search: {
    type: String,
    default: '',
  },
  product: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['view', 'add', 'back', 'open-cart'])

const visibleProducts = computed(() => {
  const searchTerm = props.search.trim().toLocaleLowerCase('vi')

  return products.filter((product) =>
    product.name.toLocaleLowerCase('vi').includes(searchTerm),
  )
})

function formatPrice(price) {
  return `${price.toLocaleString('vi-VN')} đ`
}

function showProduct(productId) {
  emit('view', productId)
}

function addProductToCart(product) {
  emit('add', product)

  if (props.mode === 'detail') {
    emit('open-cart')
  }
}
</script>

<template>
  <main v-if="mode === 'catalog'" class="home-page container">
    <section class="catalog-intro">
      <div>
        <p class="eyebrow">MY STORE · BỘ SƯU TẬP 2026</p>
        <h1 class="page-title">Khám phá sản phẩm</h1>
        <p class="catalog-subtitle">
          Chọn món đồ phù hợp với phong cách và nhu cầu của bạn.
        </p>
      </div>

      <div class="catalog-count">
        <strong>{{ visibleProducts.length }}</strong>
        <span>sản phẩm</span>
      </div>
    </section>

    <section id="catalog" class="catalog-section" aria-label="Danh sách sản phẩm">
      <div v-if="visibleProducts.length" class="product-grid">
        <article
          v-for="(product, index) in visibleProducts"
          :key="product.id"
          class="product-card"
        >
          <button
            type="button"
            class="product-image-link"
            :aria-label="`Xem ${product.name}`"
            @click="showProduct(product.id)"
          >
            <span v-if="product.tag" class="product-tag">{{ product.tag }}</span>
            <span class="product-number">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div class="product-image">
              <img :src="product.image" :alt="product.name" loading="lazy" />
            </div>
          </button>

          <div class="product-info">
            <span class="product-category">{{ product.category }}</span>
            <h2 class="product-card-title">{{ product.name }}</h2>
            <span class="product-price">{{ formatPrice(product.price) }}</span>

            <div class="product-actions">
              <button
                type="button"
                class="button button-primary"
                @click="addProductToCart(product)"
              >
                Thêm vào giỏ
              </button>
              <button
                type="button"
                class="button button-secondary"
                @click="showProduct(product.id)"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="no-results">
        <strong>Chưa tìm thấy sản phẩm</strong>
        <span>Thử tìm bằng một tên khác nhé.</span>
      </div>
    </section>
  </main>

  <main v-else-if="product" class="detail-page">
    <nav class="breadcrumb" aria-label="Đường dẫn">
      <button type="button" @click="emit('back')">Cửa hàng</button>
      <span aria-hidden="true">／</span>
      <span>{{ product.name }}</span>
    </nav>

    <section class="detail-layout" aria-label="Thông tin sản phẩm">
      <div class="detail-gallery">
        <span v-if="product.tag" class="product-tag">{{ product.tag }}</span>
        <img :src="product.image" :alt="product.name" />
      </div>

      <div class="detail-copy">
        <p class="eyebrow">{{ product.category }} · MY STORE</p>
        <h1>{{ product.name }}</h1>
        <p class="detail-price">{{ formatPrice(product.price) }}</p>
        <div class="detail-divider"></div>
        <h2 class="detail-label">Thông tin sản phẩm</h2>
        <p class="detail-description">{{ product.description }}</p>

        <button
          type="button"
          class="detail-add button button-primary"
          @click="addProductToCart(product)"
        >
          Thêm vào giỏ hàng
          <span aria-hidden="true">→</span>
        </button>
        <p class="detail-note">
          Sản phẩm sẽ được cập nhật ngay trong giỏ hàng của bạn.
        </p>
      </div>
    </section>

    <button type="button" class="back-link" @click="emit('back')">
      ← Quay lại cửa hàng
    </button>
  </main>
</template>
