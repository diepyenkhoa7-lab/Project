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
<!--script setup>
//import Array from './components/Array.vue'
import ProductList from './components/ProductList.vue'
</script>

<template>
  <div id="app">
    <ProductList />
  </div>
</template-->
<!--template>
  <main>
    <TodoList />
  </main>
</template>

<script>
import TodoList from './components/ToDoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
};
</script>

<style>
body {
  margin: 0;
  background-color: #f8f9fa;
}
</style-->
<!--script setup>
//import UserStatus from './components/UserStatus.vue'
//import ModelDemo from './components/ModelDemo.vue';
import Card from './components/Card.vue';
</script>

<template>
  <div id="app">
    <Card />
  </div>
</template-->


<!--script setup>
import { ref, computed } from 'vue'
const searchQuery = ref('')
const products = ref([
  {id: 1, name: 'Ban phim co', inStock: true},
  {id: 2, name: 'Chuot kh day', inStock: false},
  {id: 3, name: 'dua hau', inStock: true}
])
//
const filteredProduct = computed(() => {
  return products.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>


<template>
  <input v-model="searchQuery" placeholder="Tim kiem san pham  "/>
  <ul>
    <li v-for="item in filteredProduct" :key="item.id">
      {{ item.name }} - {{ item.inStock ? 'con hang' : 'het hang'}}
    </li>
  </ul>
</template-->
<!--script setup>
import ProductManagement from './components/ProductManagement.vue'
</script>

<template>
  <div id="app">
    <ProductManagement />
  </div>
</template>

<style>
html,
body,
#app {
  margin: 0;
  min-height: 100%;
  background: #f3f3f3;
  font-family: Arial, sans-serif;
}

body {
  min-height: 100vh;
}
</style-->






<!--ORDERFROM-->
<!--script setup>
import OrderFrom from './components/OrderFrom.vue'
</script>

<template>
  <OrderFrom />
</template>

<style>
html,
body,
#app {
  min-width: 320px;
  min-height: 100%;
  margin: 0;
}

#app {
  display: block;
  max-width: none;
  padding: 0;
}

body {
  display: block;
}
</style-->








<!--LIST AND GRID-->>
<!--script setup>
import LayoutListAndGrid from './components/LayoutListAndGrid.vue'
</script>

<template>
  <LayoutListAndGrid />
</template-->



<!--MASTERY SOCKS-->>
<!--script setup>
import MasterySocks from './components/MasterySocks.vue'
</script>

<template>
  <MasterySocks />
</template-->


// Increment va Decrement
<!--script setup>
import IncrementandDecrement from './components/IncrementandDecrement.vue';
</script>

<template>
  <IncrementandDecrement />
</template-->

// Information
<!--script setup>
import Information from './components/Information.vue';
</script>

<template>
  <Information />
</template-->

//UserSetting
<script setup>
import UserSetting from './components/UserSetting.vue';
</script>

<template>
  <UserSetting />
</template>