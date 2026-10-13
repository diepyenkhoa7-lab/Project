<template>
  <header class="navbar-container">
    <div class="logo">
      <span>MyApp</span>
    </div>
    <nav class="nav-links">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/about" class="nav-item">About</router-link>
      <router-link to="/contact" class="nav-item">Contact</router-link>
    </nav>
  </header>
</template>

<script setup>
// Với <script setup>, không cần export default hay components/setup function
</script>

<style scoped>
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b;
  padding: 14px 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #38bdf8;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 6px 14px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.08);
}

/* Class active tự động khi route đang khớp */
.router-link-active {
  color: #38bdf8;
  background-color: rgba(56, 189, 248, 0.15);
  font-weight: 600;
}
</style>