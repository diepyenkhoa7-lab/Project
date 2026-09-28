<template>
  <div class="todo-container">
    <!-- Tiêu đề -->
    <h1 class="title">To-Do List</h1>

    <!-- Khung nhập-->
    <div class="input-box">
      <!-- v-model: ràng buộc dữ liệu ô nhập -->
      <!-- v-bind: ràng buộc thuộc tính placeholder -->
      <!-- v-on: bắt sự kiện gõ Enter -->
      <input 
        type="text" 
        class="input-add" 
        v-model="newTaskText" 
        v-bind:placeholder="placeholderText"
        v-on:keyup.enter="addTask"
      />
      <!-- v-on: click nút Add -->
      <button class="btn-add" v-on:click="addTask">Add</button>
    </div>

    <!-- Danh sách công việc -->
    <div class="task-list">
      <!-- v-for: duyệt danh sách công việc -->
      <!-- v-bind: gán khóa key duy nhất -->
      <div 
        class="task-item" 
        v-for="(task, index) in tasks" 
        v-bind:key="task.id"
      >
        <div class="task-input-wrap">
          <!-- v-model: cho phép sửa trực tiếp tên công việc -->
          <input 
            type="text" 
            class="task-input" 
            v-model="task.text"
          />
        </div>
        <!-- v-on: click xóa công việc theo index -->
        <button class="btn-delete" v-on:click="deleteTask(index)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      placeholderText: 'Add a new task',
      newTaskText: '',
      // Dữ liệu ban đầu
      tasks: [
        { id: 1, text: 'Học javascript' },
        { id: 2, text: 'Học Vue 3' },
        { id: 3, text: 'Học PHP' },
        { id: 4, text: 'Học Typescript' }
      ]
    };
  },
  methods: {
    // Thêm việc mới
    addTask() {
      if (this.newTaskText.trim() !== '') {
        this.tasks.push({
          id: Date.now(),
          text: this.newTaskText.trim()
        });
        this.newTaskText = '';
      }
    },
    // Xóa việc theo chỉ số index
    deleteTask(index) {
      this.tasks.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.todo-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 15px;
  font-family: Arial, sans-serif;
  color: #c08ca7;
}

.title {
  text-align: center;
  font-weight: normal;
  margin-bottom: 24px;
}

.input-box {
  display: flex;
  border: 1px solid #ced4da;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
}

.input-add {
  flex: 1;
  border: none;
  padding: 8px 12px;
  outline: none;
  font-size: 14px;
}

.btn-add {
  background-color: #0d6efd;
  color: white;
  border: none;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
}

.btn-add:hover {
  background-color: #0b5ed7;
}

.task-list {
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 12px;
  background-color: #ffffff;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
}

.task-item:last-child {
  margin-bottom: 0;
}

.task-input-wrap {
  flex: 1;
  margin-right: 12px;
}

.task-input {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 6px 12px;
  outline: none;
  box-sizing: border-box;
}

.task-input:focus {
  border-color: #86b7fe;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  cursor: pointer;
  font-size: 14px;
}

.btn-delete:hover {
  background-color: #bb2d3b;
}
</style>