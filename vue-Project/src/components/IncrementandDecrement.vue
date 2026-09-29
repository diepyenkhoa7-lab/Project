<script setup>
import { ref, watch } from 'vue'
const count = ref(0)
const logMessage = ref('Chua co thay doi nao')
// Ham tang gia tri
function increment() {
    count.value++
}
// Ham giam
function decrement() {
    count.value--
}
// watch theo doi su thay doi cua count
watch(count, (newValue, oldValue) => {
    const msg = `count da thay doi tu ${oldValue} thanh ${newValue}`

    // 1. In ra DevTools Console(F12)
    console.log(msg)
    // 2. gan vao bien de hien thi truc tiep len giao dien
    logMessage.value = msg
})

</script>


<template>
    <div style="padding: 20px; font-family: sans-serif;">
        <h2> Gia tri hien tai: {{ count }}</h2>
        <!--Cac nut theo tac thay doi count-->>
        <button @click="increment">+ Tang</button>
        <button @click="decrement" style="margin-left: 8px;">- Giam</button>
        <button @click="count = 0" style="margin-left: 8px;">Reset ve 0</button>
        <!--Hien thi log cua watch ngay tren man hinh-->>
        <p styl="color: blue; margin-top: 15px;">
            <strong>Nhat Ky Watch:</strong> {{ logMessage }}
        </p>
    </div>
</template>