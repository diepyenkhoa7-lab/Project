<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const products = ref([
  {
    id: 1,
    name: 'Trà Thạch Đào',
    description: 'Một trải nghiệm thú vị khác! Sự hài hòa giữa vị trà cao cấp, vị sả thanh mát và những miếng đào thơm ngon mọng nước sẽ mang đến cho bạn một thức uống tuyệt vời.',
    price: 1000000,
    image: 'https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/TRA_THACH_DAO_1.jpg' // Thay bằng URL ảnh thực tế
  },
  {
    id: 2,
    name: 'Freeze Trà Xanh',
    description: 'Thức uống rất được ưa chuộng! Trà xanh thượng hạng từ cao nguyên Việt Nam, kết hợp cùng đá xay, thạch trà dai dai, thơm ngon và một lớp kem dày phủ lên trên vô cùng hấp dẫn. Freeze Trà Xanh thơm ngon, mát lạnh, chinh phục bất cứ ai!',
    price: 3000,
    image: 'https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/FREEZE_TRA_XANH.jpg' // Thay bằng URL ảnh thực tế
  }
])

const goToDetail = (id) => {
  router.push(`/product/${id}`)
}
</script>

<template>
  <div class="home-container">
    <nav class="nav-bar">
      <router-link to="/">Home</router-link> | 
      <router-link to="/product/1">Product 1</router-link>
    </nav>

    <h1 class="title">Welcome to Our Store</h1>

    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="card">
        <div class="image-wrapper">
          <img :src="product.image" :alt="product.name" />
        </div>
        <h3>{{ product.name }}</h3>
        <p class="description">{{ product.description }}</p>
        <p class="price"><strong>Price: ${{ product.price }}</strong></p>
        <button class="btn-detail" @click="goToDetail(product.id)">View Details</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

.nav-bar {
  margin-bottom: 20px;
}

.nav-bar a {
  color: #4b0082;
  text-decoration: underline;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
}

.product-list {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.card {
  width: 320px;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.image-wrapper img {
  height: 200px;
  object-fit: contain;
}

.card h3 {
  margin: 10px 0;
  font-size: 20px;
}

.description {
  font-size: 13px;
  color: #444;
  line-height: 1.4;
  flex-grow: 1;
}

.price {
  margin: 15px 0;
  font-size: 14px;
}

.btn-detail {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
}

.btn-detail:hover {
  background-color: #2980b9;
}
</style>