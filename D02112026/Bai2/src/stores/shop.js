import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const products = [
  {
    id: 1,
    name: 'Trà Sữa Trân Châu',
    description: 'Trà sữa thơm ngon với trân châu dai mềm.',
    ingredients: 'Trà đen, sữa tươi, trân châu đen',
    deliveryTime: '30–45 phút',
    rating: '★★★★★',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=700&q=85',
    prices: { S: 30000, M: 35000, L: 40000 },
  },
  {
    id: 2,
    name: 'Trà Sữa Matcha',
    description: 'Trà sữa matcha thơm béo, vị trà xanh dịu nhẹ.',
    ingredients: 'Matcha, sữa tươi, trân châu trắng',
    deliveryTime: '30–45 phút',
    rating: '★★★★★',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=700&q=85',
    prices: { S: 35000, M: 40000, L: 45000 },
  },
]

export const useShopStore = defineStore('milk-tea-shop', () => {
  const cart = ref([])
  const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
  const grandTotal = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function addToCart(product, size) {
    const price = product.prices[size]
    const existing = cart.value.find((item) => item.id === product.id && item.size === size)
    if (existing) existing.quantity += 1
    else cart.value.push({ id: product.id, name: product.name, image: product.image, size, price, quantity: 1 })
  }

  function removeFromCart(id, size) {
    cart.value = cart.value.filter((item) => item.id !== id || item.size !== size)
  }

  function clearCart() {
    cart.value = []
  }

  return { cart, cartCount, grandTotal, addToCart, removeFromCart, clearCart }
})
