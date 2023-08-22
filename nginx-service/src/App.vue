<template>
  <div>请求结果：{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const msg = ref('');
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 10000,
});

request({
  url: '/api/v1/user',
  method: 'get',
}).then((res) => {
  msg.value = res.data.data;
});
</script>

<style scoped></style>
