<script setup>
import { computed, ref } from 'vue'

const products = ref([
  { id: 1, name: 'Chocolate freeze', price: 69, selected: false },
  { id: 2, name: 'Phindi Hạnh Nhân', price: 50, selected: false },
  { id: 3, name: 'Cà Phê Sữa', price: 40, selected: false },
  { id: 4, name: 'Trà Sen Vàng', price: 40, selected: false }
])

const total = computed(() =>
  products.value
    .filter((product) => product.selected)
    .reduce((sum, product) => sum + product.price, 0)
)

const formatPrice = (price) => `$${price.toFixed(2)}`
</script>

<template>
  <main class="order-page">
    <section class="order-card" aria-labelledby="menu-title">
      <h1 id="menu-title">Menu HighLands Coffe</h1>

      <div class="menu-list" aria-label="Danh sách sản phẩm">
        <button
          v-for="product in products"
          :key="product.id"
          type="button"
          class="menu-item"
          :class="product.selected ? 'is-selected' : 'is-unselected'"
          :aria-pressed="product.selected"
          @click="product.selected = !product.selected"
        >
          <span>{{ product.name }}</span>
          <span>{{ formatPrice(product.price) }}</span>
        </button>
      </div>

      <div class="order-total" aria-live="polite">
        <strong>Total:</strong>
        <strong>{{ formatPrice(total) }}</strong>
      </div>
    </section>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.order-page {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
  background: #5aa2bb;
  font-family: Arial, sans-serif;
}

.order-card {
  width: min(100%, 440px);
  padding: 24px 28px 30px;
  color: #fff;
}

h1 {
  margin: 0 0 16px;
  color: #fff;
  font-family: 'Trebuchet MS', Arial, sans-serif;
  font-size: clamp(2.8rem, 10vw, 4rem);
  font-weight: 600;
  letter-spacing: -2px;
  line-height: 1.15;
  text-align: center;
}

.menu-list {
  display: grid;
  gap: 8px;
}

.menu-item {
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 22px;
  border: 0;
  border-radius: 0;
  color: #fff;
  font: inherit;
  font-size: 1.05rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  transition: background-color 160ms ease, transform 160ms ease;
}

.menu-item:hover {
  transform: translateY(-1px);
}

.menu-item:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
}

.is-selected {
  background: #8cc36f;
}

.is-unselected {
  background: #eeb1c3;
}

.order-total {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  padding: 14px 22px 0;
  border-top: 1px solid rgb(255 255 255 / 55%);
  font-size: 1.1rem;
}

@media (max-width: 420px) {
  .order-card {
    padding-inline: 4px;
  }

  .menu-item {
    padding-inline: 16px;
    font-size: 0.98rem;
  }
}
</style>
