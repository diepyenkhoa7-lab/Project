<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const product = ref(null)

const mockProducts = [
  {
    id: 1,
    name: 'Trà Thạch Đào',
    description: 'Một trải nghiệm thú vị khác! Sự hài hòa giữa vị trà cao cấp, vị sả thanh mát và những miếng đào thơm ngon mọng nước sẽ mang đến cho bạn một thức uống tuyệt vời.',
    price: 1000000,
    image: 'https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/TRA_THACH_DAO_1.jpg'
  },
  {
    id: 2,
    name: 'Freeze Trà Xanh',
    description: 'Thức uống rất được ưa chuộng! Trà xanh thượng hạng từ cao nguyên Việt Nam, kết hợp cùng đá xay, thạch trà dai dai, thơm ngon và một lớp kem dày phủ lên trên vô cùng hấp dẫn.',
    price: 3000,
    image: 'https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/FREEZE_TRA_XANH.jpg'
  }
]

onMounted(() => {
  const id = Number(route.params.id)
  product.value = mockProducts.find(p => p.id === id)
})

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="detail-container">
    <nav class="nav-bar">
      <router-link to="/">Home</router-link> | 
      <router-link to="/product/1">Product 1</router-link>
    </nav>

    <div v-if="product" class="detail-content">
      <h2>{{ product.name }}</h2>
      <img :src="product.image" :alt="product.name" class="detail-image" />
      <p class="description">{{ product.description }}</p>
      <p class="price"><strong>Price: ${{ product.price }}</strong></p>
      <button class="btn-back" @click="goHome">Back to Home</button>
    </div>

    <div v-else>
      <p>Không tìm thấy sản phẩm!</p>
      <button class="btn-back" @click="goHome">Back to Home</button>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 800px;
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

.detail-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-content h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.detail-image {
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 30px;
}

.description {
  max-width: 650px;
  font-size: 13px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 15px;
}

.price {
  font-size: 14px;
  margin-bottom: 25px;
}

.btn-back {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-back:hover {
  background-color: #2980b9;
}
</style>