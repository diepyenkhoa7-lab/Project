# vue-Project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Giải thích chi tiết file ProductManagement.vue

File [src/components/ProductManagement.vue](src/components/ProductManagement.vue) là một component Vue 3 dùng để quản lý sản phẩm: thêm mới, sửa, xóa và tìm kiếm sản phẩm.

### 1. Script setup

```vue
<script setup>
import { computed, ref } from 'vue'
```

- `script setup` là cách viết ngắn gọn trong Vue 3, giúp định nghĩa logic của component ngay trong file mà không cần `export default` phức tạp.
- `import { computed, ref } from 'vue'` import hai API quan trọng:
  - `ref`: tạo biến reactive, nghĩa là dữ liệu sẽ được Vue theo dõi và cập nhật giao diện khi thay đổi.
  - `computed`: tạo giá trị suy ra từ dữ liệu gốc, tự động cập nhật khi giá trị phụ thuộc thay đổi.

### 2. Dữ liệu ban đầu của sản phẩm

```vue
const products = ref([
  { id: 1, name: 'Trà sữa', price: 50000 },
  { id: 2, name: 'Trà đào', price: 49000 },
  { id: 3, name: 'Cà phê', price: 15000 },
  { id: 4, name: 'Cà phê sữa', price: 17000 }
])
```

- Đây là danh sách sản phẩm mặc định khi component được render lần đầu.
- Mỗi sản phẩm là một object có 3 thuộc tính:
  - `id`: mã định danh duy nhất của sản phẩm.
  - `name`: tên sản phẩm.
  - `price`: giá sản phẩm.
- `ref([...])` biến `products` trở thành reactive, nên khi thêm/sửa/xóa sản phẩm, giao diện sẽ tự cập nhật.

### 3. Các state của form và tìm kiếm

```vue
const productName = ref('')
const productPrice = ref(0)
const searchTerm = ref('')
const editingId = ref(null)
const hoveredIndex = ref(null)
```

- `productName`: lưu tên sản phẩm đang nhập trong form.
- `productPrice`: lưu giá sản phẩm đang nhập.
- `searchTerm`: lưu từ khóa tìm kiếm.
- `editingId`: lưu id của sản phẩm đang được sửa. Nếu `null` nghĩa là đang ở chế độ thêm mới.
- `hoveredIndex`: lưu vị trí sản phẩm đang hover chuột, dùng để hiện nút Edit/Delete.

### 4. Tìm kiếm sản phẩm

```vue
const filteredProducts = computed(() => {
  const keyword = searchTerm.value.trim().toLowerCase()

  if (!keyword) {
    return products.value
  }

  return products.value.filter((product) =>
    product.name.toLowerCase().includes(keyword)
  )
})
```

- `computed` dùng để tạo danh sách sản phẩm đã lọc, tự động cập nhật khi `searchTerm` hoặc `products` thay đổi.
- `searchTerm.value.trim().toLowerCase()` bỏ khoảng trắng và chuyển về chữ thường để tìm kiếm không phân biệt hoa/thường.
- Nếu `keyword` rỗng thì trả về toàn bộ mảng `products`.
- Nếu có từ khóa thì dùng `.filter()` để chỉ giữ các sản phẩm có tên chứa chuỗi tìm kiếm.

### 5. Reset form sau khi thêm hoặc cập nhật

```vue
const resetForm = () => {
  productName.value = ''
  productPrice.value = 0
  editingId.value = null
}
```

- Sau khi người dùng nhấn submit hoặc hủy chỉnh sửa, form sẽ được xóa sạch.
- `productName.value = ''` xóa tên.
- `productPrice.value = 0` đặt lại giá về 0.
- `editingId.value = null` chuyển trạng thái về chế độ thêm mới.

### 6. Thêm mới hoặc cập nhật sản phẩm

```vue
const addOrUpdateProduct = () => {
  const name = productName.value.trim()

  if (!name) {
    return
  }

  const price = Number(productPrice.value)

  if (editingId.value !== null) {
    const productIndex = products.value.findIndex((product) => product.id === editingId.value)

    if (productIndex !== -1) {
      products.value[productIndex].name = name
      products.value[productIndex].price = price
    }
  } else {
    products.value.push({
      id: Date.now(),
      name,
      price
    })
  }

  resetForm()
}
```

- Hàm này xử lý cả 2 trường hợp: thêm mới và cập nhật.
- `const name = productName.value.trim()` loại bỏ khoảng trắng đầu cuối.
- `if (!name) return` ngăn thêm sản phẩm rỗng.
- `const price = Number(productPrice.value)` chuyển giá trị nhập từ form sang số.
- Nếu `editingId.value !== null`, đang ở chế độ sửa, nên tìm sản phẩm theo `id` và cập nhật dữ liệu.
- Nếu không có `editingId`, nghĩa là thêm mới, dùng `products.value.push(...)` để chèn sản phẩm mới vào mảng.
- `Date.now()` tạo id dựa trên thời gian hiện tại, giúp đảm bảo id khác nhau cho mỗi sản phẩm mới.
- Sau cùng, `resetForm()` xóa form để quay lại trạng thái mặc định.

### 7. Chức năng sửa sản phẩm

```vue
const editProduct = (product) => {
  editingId.value = product.id
  productName.value = product.name
  productPrice.value = product.price
}
```

- Khi người dùng bấm nút Edit, component lấy thông tin của sản phẩm đang chọn.
- `editingId.value = product.id` thiết lập trạng thái đang sửa sản phẩm có id đó.
- `productName.value = product.name` và `productPrice.value = product.price` đưa dữ liệu cũ vào form để người dùng chỉnh sửa.

### 8. Chức năng xóa sản phẩm

```vue
const deleteProduct = (productId) => {
  products.value = products.value.filter((product) => product.id !== productId)

  if (editingId.value === productId) {
    resetForm()
  }
}
```

- `filter()` tạo một mảng mới chứa các sản phẩm khác với `productId` được xóa.
- Nếu sản phẩm đang sửa bị xóa, sẽ gọi `resetForm()` để đóng form sửa.

### 9. Xử lý sự kiện hover chuột

```vue
const onMouseEnter = (index) => {
  hoveredIndex.value = index
}

const onMouseLeave = () => {
  hoveredIndex.value = null
}
```

- Khi chuột di vào một sản phẩm trong danh sách, `hoveredIndex` lưu lại vị trí đó.
- Khi chuột rời đi, `hoveredIndex` được reset về `null`.
- Điều này dùng để hiển thị các nút Edit/Delete khi người dùng hover vào một item.

---

### Template: giao diện HTML của component

```vue
<template>
  <div class="product-management">
    <h1>Product Management</h1>
```

- Component render một vùng chứa tổng thể với class `product-management`.
- `h1` hiển thị tiêu đề chính “Product Management”.

### Form thêm/sửa sản phẩm

```vue
<form class="product-form" @submit.prevent="addOrUpdateProduct">
  <label for="product-name">Product Name</label>
  <input
    id="product-name"
    v-model.trim="productName"
    type="text"
    placeholder="Enter product name"
  />
```

- `@submit.prevent="addOrUpdateProduct"` nghĩa là: khi form submit, chặn hành vi mặc định của trình duyệt và gọi hàm `addOrUpdateProduct`.
- `v-model.trim="productName"` gán dữ liệu từ input vào biến `productName` và tự động loại bỏ khoảng trắng đầu cuối.
- `v-model.number="productPrice"` cho phép giá trị input price được chuyển sang kiểu số.
- `min="0"` ngăn người dùng nhập số âm.

#### Nút submit

```vue
<button
  type="submit"
  :class="['submit-btn', { update: editingId !== null }]"
>
  {{ editingId !== null ? 'Update Product' : 'Add Product' }}
</button>
```

- `:class="['submit-btn', { update: editingId !== null }]"` tạo class động.
- Nếu đang ở chế độ sửa (`editingId !== null`), button sẽ có thêm class `update` để đổi màu.
- `{{ ... }}` là interpolation trong Vue, giúp hiển thị văn bản động: nếu đang sửa thì là “Update Product”, nếu đang thêm thì là “Add Product”.

#### Nút hủy

```vue
<button
  v-if="editingId !== null"
  type="button"
  class="cancel-btn"
  @click="resetForm"
>
  Cancel
</button>
```

- `v-if="editingId !== null"` chỉ hiển thị nút Cancel khi đang ở chế độ sửa.
- `@click="resetForm"` gọi lại hàm reset form khi người dùng nhấn hủy.

### Ô tìm kiếm

```vue
<div class="search-box">
  <input
    v-model="searchTerm"
    type="text"
    placeholder="Search product by name"
  />
</div>
```

- `v-model="searchTerm"` gắn nội dung ô nhập với biến `searchTerm`.
- Từ khóa ở đây được dùng để lọc danh sách sản phẩm theo tên.

### Danh sách sản phẩm

```vue
<ul class="product-list" v-if="filteredProducts.length > 0">
  <li
    v-for="(product, index) in filteredProducts"
    :key="product.id"
    @mouseenter="onMouseEnter(index)"
    @mouseleave="onMouseLeave"
  >
```

- `v-if="filteredProducts.length > 0"` chỉ hiển thị danh sách khi có sản phẩm phù hợp với tìm kiếm.
- `v-for="(product, index) in filteredProducts"` lặp qua từng phần tử trong mảng `filteredProducts`.
- `:key="product.id"` dùng để Vue định danh từng phần tử, giúp render hiệu quả và ổn định hơn.
- `@mouseenter` và `@mouseleave` xử lý sự kiện hover chuột.

### Hiển thị tên và giá sản phẩm

```vue
<span class="product-name">{{ product.name }}</span>
<span class="product-price"> - {{ product.price.toLocaleString('vi-VN') }}</span>
```

- `product.name` hiển thị tên sản phẩm.
- `product.price.toLocaleString('vi-VN')` định dạng giá theo kiểu Việt Nam, ví dụ: 50.000 thay vì 50000.

### Nút Edit/Delete

```vue
<div
  class="action-row"
  v-if="hoveredIndex === index || editingId === product.id"
>
  <button class="edit-btn" @click="editProduct(product)">Edit</button>
  <button class="delete-btn" @click="deleteProduct(product.id)">Delete</button>
</div>
```

- `v-if="hoveredIndex === index || editingId === product.id"` cho phép hiện nhóm nút khi:
  - người dùng hover vào sản phẩm, hoặc
  - sản phẩm đang được chỉnh sửa.
- `@click="editProduct(product)"` gọi hàm sửa sản phẩm.
- `@click="deleteProduct(product.id)"` gọi hàm xóa sản phẩm.

### Trạng thái không có dữ liệu

```vue
<p v-else class="empty-state">No product found.</p>
```

- Khi không có sản phẩm nào phù hợp với tìm kiếm, hiển thị thông báo “No product found.”

---

### Style scoped

```vue
<style scoped>
* {
  box-sizing: border-box;
}
```

- `scoped` nghĩa là CSS chỉ áp dụng cho component này, không ảnh hưởng đến toàn bộ ứng dụng.
- `box-sizing: border-box` đảm bảo chiều rộng và padding không làm tăng kích thước phần tử ngoài ý muốn.

#### Phần layout chung

```vue
.product-management {
  width: min(1000px, 92vw);
  margin: 10px auto;
  padding: 10px 0 20px;
  font-family: Arial, sans-serif;
  color: #1f1f1f;
}
```

- Làm cho component có độ rộng tối đa 1000px hoặc 92% màn hình.
- `margin: 10px auto` căn giữa trên màn hình.
- `font-family` thiết lập phông chữ mặc định.

#### Form và search box

```vue
.product-form,
.search-box,
.product-list {
  background: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 18px 18px 14px;
}
```

- Dùng màu nền sáng, viền nhạt, bo góc để tạo kiểu hiện đại cho khu vực form, tìm kiếm và danh sách.

#### Nút bấm

```vue
.submit-btn,
.edit-btn,
.delete-btn,
.cancel-btn {
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
```

- Áp dụng kiểu chung cho các nút: không viền, bo góc, chữ trắng, con trỏ dạng tay.
- `transition: opacity 0.2s ease` tạo hiệu ứng mượt khi hover.

#### Màu sắc từng nút

```vue
.submit-btn {
  background: #0d8bf2;
}

.submit-btn.update {
  background: #1d6fe8;
}

.edit-btn {
  background: #f5b700;
}

.delete-btn {
  background: #e53935;
}

.cancel-btn {
  background: #ef4444;
}
```

- Nút thêm mới có màu xanh.
- Khi đang sửa, nút submit đổi sang màu xanh đậm hơn.
- Nút sửa màu vàng.
- Nút xóa màu đỏ.
- Nút cancel màu đỏ nhạt hơn.

#### Responsive trên mobile

```vue
@media (max-width: 640px) {
  .product-list li {
    flex-direction: column;
    align-items: flex-start;
  }

  .action-row {
    width: 100%;
    justify-content: flex-end;
  }
}
```

- Khi màn hình nhỏ hơn 640px, danh sách sản phẩm chuyển từ layout ngang sang dọc.
- Các nút hành động sẽ căn dưới bên phải để phù hợp với màn hình điện thoại.

---

### Tổng kết

Component này là một ví dụ cơ bản về quản lý sản phẩm trong Vue 3 với các chức năng:

- thêm sản phẩm
- sửa sản phẩm
- xóa sản phẩm
- tìm kiếm sản phẩm theo tên
- hiển thị trạng thái hover và chỉnh sửa
- giao diện responsive cho màn hình nhỏ

Đây là một component rất phù hợp để học cách sử dụng:

- `ref` để tạo state
- `computed` để tính toán dữ liệu phụ thuộc
- `v-model` để liên kết input với state
- `v-for` để render danh sách
- `@click` và `@submit` để xử lý sự kiện
- `scoped CSS` để định dạng riêng cho component.
