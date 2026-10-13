<template>
  <div class="container">

    <!-- Ô 1 -->
    <div class="box">

      <h1>Counter: {{ counter1 }}</h1>

      <div class="buttons">
        <button @click="tang1">+</button>
        <button @click="giam1">-</button>
      </div>

      <p :class="color1">
        {{ status1 }}
      </p>

    </div>


    <!-- Ô 2 -->
    <div class="box">

      <h1>Counter: {{ counter2 }}</h1>

      <div class="buttons">
        <button @click="tang2">+</button>
        <button @click="giam2">-</button>
      </div>

      <p :class="color2">
        {{ status2 }}
      </p>

    </div>

  </div>
</template>


<script setup>

import { ref, reactive, computed } from "vue";


// ====================
// SỬ DỤNG REF
// ====================

const counter1 = ref(0);


// Tăng counter 1
function tang1() {
  counter1.value++;
}


// Giảm counter 1
function giam1() {
  counter1.value--;
}


// ====================
// SỬ DỤNG REACTIVE
// ====================

const counter2 = reactive({
  value: 0
});


// Tăng counter 2
function tang2() {
  counter2.value++;
}


// Giảm counter 2
function giam2() {
  counter2.value--;
}


// ====================
// COMPUTED
// ====================

// Kiểm tra counter 1
const status1 = computed(() => {

  if (counter1.value >= 0) {
    return "Số dương";
  }

  return "Số âm";

});


// Màu chữ counter 1
const color1 = computed(() => {

  if (counter1.value >= 0) {
    return "positive";
  }

  return "negative";

});


// Kiểm tra counter 2
const status2 = computed(() => {

  if (counter2.value >= 0) {
    return "Số dương";
  }

  return "Số âm";

});


// Màu chữ counter 2
const color2 = computed(() => {

  if (counter2.value >= 0) {
    return "positive";
  }

  return "negative";

});

</script>


<style scoped>

.container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
}

.box {
  width: 250px;
  padding: 30px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 10px #ddd;
}

h1 {
  font-size: 30px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 25px 0;
}

button {
  width: 50px;
  height: 45px;
  border: none;
  border-radius: 5px;
  font-size: 25px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}

p {
  font-size: 18px;
  font-weight: bold;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

</style>