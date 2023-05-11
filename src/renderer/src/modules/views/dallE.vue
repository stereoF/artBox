<template>
  <show-url :src="state.src"></show-url>
</template>

<script setup>
import ShowUrl from "../../components/showUrl.vue";
import {reactive} from "vue";

const state = reactive({
  src:'https://openai.com/product/dall-e-2',
})
</script>

<style scoped>

</style>
