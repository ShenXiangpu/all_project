<template>
  <n-message-provider>
    <router-view />
  </n-message-provider>
</template>

<script setup>
import { NMessageProvider } from 'naive-ui'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  width: 100%;
}
</style>
