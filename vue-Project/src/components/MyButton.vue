<script setup>
import { reactive } from 'vue'

// Định nghĩa thuộc tính của nút bấm
const buttonAttrs = reactive({
  id: 'submit-btn',
  type: 'button',
  class: 'btn-primary',
  disabled: false,
})

// Hàm thay đổi trạng thái disabled của nút
const toggleDisabled = () => {
  buttonAttrs.disabled = !buttonAttrs.disabled
}
</script>

<template>
  <div>
    <!-- Vue sẽ dùng key-value trong buttonAttrs để render thuộc tính -->
    <button v-bind="buttonAttrs">
      {{ buttonAttrs.disabled ? 'Đã bị vô hiệu hóa' : 'Gửi dữ liệu' }}
    </button>

    <br><br>

    <!-- Nút điều khiển trạng thái disabled của nút trên -->
    <button type="button" @click="toggleDisabled">
      Bật / Tắt trạng thái Disabled
    </button>
  </div>
</template>

<style scoped>
.btn-primary {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #a8a8a8;
  cursor: not-allowed;
}
</style>