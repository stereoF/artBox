<template>
  <div>
    <a-badge v-if="portStatus" status="success" text="port connected" />
    <a-badge v-else status="danger" text="port disconnected" />
  </div>
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
import { useStringParser } from "../../scripts/stringParser";
import { storeToRefs } from 'pinia'

let store = useKeysStore();
let { toHexString } = useStringParser();

let value = ref(0);
let { publicKey } = storeToRefs(store);

let portStatus = ref(await window.electronAPI.isPortOpen());

async function getPublicKey() {
  let resultBytes = await window.electronAPI.serialPortComm([0x4e, 0x4b, value.value]);
  let publicKeyString = toHexString(resultBytes);
  // let publicKeyString = resultBytes.toString();
  publicKey.value = publicKeyString;
  store.setPublicKey(publicKeyString);
  store.setSerialNum(value.value);
  store.setPublicKeyBytes(resultBytes);
}

</script>

<style scoped></style>
