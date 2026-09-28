<script setup>
import { computed, ref } from 'vue'

const products = ref([
  { id: 1, name: 'Trà sữa', price: 50000 },
  { id: 2, name: 'Trà đào', price: 49000 },
  { id: 3, name: 'Cà phê', price: 15000 },
  { id: 4, name: 'Cà phê sữa', price: 17000 }
])

const productName = ref('')
const productPrice = ref(0)
const searchTerm = ref('')
const editingId = ref(null)
const hoveredIndex = ref(null)

const filteredProducts = computed(() => {
  const keyword = searchTerm.value.trim().toLowerCase()

  if (!keyword) {
    return products.value
  }

  return products.value.filter((product) =>
    product.name.toLowerCase().includes(keyword)
  )
})

const resetForm = () => {
  productName.value = ''
  productPrice.value = 0
  editingId.value = null
}

const addOrUpdateProduct = () => {
  const name = productName.value.trim()

  if (!name) {
    return
  }

  const price = Number(productPrice.value)

  if (editingId.value !== null) {
    const productIndex = products.value.findIndex((product) => product.id === editingId.value)

    if (productIndex !== -1) {
      products.value[productIndex].name = name
      products.value[productIndex].price = price
    }
  } else {
    products.value.push({
      id: Date.now(),
      name,
      price
    })
  }

  resetForm()
}

const editProduct = (product) => {
  editingId.value = product.id
  productName.value = product.name
  productPrice.value = product.price
}

const deleteProduct = (productId) => {
  products.value = products.value.filter((product) => product.id !== productId)

  if (editingId.value === productId) {
    resetForm()
  }
}

const onMouseEnter = (index) => {
  hoveredIndex.value = index
}

const onMouseLeave = () => {
  hoveredIndex.value = null
}
</script>

<template>
  <div class="product-management">
    <h1>Product Management</h1>

    <form class="product-form" @submit.prevent="addOrUpdateProduct">
      <label for="product-name">Product Name</label>
      <input
        id="product-name"
        v-model.trim="productName"
        type="text"
        placeholder="Enter product name"
      />

      <label for="product-price">Product Price</label>
      <input
        id="product-price"
        v-model.number="productPrice"
        type="number"
        min="0"
      />

      <button
        type="submit"
        :class="['submit-btn', { update: editingId !== null }]"
      >
        {{ editingId !== null ? 'Update Product' : 'Add Product' }}
      </button>

      <button
        v-if="editingId !== null"
        type="button"
        class="cancel-btn"
        @click="resetForm"
      >
        Cancel
      </button>
    </form>

    <div class="search-box">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search product by name"
      />
    </div>

    <ul class="product-list" v-if="filteredProducts.length > 0">
      <li
        v-for="(product, index) in filteredProducts"
        :key="product.id"
        @mouseenter="onMouseEnter(index)"
        @mouseleave="onMouseLeave"
      >
        <span class="product-name">{{ product.name }}</span>
        <span class="product-price"> - {{ product.price.toLocaleString('vi-VN') }}</span>

        <div
          class="action-row"
          v-if="hoveredIndex === index || editingId === product.id"
        >
          <button class="edit-btn" @click="editProduct(product)">Edit</button>
          <button class="delete-btn" @click="deleteProduct(product.id)">Delete</button>
        </div>
      </li>
    </ul>

    <p v-else class="empty-state">No product found.</p>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.product-management {
  width: min(1000px, 92vw);
  margin: 10px auto;
  padding: 10px 0 20px;
  font-family: Arial, sans-serif;
  color: #1f1f1f;
}

h1 {
  margin: 0 0 22px;
  text-align: center;
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 700;
}

.product-form,
.search-box,
.product-list {
  background: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 18px 18px 14px;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-size: 1.05rem;
  font-weight: 500;
  margin-top: 6px;
}

input {
  width: 100%;
  height: 42px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 1rem;
  background: #fff;
}

input::placeholder {
  color: #888;
}

.submit-btn,
.edit-btn,
.delete-btn,
.cancel-btn {
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.submit-btn:hover,
.edit-btn:hover,
.delete-btn:hover,
.cancel-btn:hover {
  opacity: 0.9;
}

.submit-btn {
  width: 170px;
  height: 42px;
  background: #0d8bf2;
  margin-top: 12px;
  font-size: 1.05rem;
}

.submit-btn.update {
  background: #1d6fe8;
}

.cancel-btn {
  width: fit-content;
  padding: 10px 18px;
  background: #ef4444;
  margin-top: 8px;
}

.search-box input {
  background: #fff;
  border-color: #d0d0d0;
}

.product-list {
  list-style: none;
  padding: 0;
}

.product-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 60px;
  padding: 12px 16px;
  border-bottom: 1px solid #dcdcdc;
  background: #f5f5f5;
}

.product-list li:last-child {
  border-bottom: none;
}

.product-name,
.product-price {
  font-size: 1.02rem;
  font-weight: 600;
}

.product-name {
  display: inline-block;
}

.action-row {
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  min-width: 72px;
  padding: 8px 14px;
  font-size: 0.95rem;
}

.edit-btn {
  background: #f5b700;
}

.delete-btn {
  background: #e53935;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 24px 0;
}

@media (max-width: 640px) {
  .product-list li {
    flex-direction: column;
    align-items: flex-start;
  }

  .action-row {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
