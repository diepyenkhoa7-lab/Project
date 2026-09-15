
<template>
  <main class="wrapper">
    <section>
    <h3 style="color: lightblue;">1. Duyệt mảng kèm chỉ số index và gán :key</h3>
    <ul>
      <li v-for="(item, index) in tasks" :key="item.id">
        Thứ tự: {{ index + 1 }} - Công việc: {{ item.title }}
      </li>
    </ul>
    </section>
    <hr />

    <section>
    <h3 style="color: aquamarine;">2. Duyệt qua đối tượng (value, key)</h3>
    <ul>
      <li v-for="(value, key) in bookInfo" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>

    <hr />
    </section>


    <section>
    <h3 style="color: pink;">3. Lọc danh sách công việc đã hoàn thành (Dùng Computed)</h3>
    <ul>
      <li v-for="item in completedTasks" :key="item.id">
        ✔️ {{ item.title }}
      </li>
    </ul>
  </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
const tasks = ref([
  { id: 1, title: 'Học Vue 3', completed: true },
  { id: 2, title: 'Làm bài tập v-for', completed: false },
  { id: 3, title: 'Ôn tập computed', completed: true }
])

const bookInfo = ref({
  title: 'Lập trình Vue 3 căn bản',
  author: 'Nguyễn Văn A',
  year: 2026
})

const completedTasks = computed(() => {
  return tasks.value.filter(task => task.completed)
})
</script>

<style scoped>
.wrapper {
  font-family: Arial, sans-serif;
  padding: 20px;
  line-height: 1.6;
}

h2 {
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 8px;
}

ul {
  margin-top: 5px;
  padding-left: 20px;
}

li {
  margin-bottom: 4px;
}

hr {
  border: none;
  border-top: 1px solid #7be3e1;
  margin: 15px 0;
}
</style>