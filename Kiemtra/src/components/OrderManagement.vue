<script setup>
import { computed, reactive, ref } from 'vue'
import ProductCatalog from './ProductCatalog.vue'
import ShoppingCart from './ShoppingCart.vue'

// Danh sách sản phẩm mẫu; stock là số lượng còn trong kho.
const products = reactive([
  { id: 1, name: 'Cà phê sữa đá', price: 29000, category: 'Đồ uống', stock: 12 },
  { id: 2, name: 'Trà đào cam sả', price: 35000, category: 'Đồ uống', stock: 9 },
  { id: 3, name: 'Bánh mì gà nướng', price: 42000, category: 'Thức ăn', stock: 7 },
  { id: 4, name: 'Mì Ý sốt bò bằm', price: 69000, category: 'Thức ăn', stock: 5 },
  { id: 5, name: 'Bánh flan', price: 25000, category: 'Tráng miệng', stock: 8 },
])
const cart = reactive([])

// Lưu nội dung tìm kiếm, danh mục và mã giảm giá người dùng nhập.
const search = ref('') // text
const category = ref('Tất cả') // chọn all
const discountCode = ref('') // apply
const discountPercent = ref(0) //auto matic
const message = ref('') // trả về thông báo
const categories = ['Tất cả', 'Đồ uống', 'Thức ăn', 'Tráng miệng']

// Chỉ hiển thị sản phẩm khớp tên và danh mục đã chọn.
const filteredProducts = computed(() => products.filter((product) =>
  product.name.toLowerCase().includes(search.value.toLowerCase()) &&
  (category.value === 'Tất cả' || product.category === category.value),
))

// Tự tính lại hóa đơn mỗi khi giỏ hàng hoặc mức giảm giá thay đổi.
const subtotal = computed(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0))
const discount = computed(() => subtotal.value * discountPercent.value / 100)
const total = computed(() => subtotal.value - discount.value)
const itemCount = computed(() => cart.reduce((sum, item) => sum + item.quantity, 0))
const money = (value) => new Intl.NumberFormat('vi-VN').format(value) + ' ₫'

// Thêm món vào giỏ và giảm tồn kho một sản phẩm.
function addToCart(product) {
  if (product.stock === 0) return
  const item = cart.find((item) => item.id === product.id)
  if (item) item.quantity++
  else cart.push({ ...product, quantity: 1 })
  product.stock--
}

// amount = 1 để tăng, amount = -1 để giảm số lượng.
function changeQuantity(item, amount) {
  const product = products.find((product) => product.id === item.id)
  if (amount === 1 && product.stock === 0) return
  item.quantity += amount
  product.stock -= amount
  if (item.quantity === 0) cart.splice(cart.indexOf(item), 1)
}

// Xóa món và hoàn lại số lượng vào kho.
function removeItem(item) {
  products.find((product) => product.id === item.id).stock += item.quantity
  cart.splice(cart.indexOf(item), 1)
}

// VUE3 giảm 10%, VIP giảm 20%; mã khác sẽ báo lỗi.
function applyDiscount() {
  const codes = { VUE3: 10, VIP: 20 }
  discountPercent.value = codes[discountCode.value.toUpperCase()] || 0
  message.value = discountPercent.value ? 'Đã áp dụng mã giảm giá.' : 'Mã sai. Hãy nhập VUE3 hoặc VIP.'
}

// Hoàn kho, xóa giỏ hàng và đặt lại mã giảm giá.
function newOrder() {
  cart.forEach((item) => {
    products.find((product) => product.id === item.id).stock += item.quantity
  })
  cart.splice(0)
  discountCode.value = ''
  discountPercent.value = 0
  message.value = ''
}
</script>

<template>
  <main class="app">
    <h1>Quản lý đơn hàng</h1>
    <div class="layout">
      <!-- Component danh sách sản phẩm và bộ lọc -->
      <ProductCatalog
        :products="filteredProducts"
        :categories="categories"
        :search="search"
        :category="category"
        :money="money"
        @update:search="search = $event"
        @update:category="category = $event"
        @add="addToCart"
      />
      <!-- Component giỏ hàng và hóa đơn -->
      <ShoppingCart
        :cart="cart"
        :products="products"
        :item-count="itemCount"
        :discount-code="discountCode"
        :discount-percent="discountPercent"
        :message="message"
        :subtotal="subtotal"
        :discount="discount"
        :total="total"
        :money="money"
        @update:discount-code="discountCode = $event"
        @apply-discount="applyDiscount"
        @change-quantity="changeQuantity"
        @remove="removeItem"
        @new-order="newOrder"
      />
    </div>
  </main>
</template>

<style>
*{box-sizing:border-box}body{margin:0;background:#f4f6f5;color:#26332b;font:14px Arial,sans-serif}button,input{font:inherit}
.app{max-width:1100px;margin:auto;padding:24px}.layout{display:grid;grid-template-columns:1fr 360px;gap:16px;align-items:start}.panel{padding:16px;border:1px solid #dfe5e1;border-radius:6px;background:white}.panel h2{margin:0 0 14px;font-size:18px}
.filters{display:grid;gap:10px;margin-bottom:12px}.search,.discount-input{width:100%;padding:8px;border:1px solid #ccd6d0;border-radius:4px}.categories{display:flex;flex-wrap:wrap;gap:6px}.categories button,.quantity button,.remove{padding:7px;border:1px solid #ccd6d0;border-radius:4px;background:white;cursor:pointer}.categories .active,.buy,.new-order{background:#28734f;color:white}.products{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.product{display:grid;gap:7px;padding:10px;border:1px solid #e3e8e5;border-radius:4px}.product h3,.cart-item h3{margin:0;font-size:14px}.muted{color:#68736c;font-size:12px}.product-bottom,.cart-item{display:flex;justify-content:space-between;align-items:center;gap:8px}.buy,.new-order{padding:7px;border:0;border-radius:4px;cursor:pointer}.buy:disabled,.new-order:disabled{opacity:.5}.cart-list{display:grid;gap:10px}.cart-item{padding:8px 0;border-bottom:1px solid #e8ece9}.quantity{display:flex;align-items:center;gap:6px;margin-top:6px}.quantity button{padding:4px 8px}.discount-form{display:flex;gap:6px;margin-top:14px}.discount-input{min-width:0}.bill{margin-top:14px;border-top:1px solid #e8ece9}.bill p,.bill h3{display:flex;justify-content:space-between}.new-order{width:100%}
@media(max-width:720px){.layout{grid-template-columns:1fr}}@media(max-width:450px){.app{padding:14px}.products{grid-template-columns:1fr}}
</style>
