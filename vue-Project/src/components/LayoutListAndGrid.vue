
<template>
  <div class="container">
    <!-- Thanh phía trên -->
    <div class="toolbar">
      <div class="title">HD</div>

      <div class="view-buttons">
        <button
          class="view-btn"
          :class="{ active: viewMode === 'list' }"
          @click="viewMode = 'list'"
          title="Dạng List"
          type="button"
        >
          ☷
        </button>

        <button
          class="view-btn"
          :class="{ active: viewMode === 'grid' }"
          @click="viewMode = 'grid'"
          title="Dạng Grid"
          type="button"
        >
          ▦
        </button>
      </div>
    </div>

    <!-- Thanh tìm kiếm được truyền từ App.vue -->
    <div class="search-area">
      <slot name="search"></slot>
    </div>

    <!-- LIST -->
    <div v-if="viewMode === 'list'" class="product-list">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-list-item"
      >
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>

        <div class="product-name">
          {{ product.name }}
        </div>
      </div>
    </div>

    <!-- GRID -->
    <div v-else class="product-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-grid-item"
      >
        <img :src="product.image" :alt="product.name" />

        <div class="grid-product-name">
          {{ product.name }}
        </div>
      </div>
    </div>

    <!-- Không tìm thấy sản phẩm -->
    <div v-if="filteredProducts.length === 0" class="no-results">
      Không tìm thấy sản phẩm phù hợp.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  searchTerm: {
    type: String,
    default: ''
  }
})

const viewMode = ref('list')

const products = [
  {
    id: 1,
    name: 'Taya Bánh Mì đen',
    image: '/images/banhmi-den.jpg'
  },
  {
    id: 2,
    name: 'Bánh mì nướng',
    image: '/images/banhmi-nuong.jpg'
  },
  {
    id: 3,
    name: 'Hạnh Nhân nướng',
    image: '/images/hanhnhan.jpg'
  },
  {
    id: 4,
    name: 'Bready cuộn nhân dừa',
    image: '/images/bready.jpg'
  }
]

const filteredProducts = computed(() => {
  const keyword = props.searchTerm.trim().toLowerCase()

  if (keyword === '') {
    return products
  }

  return products.filter((product) =>
    product.name.toLowerCase().includes(keyword)
  )
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 550px;
  margin: 0 auto 30px;
  background: white;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.toolbar {
  min-height: 55px;
  background: #5aa5bd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.title {
  background: #36758b;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 8px;
  border-radius: 3px;
}

.view-buttons {
  display: flex;
  gap: 5px;
}

.view-btn {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: white;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.view-btn.active {
  background: #e63f91;
}

.search-area {
  padding: 15px 15px 0;
}

/* LIST */
.product-list {
  padding: 15px 35px;
}

.product-list-item {
  min-height: 105px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.product-list-item:last-child {
  border-bottom: none;
}

.product-image {
  width: 120px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  max-width: 100%;
  max-height: 90px;
  object-fit: contain;
}

.product-name {
  flex: 1;
  text-align: center;
  color: #777;
  font-size: 15px;
}

/* GRID */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  padding: 25px 35px;
}

.product-grid-item {
  min-height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.product-grid-item img {
  width: 100%;
  height: 180px;
  object-fit: contain;
}

.grid-product-name {
  margin-top: 8px;
  color: #777;
  font-size: 14px;
  text-align: center;
}

.no-results {
  padding: 25px 15px;
  text-align: center;
  color: #888;
  font-size: 14px;
}

@media (max-width: 500px) {
  .product-grid {
    padding: 20px;
    gap: 10px;
  }

  .product-grid-item img {
    height: 150px;
  }

  .product-list {
    padding: 10px 20px;
  }

  .product-image {
    width: 100px;
  }
}
</style>
