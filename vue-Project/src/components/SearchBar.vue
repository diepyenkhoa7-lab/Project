
<template>
  <div class="search-container">
    <div class="search-box">
      <span class="search-icon">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9aa5aa"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="16" y1="16" x2="21" y2="21"></line>
        </svg>
      </span>

      <input
        type="text"
        placeholder="Enter your search terms"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <button
        v-if="modelValue"
        class="clear-button"
        type="button"
        title="Xóa tìm kiếm"
        @click="$emit('update:modelValue', '')"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-container {
  width: 100%;
  margin: 0 0 20px;
  padding: 15px;
  background-color: #559db3;
  border-radius: 3px;
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
}

input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0 12px;
  border: none;
  outline: none;
  background: transparent;
  color: #555;
  font-size: 15px;
}

input::placeholder {
  color: #a0a7ab;
}

.clear-button {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: #777;
  font-size: 24px;
  cursor: pointer;
}
.clear-button:hover {
  color: #e63f91;
}
</style>

