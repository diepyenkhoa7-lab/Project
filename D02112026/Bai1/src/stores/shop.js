import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const products = [
  { id: 1, name: 'Product A', subtitle: 'Description for product A', description: 'Trà xoài kem mịn, được pha mới mỗi ngày.', price: 100000, category: 'Trà trái cây', image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=900&q=85', tone: 'mango' },
  { id: 2, name: 'Product B', subtitle: 'Description for product B', description: 'Matcha latte kem tươi, vị trà thơm dịu.', price: 150000, category: 'Matcha', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=85', tone: 'matcha' },
]

export const useShopStore = defineStore('shop', () => {
  const cart = ref([])
  const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
  const grandTotal = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function addToCart(product) {
    const item = cart.value.find((entry) => entry.id === product.id)
    if (item) item.quantity += 1
    else cart.value.push({ ...product, quantity: 1 })
  }
  function changeQuantity(id, amount) {
    const item = cart.value.find((entry) => entry.id === id)
    if (!item) return
    item.quantity += amount
    if (item.quantity <= 0) removeFromCart(id)
  }
  function removeFromCart(id) { cart.value = cart.value.filter((item) => item.id !== id) }
  function clearCart() { cart.value = [] }

  return { cart, cartCount, grandTotal, addToCart, changeQuantity, removeFromCart, clearCart }
})
