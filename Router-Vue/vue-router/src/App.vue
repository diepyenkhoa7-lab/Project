<template>
  <div class="app-layout">
    <!-- Navbar Component được tự động nhận diện -->
    <TheNavBar />

    <!-- Nơi render nội dung của router -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import TheNavBar from './components/TheNavBar.vue';
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background-color: #f8fafc;
}

.main-content {
  max-width: 960px;
  margin: 32px auto;
  padding: 0 20px;
}
</style>
