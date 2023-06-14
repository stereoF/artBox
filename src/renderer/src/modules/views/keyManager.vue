<template>
  <a-radio-group direction="vertical">
    <a-radio v-for="publicKey in publicKeys" :value="publicKey">
      {{ publicKey }}
    </a-radio>
  </a-radio-group>
  <a-button type="primary" @click="send2Port">send to port</a-button>
</template>

<script lang="ts" setup>
// import { reactive, ref } from "vue";
// import { storeToRefs } from 'pinia';
// import { useSerialPortStore } from "@renderer/store/serialPort";
import { ethers } from "ethers";

// let store = useSerialPortStore();
// let { portPath } = storeToRefs(store);

function send2Port() {
  window.electronAPI.serialPortComm([0x4e,0x4b,0x127]);
}

// function getAllKeys() {
//   console.log(portPath.value);
//   window.electronAPI.serialPortComm(portPath.value, [0x4e,0x4b,0x01]);
// }


let privateKeys = [
  "93030c2db7ee1564b43693f99776a27112059dcd9c5cec8052f13444c991e0e7",
  "ed8b76f4de88432ed45aa3ec420af4d48ea1f46a0175f345662f915b198b94d5",
  "da8a9b0cedfebb0ea13a984034815d637236abb03251457fc6504ff4df7aac22",
];

let publicKeys = privateKeys.map((privateKey) => {
  let signer = new ethers.Wallet(privateKey);
  let publicKey = signer.address;
  return publicKey;
});
</script>

<style scoped></style>
