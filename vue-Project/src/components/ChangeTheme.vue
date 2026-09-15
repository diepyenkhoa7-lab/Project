<script setup>
import { ref, computed } from 'vue'

const isHighlighted = ref(true)
const themeMode = ref('dark') // 'dark' hoặc 'light'
const baseClass = ref('btn')

// Hàm đảo theme khi bấm nút
function toggleTheme() {
  themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
}

// Computed trả về Object class dựa trên nhiều điều kiện
const buttonClasses = computed(() => {
  return {
    'btn-highlight': isHighlighted.value,
    'btn-dark': themeMode.value === 'dark',
    'btn-light': themeMode.value === 'light'
  }
})

// Computed trả về Object style động
const dynamicCardStyle = computed(() => {
  return {
    backgroundColor: themeMode.value === 'dark' ? '#1e1e1e' : '#f9f9f9',
    color: themeMode.value === 'dark' ? '#ffffff' : '#333333',
    padding: '16px',
    borderRadius: '8px',
    marginTop: '12px'
  }
})
</script>

<template>
  <!-- Nút chuyển theme -->
  <button
    :class="[baseClass, buttonClasses]"
    @click="toggleTheme"
  >
    Chuyển theme (Hiện tại: {{ themeMode }})
  </button>

  <!-- Hộp tự đổi màu theo theme -->
  <div :style="dynamicCardStyle">
    Hộp nội dung tự đổi theme
  </div>
</template>

<style scoped>
.btn {
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* Kiểu dáng khi themeMode là dark */
.btn-dark {
  background-color: #e6a7dd;
  color: #ffffff;
  border: 1px solid #e6a7dd;
}

/* Kiểu dáng khi themeMode là light */
.btn-light {
  background-color: #81d6c1;
  color: #222222;
  border: 1px solid #81d6c1;
}

/* Viền vàng nổi bật khi isHighlighted = true */
.btn-highlight {
  box-shadow: 0 0 0 2px #cfa912;
}
</style>