<script setup>
import { ref, watch} from 'vue'
const userProfile = ref({
    id: 1,
    settings: {
        theme: 'dark',
        notification: true
    }
})
// Bien luu log de hien thi truc tiep ra man hinh
const logMessage = ref('')

watch(
    userProfile,
    (newVal) => {
        const text = `Theme: "${newVal.settings.theme}", Thong bao:
    ${newVal.settings.notification ? 'Bat' : 'Tat'}`
    // 1. In ra Devtools
    console.log('Thong tin cai dat ben trong da thay doi: ', newVal.settings)
    // 2. Cap naht
    logMessage.value = text
    },
    {
        deep: true, // bat thay doi o cac thuoc tinh long sau(settings.theme, settings.notifications)
        immediate: true // chay nagy 1 lan luc vua load
    }
)
</script>

<template>
    <div class="card" :class="userProfile.settings.theme">
        <h2>Cai dat nguoi dung</h2>
        <!--Lua chon theme-->>
    <div class="settings-item">
        <label><strong>Che do giao dien:</strong></label>
        <select v-model="userProfile.settings.theme">
            <option value="light">sang (Light)</option>
            <option value="dark">toi (Dark)</option>
        </select>
    </div>
    <!--Toggle B/T thong bao-->>
    <div class="setting-item">
        <label>
            <input type="checkbox" v-model="userProfile.settings.notification" />
            <strong>Nhan thong bao</strong>
        </label>
    </div> 
    <!--Trang thai phan ung truc tiep tu watch-->>
    <div class="log-box">
        <p class="title"> Nhat ky watch (nho deep & immediate):</p>
        <p class="content">{{ logMessage }}</p>
    </div>
    </div>
</template>
<style scoped>
.card {
    max-width: 420px;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #ccc;
    font-family: sans-serif;
    transition: all 0.3s ease;
}
/* Hieu ung theme sang */
.card.light {
    background-color: #ffffff;
    color: #222222;
}
/* hieu ung theme toi*/
.card.dark {
    background-color: #1e1e24;
    color: #f0f0f0;
    border-color: #333;
}
.setting-item {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
}
select {
    padding: 6px 12px;
    border-radius: 6px;
}
.log-box {
    margin-top: 20px;
    padding: 12px;
    border-radius: 8px;
    background-color: rgba(66, 184, 131, 0.15);
    border-left: 4px solid #42b883;
}
.log-box .title {
    font-size: 13px;
    margin: 0 0 6px 0;
    color: #42b883;
    font-weight: bold;
}
.log-box .content {
    margin: 0;
    font-family: monospace;
}
</style>