<script setup>
import { ref } from 'vue'

// Định nghĩa đối tương chứa style
const isActive = ref(true)
const hasError = ref(false)
const textColor = ref('pink')
const fontSize = ref(16)
</script>

<template>
  <!-- Rằng buộc Class qua Object -->
  <!-- 'active' được thêm vào vì isActive = true; 'text-danger' bị bỏ qua vì hasError = false -->
  <div :class="{ active: isActive, 'text-danger': hasError }">
    Nội dung thẻ thông báo
  </div>
  
  <!-- Rằng buộc Style qua Object -->
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }">
    Đoạn văn bản tùy chỉnh Style
  </div>

  <!-- Nút điều khiển -->
  <button type="button" @click="isActive = !isActive">Bật/Tắt Active</button>

  <!-- Hiển thị giá trị hiện tại -->
  <div class="info">
    <p>Giá trị hiện tại của isActive: {{ isActive }}</p>
    <p>Trạng thái: <span :style="{ color: isActive ? 'green' : 'yellow', fontWeight: 'bold' }">{{ isActive ? 'ĐANG BẬT (true)' : 'ĐANG TẮT (false)' }}</span></p>

  </div>
</template>

<style scoped>

h2 {
  color: #00ddff;
  font-weight: bold;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  background-color: #e6acdd;
  color: #d36e6e;
  cursor: pointer;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  margin: 20px 0;
}

button:hover {
  background-color: #e6acdd;
}

.info {
  margin-top: 10px;
  padding: 5px;
}

.status {
  color: #28a745;
  font-weight: bold;
}
</style>
