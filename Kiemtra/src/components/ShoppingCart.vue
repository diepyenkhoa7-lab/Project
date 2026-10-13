<script setup>
// Nhận giỏ hàng và các giá trị hóa đơn từ component cha.
defineProps(['cart', 'products', 'itemCount', 'discountCode', 'discountPercent', 'message', 'subtotal', 'discount', 'total', 'money'])

// Gửi thao tác trong giỏ lên component cha để cập nhật dữ liệu chung.
const emit = defineEmits(['update:discount-code', 'apply-discount', 'change-quantity', 'remove', 'new-order'])
</script>

<template>
  <!-- Hiển thị các món đã chọn -->
  <section class="panel">
    <h2>Giỏ hàng ({{ itemCount }})</h2>
    <p v-if="!cart.length">Chưa có sản phẩm nào trong giỏ</p>
    <div v-else class="cart-list">
      <article v-for="item in cart" :key="item.id" class="cart-item">
        <div><h3>{{ item.name }}</h3><span class="muted">{{ money(item.price * item.quantity) }}</span>
          <div class="quantity"><button @click="emit('change-quantity', item, -1)">−</button>{{ item.quantity }}<button :disabled="products.find((p) => p.id === item.id).stock === 0" @click="emit('change-quantity', item, 1)">+</button></div>
        </div>
        <button class="remove" @click="emit('remove', item)">Xóa</button>
      </article>
    </div>
    <!-- .prevent chặn tải lại trang khi áp dụng mã -->
    <form class="discount-form" @submit.prevent="emit('apply-discount')">
      <input class="discount-input" :value="discountCode" placeholder="Mã VUE3 hoặc VIP" @input="emit('update:discount-code', $event.target.value)" />
      <button>Áp dụng</button>
    </form>
    <p v-if="message">{{ message }}</p>
    <!-- Các số tiền được tính bằng computed ở component cha -->
    <div class="bill"><p>Tạm tính <span>{{ money(subtotal) }}</span></p><p>Giảm giá ({{ discountPercent }}%) <span>{{ money(discount) }}</span></p><h3>Tổng cộng <span>{{ money(total) }}</span></h3></div>
    <button class="new-order" :disabled="!cart.length" @click="emit('new-order')">Tạo đơn mới</button>
  </section>
</template>
