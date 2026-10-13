<template>
  <div class="container">

    <h1>Task Management</h1>

    <!-- Nhập nhiệm vụ -->
    <input
      type="text"
      v-model="newTask"
      @keyup.enter="addTask"
      placeholder="Enter a new task"
    >

    <!-- Danh sách nhiệm vụ -->
    <div class="task-list">

      <div
        class="task"
        v-for="(task, index) in tasks"
        :key="index"
      >

        <!-- Tên nhiệm vụ -->
        <span
          @click="completeTask(index)"
          :class="{ completed: task.completed }"
        >
          {{ task.name }}
        </span>

        <!-- Nút xóa -->
        <button @click="deleteTask(index)">
          X
        </button>

      </div>

    </div>

    <!-- Thống kê -->
    <div class="total">

      <p>
        Total Tasks: {{ tasks.length }}
      </p>

      <p>
        Completed Tasks: {{ completedTasks }}
      </p>

    </div>

  </div>
</template>


<script setup>

import { ref, computed } from "vue";


// Ô nhập nhiệm vụ
const newTask = ref("");


// Danh sách nhiệm vụ
const tasks = ref([
  {
    name: "Học javascript",
    completed: false
  },

  {
    name: "Học PHP",
    completed: true
  },

  {
    name: "Học Java",
    completed: false
  },

  {
    name: "Học Vuejs",
    completed: true
  }
]);


// ==========================
// THÊM NHIỆM VỤ
// ==========================

function addTask() {

  // Nếu ô nhập không rỗng
  if (newTask.value.trim() != "") {

    // Thêm nhiệm vụ
    tasks.value.push({

      name: newTask.value,

      completed: false

    });

    // Xóa ô nhập
    newTask.value = "";
  }

}
function completeTask(index) {

  tasks.value[index].completed =
    !tasks.value[index].completed;

}


function deleteTask(index) {

  tasks.value.splice(index, 1);

}

const completedTasks = computed(() => {

  let count = 0;

  for (let i = 0; i < tasks.value.length; i++) {

    if (tasks.value[i].completed == true) {
      count++;
    }

  }

  return count;

});

</script>


<style scoped>

.container {
  width: 550px;
  margin: 50px auto;
  padding: 35px;
  background-color: rgb(233, 184, 215);
  border-radius: 20px;
  box-shadow: 0 2px 15px #e4e2e2;
}

h1 {
  text-align: center;
  color: #040505;
  margin-bottom: 30px;
}

input {
  width: 100%;
  height: 45px;
  padding: 10px 15px;
  border: 1px solid #9cc;
  border-radius: 25px;
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
}

.task-list {
  margin-top: 20px;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  border-bottom: 1px solid #d178cd;
}

.task span {
  font-size: 18px;
  cursor: pointer;
}

.task button {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background-color: #e74c3c;
  color: rgb(112, 193, 199);
  font-size: 18px;
  cursor: pointer;
}

.task button:hover {
  background-color: #c0392b;
}

.completed {
  text-decoration: line-through;
  color: #507ce1;
}

.total {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #507ce1;
}

.total p {
  margin: 8px;
}

</style>