import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const initialProducts = [
  { id: 1, name: 'Trà sữa ô long nướng', description: 'Đậm vị ô long, thơm nồng, béo ngậy', image: 'https://vivastarcoffee.com/pb/api/files/products/7ixls8bgnwp36jk/tra_sua_olong_y20lahc2uu_fu2up340i2.jpg' },
  { id: 2, name: 'Trà sữa nguyên lá', description: 'Trà sữa thơm ngon với trân châu', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDFot4qRAr7Mqs54jJJDUgqDx_Ym2LAJuByQc2X8q6JA&s=10' },
  { id: 3, name: 'Freeze Cookies & Cream', description: 'Freeze vị cookies & cream thơm ngon', image: 'https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/FREEZE_COOKIES.jpg' },
]

export const useProductStore = defineStore('products', () => {
  const products = ref(initialProducts.map((product) => ({ ...product })))
  const currentPage = ref(1)
  const pageSize = 3
  const pageCount = computed(() => Math.max(1, Math.ceil(products.value.length / pageSize)))
  const visibleProducts = computed(() => products.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))

  function setPage(page) {
    currentPage.value = Math.min(Math.max(1, page), pageCount.value)
  }
  function addProduct(product) {
    products.value.push({ ...product, id: Date.now() + Math.floor(Math.random() * 1000) })
    currentPage.value = pageCount.value
  }
  function updateProduct(id, changes) {
    const product = products.value.find((item) => item.id === id)
    if (product) Object.assign(product, changes)
  }
  function deleteProduct(id) {
    products.value = products.value.filter((item) => item.id !== id)
    if (currentPage.value > pageCount.value) currentPage.value = pageCount.value
  }

  return { products, currentPage, pageCount, visibleProducts, setPage, addProduct, updateProduct, deleteProduct }
})
