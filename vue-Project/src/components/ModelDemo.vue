<template>
    <input v-model.lazy="bio" placeholder="Enter something..." />
    <p>You entered: {{ bio}}</p>
</template>

<script setup>
import { ref } from 'vue';
const bio = ref('');
</script>