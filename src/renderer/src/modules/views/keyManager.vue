<template>
  <a-select
    v-model="value"
    :style="{ width: '320px' }"
    placeholder="Please select ..."
  >
    <a-option v-for="item of 128" :value="item-1" :label="item.toString()" />
  </a-select>
  <a-button type="primary" @click="getPublicKey">get public key</a-button>
  <div>
    Your public key: {{ publicKey }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useKeysStore } from "@renderer/store/keys.ts";

let store = useKeysStore();

let value = ref(0);
let publicKey = ref();

async function getPublicKey() {
  console.log(value.value);
  let keyValue = await window.electronAPI.serialPortComm([0x4e, 0x4b, value.value]);
  console.log(keyValue);
  publicKey.value = keyValue;
  store.setPublicKey(keyValue);
  store.setSerialNum(value.value);
}

</script>

<style scoped></style>
