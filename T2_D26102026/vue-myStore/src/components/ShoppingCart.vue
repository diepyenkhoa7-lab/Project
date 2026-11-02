<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['close', 'change', 'remove', 'clear'])
const itemCount = computed(() =>
  props.items.reduce((count, item) => count + item.quantity, 0),
)
</script>

<template>
  <section class="cart-modal cart-page-card" aria-labelledby="cart-title">
      <div class="cart-heading">
        <h2 id="cart-title">Giỏ hàng của bạn ({{ itemCount }})</h2>
      </div>

      <div v-if="items.length" class="cart-content">
        <div class="cart-column-labels">
          <span>Hình ảnh</span>
          <span>Tên sản phẩm</span>
          <span>Số lượng</span>
          <span>Đơn giá</span>
          <span>Thành tiền</span>
          <span></span>
        </div>

        <div
          v-for="item in items"
          :key="item.id"
          class="cart-row"
        >
          <div class="cart-product">
            <img :src="item.image" :alt="item.name" />
            <div><h3>{{ item.name }}</h3></div>
          </div>

          <div class="cart-quantity">
            <button
              type="button"
              :aria-label="`Giảm ${item.name}`"
              @click="emit('change', item.id, -1)"
            >
              −
            </button>
            <span>{{ item.quantity }}</span>
            <button
              type="button"
              :aria-label="`Tăng ${item.name}`"
              @click="emit('change', item.id, 1)"
            >
              +
            </button>
          </div>

          <span class="cart-price">
            {{ item.price.toLocaleString('vi-VN') }} đ
          </span>
          <strong class="line-total">
            {{ (item.price * item.quantity).toLocaleString('vi-VN') }} đ
          </strong>
          <button
            type="button"
            class="remove-item"
            :aria-label="`Xóa ${item.name}`"
            @click="emit('remove', item.id)"
          >
            Xóa
          </button>
        </div>

        <div class="cart-summary">
          <button type="button" class="text-button" @click="emit('clear')">
            Xóa hết
          </button>
          <div>
            <span>Tổng tiền</span>
            <strong>{{ total.toLocaleString('vi-VN') }} đ</strong>
          </div>
        </div>

        <div class="cart-bottom">
          <button
            class="button button-secondary"
            type="button"
            @click="emit('close')"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>

      <div v-else class="empty-cart">
        <h3>Giỏ hàng đang trống</h3>
        <p>Thêm vài món bạn thích để bắt đầu nhé.</p>
        <button
          class="button button-primary"
          type="button"
          @click="emit('close')"
        >
          Tiếp tục mua sắm
        </button>
      </div>
  </section>
</template>
