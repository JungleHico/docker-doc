<template>
  <img :src="src" />
</template>

<script lang="ts" name="Home"></script>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const src = ref('');
axios({
  url: 'http://localhost:3000/map-tile?x=6&y=3&z=3',
  method: 'get',
}).then((res) => {
  console.log(res);
});
</script>

<style scoped></style>
