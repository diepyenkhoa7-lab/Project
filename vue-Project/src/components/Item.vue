<template>

  <div class="product">

    <!-- Hình sản phẩm -->
    <img :src="product.image" alt="Socks">

    <!-- Tên sản phẩm -->
    <h1>{{ product.name }}</h1>

    <!-- Mô tả -->
    <p class="description">
      {{ product.description }}
    </p>

    <!-- Số lượng -->
    <h2>
      Số lượng mua: {{ quantity }}
    </h2>

    <!-- Trạng thái -->
    <p
      class="status"
      :class="statusClass"
    >
      {{ stockStatus }}
    </p>

    <!-- Nút -->
    <div class="buttons">

      <button
        class="increase"
        @click="increase"
      >
        Increase
      </button>

      <button
        class="decrease"
        @click="decrease"
      >
        Decrease
      </button>

    </div>

  </div>

</template>


<script setup>

import { reactive, ref, computed } from "vue";

const product = reactive({

  name: "Socks",

  description:
    "Kiểu dệt Mesh tại phần bắp chân và lòng bàn chân mang đến sự êm hơn và thoáng khí hơn",

  image: "/src/assets/socks.png",

  maxQuantity: 100000

});


const quantity = ref(0);

function increase() {

  if (quantity.value < product.maxQuantity) {

    quantity.value++;

  }

}

function decrease() {

  if (quantity.value > 0) {

    quantity.value--;

  }

}

const stockStatus = computed(() => {

  if (quantity.value >= product.maxQuantity) {

    return "Hết hàng";

  }

  return "Còn hàng";

});

const statusClass = computed(() => {

  if (quantity.value >= product.maxQuantity) {

    return "out";

  }

  return "in";

});

</script>


<style scoped>

.product {

  width: 500px;

  margin: 40px auto;

  padding: 30px;

  text-align: center;

  background-color: rgb(11, 12, 12);

  border-radius: 20px;

  box-shadow: 0 2px 15px #e70d0d;

}


/* Hình sản phẩm */

.product img {

  width: 300px;

  height: 300px;

  object-fit: contain;

}


/* Tên sản phẩm */

h1 {

  font-size: 28px;

  margin: 10px 0;

}


/* Mô tả */

.description { font-size: 16px; color: #edebeb; line-height: 1.5;}

h2 {

  font-size: 28px; margin-top: 20px;
}

.status { font-size: 18px; font-weight: bold;}

.in {

  color: green;

}

.out {

  color: red;

}

.buttons {

  display: flex;

  justify-content: center;

  gap: 15px;

  margin-top: 20px;

}

button {

  width: 130px;

  height: 40px;

  border: none;

  border-radius: 5px;

  color: white;

  font-size: 16px;

  cursor: pointer;

}

.increase {background-color: #20b34b;}

.decrease { background-color: #e83d4f;}

</style>