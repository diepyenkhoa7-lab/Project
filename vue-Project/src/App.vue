<!--template>
  <div>
    <button @click = "hienThi">
      <span v-if="show">An</span>
      <span v-else>Hien</span>

    </button>
    <p v-show="show">Noi dung hien thi</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
  const show = ref(false)
  const hienThi = () => {
    show.value = !show.value
  }
</script>

<style scoper>

</style-->

<!--script setup>
//import UserStatus from './components/UserStatus.vue'
</script>

<template>
  <div id="app">
    <UserStatus />
  </div>
</template>

<style>
#app {
  margin: 20px;
}
</style-->

<!--template>
  <div>
    <ul>
      <li v-for="item in productInfo" :key="item.name">
        <strong>{{ item.name }}</strong> - Price: {{ item.price }}
      </li>
    </ul>
  </div>
</template>
  <script setup>
import { ref } from 'vue'

    const productInfo = ref([
      { name: 'Durian',
       price: 100 
      },
      { name: 'Mango',
       price: 80 
      }, 
      { name: 'Passion Fruit',
       price: 50 
      }
    ])
</script-->
<script setup>
//import Array from './components/Array.vue'
import ProductList from './components/ProductList.vue'
</script>

<template>
  <div id="app">
    <ProductList />
  </div>
</template>