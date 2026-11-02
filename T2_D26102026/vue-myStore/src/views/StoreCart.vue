<script setup>
import ShoppingCart from '../components/ShoppingCart.vue'

defineProps({
  items: { type: Array, default: () => [] },
  total: { type: Number, default: 0 },
})
const emit = defineEmits(['change', 'remove', 'clear', 'continue-shopping'])
</script>

<template>
  <div class="cart-page container">
    <ShoppingCart
      :items="items"
      :total="total"
      @change="(id, changeBy) => emit('change', id, changeBy)"
      @remove="emit('remove', $event)"
      @clear="emit('clear')"
      @close="emit('continue-shopping')"
    />
  </div>
</template>
