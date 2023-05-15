<template>
  <a-radio-group direction="vertical">
    <a-radio v-for="publicKey in publicKeys" :value="publicKey">
      {{ publicKey }}
    </a-radio>
  </a-radio-group>
</template>

<script lang="ts" setup>
// import { reactive } from "vue";
import { ethers } from "ethers";

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
