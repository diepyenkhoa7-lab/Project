<!-- src/components/StudentInformation.vue -->
<template>
  <div class="student-container">
    <h2 class="title">THÔNG TIN SINH VIÊN</h2>
    
    <div class="image-wrapper">
      <img src="https://i.pinimg.com/736x/5a/bf/21/5abf219774a8c5a376ae081b70c7ccf6.jpg" alt="Hình ảnh sinh viên" />
    </div>

    <div class="info-content">
      <p><strong>Họ và tên :</strong> Nguyễn Nobita</p>
      <p><strong>Ngày sinh :</strong> 24/3/2004</p>
      <p><strong>Phái :</strong> Nam</p>
      <p><strong>Điểm :</strong> 8.5</p>
    </div>
  </div>
</template>

<script setup>
// Component hiển thị thông tin sinh viên
</script>

<style scoped>
/* Khung viền lớn ở bên ngoài ôm trọn toàn bộ nội dung */
.student-container {
  width: 350px;
  border: 6px solid #0044cc; /* Viền ngoài màu xanh dương */
  padding: 20px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  background-color: #fff;
}  

.title {
  text-align: center;
  color: #01084e;
  font-size: 20px;
  margin-bottom: 20px;
}

.image-wrapper {
  text-align: center;
  margin-bottom: 20px;
}

.image-wrapper img {
  max-width: 100%;
  height: auto;
}

.info-content p {
  font-size: 16px;
  margin: 10px 0;
  color: #000000;
}
.info-content p strong {
  color: #0044cc;
}
</style>