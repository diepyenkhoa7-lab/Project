<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductExperience from '../components/ProductExperience.vue'
import { products } from '../components/products.js'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['add', 'open-cart'])
const router = useRouter()
const product = computed(() =>
  products.find((item) => item.id === Number(props.id)),
)

if (!product.value) router.replace({ name: 'home' })
</script>

<template>
  <ProductExperience
    mode="detail"
    v-if="product"
    :product="product"
    @back="router.push({ name: 'home' })"
    @add="emit('add', $event)"
    @open-cart="emit('open-cart')"
  />
</template>
