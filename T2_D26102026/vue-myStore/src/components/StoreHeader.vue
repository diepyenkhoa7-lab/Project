<script setup>
defineProps({
  cartCount: {
    type: Number,
    default: 0,
  },
  search: {
    type: String,
    default: '',
  },
})
defineEmits(['update:search'])
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink to="/" class="brand" aria-label="My Store - Trang chủ">
        My Store
      </RouterLink>

      <nav class="main-nav" aria-label="Điều hướng chính">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/cart" class="nav-link">
          Cart ({{ cartCount }})
        </RouterLink>
      </nav>

      <div class="header-actions">
        <input
          :value="search"
          type="search"
          placeholder="Search"
          aria-label="Tìm kiếm sản phẩm"
          @input="$emit('update:search', $event.target.value)"
        />
      </div>
    </div>
  </header>
</template>
