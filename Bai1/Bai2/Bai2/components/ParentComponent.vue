<script setup>
import { computed, ref, watch } from 'vue'
import ChildComponent from './ChildComponent.vue'

const STORAGE_KEY = 'bai2-todo-tasks'

function loadTasks() {
  try {
    const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(storedTasks) ? storedTasks : []
  } catch {
    return []
  }
}

const tasks = ref(loadTasks())
const filter = ref('all')
const completedCount = computed(() => tasks.value.filter(task => task.completed).length)
const activeTasks = computed(() => tasks.value.filter(task => !task.completed))
const completedTasks = computed(() => tasks.value.filter(task => task.completed))
const visibleTasks = computed(() => {
  if (filter.value === 'active') return activeTasks.value
  if (filter.value === 'completed') return completedTasks.value
  return tasks.value
})

const taskStatus = computed(() => tasks.value.length
  ? `Đã hoàn thành ${completedCount.value}/${tasks.value.length} công việc`
  : 'Chưa có công việc nào.')

watch(tasks, currentTasks => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTasks))
}, { deep: true })

function addTask(name) {
  tasks.value.push({ id: `${Date.now()}-${Math.random()}`, name, completed: false })
}

function toggleTask(id) {
  const task = tasks.value.find(item => item.id === id)
  if (task) task.completed = !task.completed
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

function clearCompleted() {
  tasks.value = activeTasks.value
}
</script>

<template>
  <main class="page-shell">
    <section class="todo-card">
      <header class="app-header">
        <div class="brand-mark" aria-hidden="true">✓</div>
        <div>
          <p class="eyebrow">GỌN GÀNG MỖI NGÀY</p>
          <h1>Danh sách công việc</h1>
          <p class="subtitle">Ghi lại điều cần làm, hoàn thành từng việc một.</p>
        </div>
      </header>

      <div class="progress-panel">
        <div>
          <span class="progress-label">Tiến độ hôm nay</span>
          <strong>{{ taskStatus }}</strong>
        </div>
        <span class="progress-count">{{ completedCount }}<small>/{{ tasks.length }}</small></span>
      </div>

      <ChildComponent :tasks="tasks" @add-task="addTask" />

      <div class="list-toolbar">
        <h2>Công việc <span>{{ visibleTasks.length }}</span></h2>
        <div class="filters" aria-label="Lọc công việc">
          <button
            v-for="item in [{ id: 'all', label: 'Tất cả' }, { id: 'active', label: 'Cần làm' }, { id: 'completed', label: 'Hoàn thành' }]"
            :key="item.id"
            type="button"
            :class="{ selected: filter === item.id }"
            @click="filter = item.id"
          >{{ item.label }}</button>
        </div>
      </div>

      <ul v-if="visibleTasks.length" class="task-list">
        <li v-for="task in visibleTasks" :key="task.id" class="task-row" :class="{ done: task.completed }">
          <label class="task-main">
            <input type="checkbox" :checked="task.completed" @change="toggleTask(task.id)">
            <span class="custom-check" aria-hidden="true">✓</span>
            <span class="task-name">{{ task.name }}</span>
          </label>
          <button class="delete-button" type="button" :aria-label="'Xóa ' + task.name" @click="deleteTask(task.id)">×</button>
        </li>
      </ul>
      <div v-else class="empty-state">
        <span class="empty-icon">{{ filter === 'completed' ? '✦' : '☀' }}</span>
        <strong>{{ tasks.length === 0 ? 'Bắt đầu từ một việc nhỏ' : filter === 'active' ? 'Bạn đã hoàn thành mọi việc!' : filter === 'completed' ? 'Chưa có việc nào hoàn thành' : 'Danh sách đang trống' }}</strong>
        <p>{{ tasks.length === 0 ? 'Thêm công việc đầu tiên của bạn ở phía trên nhé.' : 'Các công việc phù hợp sẽ xuất hiện ở đây.' }}</p>
      </div>

      <footer v-if="tasks.length" class="list-footer">
        <span>Còn {{ activeTasks.length }} việc cần làm</span>
        <button v-if="completedCount" type="button" @click="clearCompleted">Xóa việc đã xong</button>
      </footer>
    </section>
    <p class="page-note">Tập trung vào điều quan trọng nhất.</p>
  </main>
</template>
