<script setup>
import { computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useProductStore } from './stores/products'

const ui = useStore()
const productsStore = useProductStore()
const modalOpen = computed(() => ui.state.modalOpen)
const editingProduct = computed(() => productsStore.products.find((product) => product.id === ui.state.editingProductId) ?? null)
const isEditing = computed(() => editingProduct.value !== null)
const form = reactive({ name: '', description: '', image: '' })
const pages = computed(() => Array.from({ length: productsStore.pageCount }, (_, index) => index + 1))
const defaultImage = 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=300&q=80'

watch([modalOpen, editingProduct], () => {
  form.name = editingProduct.value?.name ?? ''
  form.description = editingProduct.value?.description ?? ''
  form.image = editingProduct.value?.image ?? ''
})

function openAdd() { ui.commit('openAdd') }
function openEdit(productId) { ui.commit('openEdit', productId) }
function closeModal() { ui.commit('closeModal') }

function imagePath(value) {
  const path = value.trim()
  if (!path) return defaultImage
  if (/^(https?:|data:|\/)/i.test(path)) return path
  return `/images/${path}`
}

function saveProduct() {
  const product = {
    name: form.name.trim(),
    description: form.description.trim(),
    image: imagePath(form.image),
  }
  if (!product.name || !product.description) return

  if (editingProduct.value) productsStore.updateProduct(editingProduct.value.id, product)
  else productsStore.addProduct(product)
  closeModal()
}

function deleteProduct(id) {
  productsStore.deleteProduct(id)
}

function handleImageError(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = defaultImage
}
</script>

<template>
  <main class="management-panel">
    <h1>Danh Sách Sản Phẩm</h1>

    <section v-if="productsStore.visibleProducts.length" class="product-list">
      <article v-for="product in productsStore.visibleProducts" :key="product.id" class="product-row">
        <img class="product-thumb" :src="product.image" :alt="product.name" @error="handleImageError" />
        <div class="product-copy"><h2>{{ product.name }}</h2><p>{{ product.description }}</p></div>
        <div class="row-actions">
          <button class="button button-edit" @click="openEdit(product.id)">Sửa</button>
          <button class="button button-delete" @click="deleteProduct(product.id)">Xóa</button>
        </div>
      </article>
    </section>
    <p v-else class="empty-list">Chưa có sản phẩm nào.</p>

    <div class="list-footer">
      <button class="button button-add" @click="openAdd">Thêm Sản Phẩm Mới</button>
      <nav class="pagination" aria-label="Phân trang">
        <button v-for="page in pages" :key="page" :class="{ active: productsStore.currentPage === page }" :aria-current="productsStore.currentPage === page ? 'page' : undefined" @click="productsStore.setPage(page)">{{ page }}</button>
      </nav>
    </div>
  </main>

  <div v-if="modalOpen" class="modal-backdrop" @click.self="closeModal" @keydown.esc="closeModal">
    <section class="product-modal" role="dialog" aria-modal="true" :aria-labelledby="'form-title'">
      <h2 id="form-title">{{ isEditing ? 'Chỉnh sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới' }}</h2>
      <form @submit.prevent="saveProduct">
        <div class="form-row">
          <input v-model="form.name" type="text" placeholder="Tên sản phẩm" aria-label="Tên sản phẩm" required maxlength="80" />
          <input v-model="form.description" type="text" placeholder="Mô tả sản phẩm" aria-label="Mô tả sản phẩm" required maxlength="160" />
        </div>
        <div class="form-row form-row-actions">
          <input v-model="form.image" type="text" placeholder="Tên file ảnh hoặc URL" aria-label="Tên file ảnh hoặc URL" />
          <button class="button button-add modal-action" type="submit">{{ isEditing ? 'Lưu' : 'Thêm' }}</button>
          <button class="button button-cancel modal-action" type="button" @click="closeModal">Hủy</button>
        </div>
        <p class="image-hint">Ảnh có thể là URL hoặc tên file trong thư mục public/images.</p>
      </form>
    </section>
  </div>
</template>
