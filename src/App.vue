<script setup lang='ts'>
import 'src/assets/styles/app.css'
import { onBeforeMount } from 'vue'
import { useBoardStore } from './store/board'
onBeforeMount(async () => useBoardStore().fetch())
</script>

<template>
  <router-view></router-view>
</template>
