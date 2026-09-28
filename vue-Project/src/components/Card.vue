<template>
  <div class="card">
    <p>
      Tac gia: {{ author.name }}
    </p>
    <p>has published book: <strong>{{ publishedBooksMessage }}</strong></p>
    <button @click="author.books.pop()">xoa bot 1 quyen sach</button>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>