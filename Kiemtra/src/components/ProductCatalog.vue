<script setup>
// Nhận danh sách đã lọc và dữ liệu bộ lọc từ component cha.
defineProps(['products', 'categories', 'search', 'category', 'money'])

// Gửi thay đổi tìm kiếm, danh mục hoặc thao tác mua lên component cha.
const emit = defineEmits(['update:search', 'update:category', 'add'])
</script>

<template>
  <!-- Bộ lọc và danh sách sản phẩm -->
  <section class="panel">
    <h2>Sản phẩm</h2>
    <div class="filters">
      <input class="search" :value="search" placeholder="Tìm sản phẩm" @input="emit('update:search', $event.target.value)" />
      <div class="categories">
        <button v-for="item in categories" :key="item" :class="{ active: category === item }" @click="emit('update:category', item)">{{ item }}</button>
      </div>
    </div>
    <div v-if="products.length" class="products">
      <!-- Hiển thị một thẻ cho mỗi sản phẩm -->
      <article v-for="product in products" :key="product.id" class="product">
        <h3>{{ product.name }}</h3>
        <div class="product-bottom"><span class="muted">{{ product.category }} · Tồn: {{ product.stock }}</span><b>{{ money(product.price) }}</b></div>
        <button class="buy" :disabled="product.stock === 0" @click="emit('add', product)">Chọn mua</button>
      </article>
    </div>
    <p v-else>Không tìm thấy sản phẩm.</p>
  </section>
</template>
