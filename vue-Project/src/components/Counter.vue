<!-- src/components/Counter.vue -->
<script setup>
import { ref } from 'vue'

// Khai báo state có tính phản ứng (Reactivity)
const count = ref(0)

// Hàm thay đổi state
function tangSo() {
  count.value++
}

function giamSo() {
  count.value--
}
</script>

<template>
  <div class="counter-box">
    <h2>Thực hành Reactive với Vue 3</h2>
    <p>Giá trị hiện tại: <strong>{{ count }}</strong></p>

    <button @click="giamSo">- Giảm</button>
    <button @click="tangSo">+ Tăng</button>
  </div>
</template>

<style scoped>
.counter-box {
  padding: 16px;
  border: 1px solid #42b883;
  border-radius: 8px;
  max-width: 300px;
  text-align: center;
}

button {
  margin: 0 6px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>