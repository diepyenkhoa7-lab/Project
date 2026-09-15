<template>
  <div class="user-status-container">

    <br />

    <div class="section">
      <p class="title"></p>
      <button @click="isLoggedIn = !isLoggedIn">Chuyển đổi đăng nhập</button>
      <button @click="showModal = !showModal" class="active-btn">Bật/Tắt Modal</button>
      
      <p v-if="isLoggedIn">Chào mừng bạn đã quay trở lại hệ thống!</p>
      <p v-else>Vui lòng đăng nhập để tiếp tục.</p>

      <!-- Dòng nội dung Modal -->
      <div v-show="showModal" class="modal-box">
        Nội dung hộp thoại thông báo...
      </div>    
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'

// Quản lý trạng thái đăng nhập
const isLoggedIn = ref(false)

// Quản lý trạng thái bật/tắt Modal
const showModal = ref(true)
</script>

<style scoped>
.user-status-container {
  font-family: Arial, sans-serif;
  padding: 15px;
  line-height: 1.5;
}

button {
  margin-right: 6px;
  padding: 3px 8px;
  border: 1px solid #767676;
  border-radius: 3px;
  background-color: #ebe8e9;
  cursor: pointer;
}

button:hover {
  background-color: #8ae2d8;
}

.modal-box {
  margin-top: 5px;
  font-size: 16px;
}
</style>