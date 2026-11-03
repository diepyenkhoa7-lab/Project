<template>
  <div id="app">
    <!-- <UserList /> -->
    <ProductList />
  </div>
</template>

<!--script>
//import UserList from './components/UserList.vue';

export default {
  name: 'App',
  components: {
    UserList
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 40px;
}
</style-->

<script>
import ProductList from './components/ProductList.vue';

export default {
  name: 'App',
  components: {
    ProductList
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}
</style>
