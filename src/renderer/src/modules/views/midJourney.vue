<template>
  <show-url :src="state.src"></show-url>
</template>

<script setup>
import ShowUrl from "../../components/showUrl.vue";
import {reactive} from "vue";

const state = reactive({
  src:'https://www.midjourney.com/home/',
})
</script>

<style scoped>

</style>
