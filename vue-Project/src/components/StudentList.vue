<template>
  <div class="container">
    <h2>QUẢN LÝ SINH VIÊN</h2>
    <!-- FORM -->
    <div class="form">
      <label>Họ và tên</label>
      <input
        type="text"
        v-model="student.name"
        placeholder="Nhập tên vào đây"
      >
      <label>Ngày sinh</label>
      <input
        type="date"
        v-model="student.birth"
      >
      <label>Điểm</label>
      <input
        type="number"
        v-model="student.score"
        min="0"
        max="10"
        step="0.1"
      >
      <!-- BUTTON -->
      <div class="buttons">
        <button @click="addStudent">Thêm</button>
        <button @click="editStudent">Sửa</button>
        <button @click="deleteStudent">Xóa</button>
        <button @click="cancel">Hủy</button>
        <button @click="newStudent">Reset</button>
      </div>
      <!-- THÔNG BÁO -->
      <div v-if="message != ''" class="message">
        {{ message }}
      </div>
    </div>
    <!-- BẢNG -->
    <table>
      <thead>
        <tr>
          <th>Họ và tên</th>
          <th>Ngày sinh</th>
          <th>Điểm</th>
          <th>Xếp loại</th>
          <th></th>
        </tr>
      </thead>

      <tbody>

        <tr
          v-for="(item, index) in students"
          :key="index"
        >

          <td>{{ item.name }}</td>

          <td>{{ item.birth }}</td>

          <td>{{ item.score }}</td>

          <td>{{ classify(item.score) }}</td>

          <td>
            <button
              class="edit-link"
              @click="selectStudent(index)"
            >
              Sửa
            </button>
          </td>

        </tr>

      </tbody>

    </table>

  </div>
</template>


<script>
export default {

  data() {

    return {

      // Danh sách sinh viên
      students: [
        {
          name: "Nguyễn Văn Tèo",
          birth: "1995-01-20",
          score: 8.5
        },

        {
          name: "Phạm Thị Nở",
          birth: "1985-11-15",
          score: 7.5
        }
      ],

      // Dữ liệu trên form
      student: {
        name: "",
        birth: "",
        score: ""
      },

      // Vị trí sinh viên đang sửa
      editIndex: -1,

      // Thông báo lỗi
      message: ""
    };
  },


  methods: {

    // KIỂM TRA DỮ LIỆU
    checkData() {

      if (
        this.student.name == "" ||
        this.student.birth == "" ||
        this.student.score == ""
      ) {

        this.message = "Nhập đầy đủ";

        return false;
      }

      let score = Number(this.student.score);

      if (score < 0 || score > 10) {

        this.message = "Điểm phải từ 0 đến 10";

        return false;
      }

      this.message = "";

      return true;
    },


    // THÊM
    addStudent() {

      if (!this.checkData()) {
        return;
      }

      let newStudent = {

        name: this.student.name,

        birth: this.student.birth,

        score: Number(this.student.score)

      };

      this.students.push(newStudent);

      this.newStudent();
    },


    // CHỌN SINH VIÊN
    selectStudent(index) {

      this.editIndex = index;

      this.student.name =
        this.students[index].name;

      this.student.birth =
        this.students[index].birth;

      this.student.score =
        this.students[index].score;

      this.message = "";
    },


    // SỬA
    editStudent() {

      if (this.editIndex == -1) {

        this.message =
          "Hãy chọn sinh viên cần sửa";

        return;
      }

      if (!this.checkData()) {
        return;
      }

      this.students[this.editIndex].name =
        this.student.name;

      this.students[this.editIndex].birth =
        this.student.birth;

      this.students[this.editIndex].score =
        Number(this.student.score);

      this.newStudent();
    },


    // XÓA
    deleteStudent() {

      if (this.editIndex == -1) {

        this.message =
          "Hãy chọn sinh viên cần xóa";

        return;
      }

      this.students.splice(this.editIndex, 1);

      this.newStudent();
    },


    // HỦY
    cancel() {

      this.newStudent();
    },


    // MỚI
    newStudent() {

      this.student.name = "";

      this.student.birth = "";

      this.student.score = "";

      this.editIndex = -1;

      this.message = "";
    },


    // XẾP LOẠI
    classify(score) {

      score = Number(score);

      if (score < 5) {
        return "Yếu/Kém";
      }

      if (score >= 5 && score <= 8) {
        return "Khá/Trung bình";
      }

      if (score > 8) {
        return "Giỏi/xuất sắc";
      }

      return "";
    }

  }

};
</script>


<style scoped>

.container {
  width: 700px;
  margin: 30px auto;
  font-family: Arial;
}

h2 {
  text-align: center;
}

.form {
  border: 1px solid #ccc;
  padding: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
}

input {
  width: 100%;
  height: 38px;
  padding: 8px;
  box-sizing: border-box;
}

.buttons {
  margin-top: 20px;
}

.buttons button {
  padding: 8px 20px;
  margin-right: 5px;
  cursor: pointer;
}

.message {
  margin-top: 15px;
  padding: 12px;
  background-color: #f8d7da;
  color: #842029;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

th,
td {
  border-bottom: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #f5f5f5;
}

.edit-link {
  border: none;
  background: none;
  color: #087ea4;
  cursor: pointer;
}

</style>