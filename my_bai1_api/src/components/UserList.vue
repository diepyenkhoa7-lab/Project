<template>
  <div class="user-list-container">
    <h1>Danh Sách Người Dùng</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
//import axios from 'axios';

export default {
  name: 'UserList',
  data() {
    return {
      users: []
    };
  },
  mounted() {
    // Gọi API lấy danh sách người dùng mẫu từ JSONPlaceholder
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error('Lỗi kết nối API:', error);
      });
  }
};
</script>

<style scoped>
.user-list-container {
  text-align: center;
  font-family: Arial, sans-serif;
  margin-top: 20px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

ul {
  list-style-type: disc;
  display: inline-block;
  text-align: left;
  line-height: 1.8;
  font-size: 1.1rem;
}
</style>