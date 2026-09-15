<script setup>
import { ref } from 'vue'

const isVip = ref(true)
const words = ref(['hoc', 'vue', '3', 'rat', 'vui'])

const toggleVip = () => {
  isVip.value = !isVip.value
}
</script>

<template>
  <div>
    <p>Phép tính: 5 + 5 = {{ 5 + 5 }}</p>
    <p>Loại tài khoản: {{ isVip ? 'Thành viên VIP' : 'Thành viên thường' }}</p>
    <p>Đảo ngược từ: {{ words.reverse().join(' - ') }}</p>
    
    <button @click="toggleVip">Chuyển đổi tài khoản</button>
  </div>
</template>

<style scoped>
button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #369870;
}
</style>