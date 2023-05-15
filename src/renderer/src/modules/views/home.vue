<template>
  <a-button type="primary" @click="selectImg">Select Image</a-button>
  <a-button v-if="fileInfo.cid != '' && signInfo.sign.length == 0" type="button" @click="signImg">Sign Image</a-button>
  <div v-if="fileInfo.cid != ''">
    <p>Image CID: {{ fileInfo.cid }}</p>
    <img
      :src="'file://' + fileInfo.srcPath"
      alt="The picture needs to signature"
    />

  </div>
  <div v-if="signInfo.sign != ''">
    <p> sign: {{ signInfo.sign }} </p>
    <p> path: {{ signInfo.filePath }} </p>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {ethers} from "ethers";
import {useFileOperation} from "../../../../main/fileOperation";
import * as fs from 'fs';
let { writeImgContent } = useFileOperation();

let fileInfo = reactive({
  cid: "",
  path: "",
  srcPath: "",
  content: "",
});
let signInfo = reactive({
  sign: "",
  filePath: "",
});

const selectImg = async () => {
  let fileInfo2 = await window.electronAPI.openFile();
  console.log(fileInfo2)
  fileInfo.cid = fileInfo2.cid;
  fileInfo.path = fileInfo2.path;
  fileInfo.srcPath = fileInfo2.srcPath;
  fileInfo.content = fileInfo2.content;
  signInfo = {sign: '', filePath: ''};
  // imgBase.value = fileInfo.content;
};

const signImg = async () => {
  let privateKey = "93030c2db7ee1564b43693f99776a27112059dcd9c5cec8052f13444c991e0e7";
  let timestmp = Date.now();
  let signer = new ethers.Wallet(privateKey);
  let sign = await signer.signMessage(fileInfo.cid + timestmp);
  signInfo.sign = sign
  let data = fileInfo.content + sign;
  console.log("data:", data)
  let extindex = fileInfo.path.lastIndexOf(".");
  signInfo.filePath = fileInfo.path.substring(0, extindex) + "-sig" + fileInfo.path.substring(extindex);
  console.log(signInfo);
  writeImgContent(signInfo.filePath, data)
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

img {
  /*设置图片自适应 */
  max-width: 100%;
  max-height: 100%;
  padding: 0;
  width: auto;
  height: auto;
}

</style>
