<script setup>
import ProductExperience from '../components/ProductExperience.vue'

defineProps({
  search: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['view', 'add'])
</script>

<template>
  <ProductExperience
    mode="catalog"
    :search="search"
    @view="emit('view', $event)"
    @add="emit('add', $event)"
  />
</template>
