<script setup>
import { ref } from 'vue'

defineProps({
  tasks: { type: Array, required: true }
})

const emit = defineEmits(['add-task'])
const newTask = ref('')

function submitTask() {
  const name = newTask.value.trim()
  if (!name) return
  emit('add-task', name)
  newTask.value = ''
}
</script>

<template>
  <form class="add-form" @submit.prevent="submitTask">
    <span class="input-icon" aria-hidden="true">＋</span>
    <input
      v-model="newTask"
      type="text"
      maxlength="120"
      :placeholder="tasks.length ? 'Thêm một việc nữa…' : 'Bạn cần làm gì?'"
      aria-label="Tên công việc mới"
    >
    <button type="submit" :disabled="!newTask.trim()">Thêm việc</button>
  </form>
</template>
