<template>
  <a-button type="primary" @click="selectImg">Select Image</a-button>
  <p>Image CID: {{ fileInfo.cid }}</p>
  <img
    :src="'file://' + fileInfo.srcPath"
    alt="The picture needs to signature"
  />
</template>

<script lang="ts" setup>
import { reactive } from "vue";

let fileInfo = reactive({
  cid: "",
  path: "",
  srcPath: "",
});

const selectImg = async () => {
  let fileInfo2 = await window.electronAPI.openFile();
  fileInfo.cid = fileInfo2.cid;
  fileInfo.path = fileInfo2.path;
  fileInfo.srcPath = fileInfo2.srcPath;
  // imgBase.value = fileInfo.content;
};
</script>

<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  /* padding: 40px; */
  background-color: var(--color-neutral-2);
}
</style>
