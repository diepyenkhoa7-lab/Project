<template>
  <div class="sales-container">

    <h2>BÁN HÀNG</h2>
 
    <!-- Chọn mức giá -->
    <div class="filter">
      <select v-model="selectedPrice">
        <option value="all">Mức giá</option>
        <option value="under200">Dưới 200</option>
        <option value="200to500">Từ 200 đến 500</option>
        <option value="over500">Trên 500</option>
      </select>
    </div>

    <!-- Bảng -->
    <table>
      <thead>
        <tr>
          <th class="checkbox-column">
            <input
              type="checkbox"
              :checked="allVisibleSelected"
              @change="toggleAllVisible($event.target.checked)"
            />
          </th>

          <th>Hàng hóa</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <!-- Checkbox -->
          <td class="checkbox-column">
            <input
              type="checkbox"
              v-model="product.selected"
              @change="handleCheckboxChange(product)"
            />
          </td>

          <!-- Tên -->
          <td>
            {{ product.name }}
          </td>

          <!-- Đơn giá -->
          <td>
            {{ formatMoney(product.price) }}
          </td>

          <!-- Số lượng -->
          <td>
            <input
              class="quantity-input"
              type="number"
              min="0"
              v-model.number="product.quantity"
              :disabled="!product.selected"
              @input="handleQuantityChange(product)"
            />
          </td>

          <!-- Thành tiền -->
          <td class="amount">
            <span v-if="product.selected">
              {{ formatMoney(product.price * product.quantity) }}
            </span>
          </td>
        </tr>

        <!-- Không có sản phẩm -->
        <tr v-if="filteredProducts.length === 0">
          <td colspan="5" class="no-products">
            Không có sản phẩm trong mức giá này.
          </td>
        </tr>
      </tbody>

      <!-- Tổng -->
      <tfoot>
        <tr>
          <th colspan="4" class="total-label">
            TỔNG
          </th>

          <th class="total-amount">
            {{ formatMoney(totalAmount) }}
          </th>
        </tr>
      </tfoot>
    </table>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* =========================
   MỨC GIÁ ĐANG CHỌN
========================= */

const selectedPrice = ref('all')


/* =========================
   DANH SÁCH SẢN PHẨM
========================= */

const products = ref([
  {
    id: 1,
    name: 'iPhone 18',
    price: 36000000,
    selected: false,
    quantity: 0
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: 400,
    selected: true,
    quantity: 1
  },
  {
    id: 3,
    name: 'Nokia',
    price: 100,
    selected: false,
    quantity: 0
  },
  {
    id: 4,
    name: 'Sony Xperia',
    price: 450,
    selected: false,
    quantity: 0
  },
  {
    id: 5,
    name: 'Motorola',
    price: 180,
    selected: false,
    quantity: 0
  },
  {
    id: 6,
    name: 'Oppo',
    price: 600,
    selected: false,
    quantity: 0
  },
  {
    id: 7,
    name: 'Pixel',
    price: 90,
    selected: true,
    quantity: 2
  }
])


/* =========================
   LỌC THEO MỨC GIÁ
========================= */

const filteredProducts = computed(() => {

  if (selectedPrice.value === 'under200') {

    return products.value.filter(product => {
      return product.price < 200
    })

  }

  if (selectedPrice.value === '200to500') {

    return products.value.filter(product => {
      return product.price >= 200 && product.price <= 500
    })

  }

  if (selectedPrice.value === 'over500') {

    return products.value.filter(product => {
      return product.price > 500
    })

  }

  return products.value
})


/* =========================
   TÍNH TỔNG TIỀN
========================= */

const totalAmount = computed(() => {

  let total = 0

  products.value.forEach(product => {

    if (product.selected) {

      total += product.price * product.quantity

    }

  })

  return total
})


/* =========================
   CHECKBOX TẤT CẢ
========================= */

const allVisibleSelected = computed(() => {

  if (filteredProducts.value.length === 0) {
    return false
  }

  return filteredProducts.value.every(product => {
    return product.selected
  })

})


/* =========================
   CHỌN / BỎ CHỌN TẤT CẢ
========================= */

function toggleAllVisible(checked) {

  filteredProducts.value.forEach(product => {

    product.selected = checked

    if (checked) {

      if (product.quantity <= 0) {
        product.quantity = 1
      }

    } else {

      product.quantity = 0

    }

  })

}


/* =========================
   CHỌN / BỎ CHỌN SẢN PHẨM
========================= */

function handleCheckboxChange(product) {

  if (product.selected) {

    if (product.quantity <= 0) {
      product.quantity = 1
    }

  } else {

    product.quantity = 0

  }

}


/* =========================
   THAY ĐỔI SỐ LƯỢNG
========================= */

function handleQuantityChange(product) {

  if (product.quantity === null || product.quantity === undefined) {
    product.quantity = 0
  }

  if (product.quantity < 0) {
    product.quantity = 0
  }

  product.quantity = Math.floor(product.quantity)

}


/* =========================
   FORMAT TIỀN
========================= */

function formatMoney(value) {

  return value.toLocaleString('en-US')

}
</script>


<style scoped>

.sales-container {
  width: 100%;
  max-width: 580px;
  margin: 20px auto;
  padding: 10px;
  background: white;
  color: #222;
  font-family: "Times New Roman", serif;
}


/* TIÊU ĐỀ */

h2 {
  margin: 8px 0 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}


/* SELECT */

.filter {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.filter select {
  width: 135px;
  height: 24px;
  padding: 2px 5px;
  border: 1px solid #aaa;
  background: white;
  font-family: inherit;
  font-size: 14px;
}


/* TABLE */

table {
  width: 100%;
  border: 1px solid #777;
  border-spacing: 2px;
  table-layout: fixed;
  text-align: center;
  font-size: 16px;
}

th,
td {
  height: 31px;
  padding: 2px 5px;
  border: 1px solid #999;
}

th {
  font-weight: bold;
}


/* CỘT CHECKBOX */

.checkbox-column {
  width: 36px;
}


/* CÁC CỘT */

th:nth-child(2) {
  width: 115px;
}

th:nth-child(3) {
  width: 80px;
}

th:nth-child(4) {
  width: 175px;
}

th:nth-child(5) {
  width: 105px;
}


/* CHECKBOX */

input[type="checkbox"] {
  width: 14px;
  height: 14px;
  cursor: pointer;
  vertical-align: middle;
}


/* Ô SỐ LƯỢNG */

.quantity-input {
  width: 100%;
  height: 23px;
  padding: 2px 4px;
  border: 1px solid #aaa;
  font-family: inherit;
  font-size: 14px;
}

.quantity-input:disabled {
  background: #fff;
  color: #999;
  cursor: not-allowed;
}


/* THÀNH TIỀN */

.amount {
  font-weight: bold;
}


/* TỔNG */

.total-label {
  text-align: center;
}

.total-amount {
  font-weight: bold;
}


/* KHÔNG CÓ SẢN PHẨM */

.no-products {
  height: 50px;
  color: #777;
}


/* RESPONSIVE */

@media (max-width: 500px) {

  .sales-container {
    padding: 5px;
  }

  table {
    font-size: 13px;
  }

  th,
  td {
    padding: 2px;
  }

  th:nth-child(2) {
    width: 85px;
  }

  th:nth-child(3) {
    width: 55px;
  }

  th:nth-child(4) {
    width: 100px;
  }

  th:nth-child(5) {
    width: 75px;
  }

}

</style>