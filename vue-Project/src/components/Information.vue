<script setup>
import { ref, watch } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// Bien luu thong bao de hien thi truc tiep len giao dien
const changeLog = ref('Chua co thay doi nao')
// Theo doi dong thoi ca 2 bien FirstName va lastName
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
    const message = `Ten da doi tu "${oldFirst} ${oldLast}" sang "${newFirst} ${newLast}"`
    // 1. In ra man hinh
    console.log(message)
    // 2. Cap nhat
    changeLog.value = message
})
</script>

<template>
    <div class="user-form">
        <h2>Thong tin nguoi dung</h2>

        <!-- o nhap lieu de nguoi dung thay doi gia tri-->>
         <div class="form-group">
            <label>First Name: </label>
            <input v-model.lazy="firstName" placeolder="Nhap ho..."/>
        </div>
        <div class="form-group">
            <label>LastName: </label>
            <input v-model.lazy="lastName" placeolder="Nhap ten..."/>
        </div>
        <!--hien thi ten hien tai-->>
        <p>
            <strong>Ho va ten hien tai:</strong> {{ firstName }} {{ lastName }}
        </p>

        <!--Hien thi log cua watch-->>
        <div class="log-box">
            <strong>Nhat ky thay doi (watch):</strong>
            <p clas="log-text">{{ changeLog }}</p>
        </div>
    </div>
</template>

<style scoped>
.user-form {
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: sans-serif;
}
.form-group {
    margin-bottom: 12px;
}
.form-group label {
    display: inline-block;
    width: 90px;
}
.form-group input {
    padding: 6px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.log-box {
    margin-top: 16px;
    padding: 10px;
    background-color: #725fbe;
    border-left: 4px solid #42b883;
    border-radius: 4px;
}
.log-text {
    margin: 6px 0 0 0;
    color: #9be6ea;
    font-style: italic;
}
</style>