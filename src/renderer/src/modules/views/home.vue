<template>
  <a-button type="primary" @click="selectImg">Select File</a-button>
  <a-button
    v-if="
      fileInfo.cid != '' &&
      signInfo.sign.length == 0 &&
      !isSignedFile(fileInfo.path)
    "
    type="button"
    @click="signImg"
    >Sign File</a-button
  >
  <a-button v-if="fileInfo.cid != ''" type="button" @click="verifySign"
    >Verify Sign</a-button
  >
  <div v-if="fileInfo.cid != ''">
    <p>File CID: {{ fileInfo.cid }}</p>
    <div v-if="fileInfo.fileType === 'jpg' || fileInfo.fileType === 'png' || fileInfo.fileType === 'gif' || fileInfo.fileType === 'jpeg'">
      <img :src="'file://' + fileInfo.srcPath"/>
    </div>
    <div v-else-if="fileInfo.fileType === 'mp3' || fileInfo.fileType === 'wav' || fileInfo.fileType === 'ogg'">
      <audio :src="'file://' + fileInfo.srcPath" controls></audio>
    </div>
    <div v-else-if="fileInfo.fileType === 'mp4' || fileInfo.fileType === 'avi' || fileInfo.fileType === 'mov'">
      <video :src="'file://' + fileInfo.srcPath" controls></video>
    </div>
    <div v-else>
      <p>File path: {{ fileInfo.srcPath }}</p>
    </div>
    <div v-if="signInfo.sign != ''">
      <p>sign: {{ signInfo.sign }}</p>
      <p>path: {{ signInfo.filePath }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, h } from "vue";
import { storeToRefs } from "pinia";
import { useKeysStore } from "../../store/keys";
import { useQuantumWallet } from "../../scripts/quantumWallet";
import { useStringParser } from "../../scripts/stringParser";
// import { Message } from '@arco-design/web-vue';
// import { message } from "ant-design-vue";
import { Notification } from '@arco-design/web-vue';

let store = useKeysStore();
let { publicKey, serialNum, publicKeyBytes } = storeToRefs(store);
let { signContent, verifyContent } = useQuantumWallet();
let { Uint8ArrayToString, stringToUint8Array, hexToBytes } = useStringParser();

let fileInfo = reactive({
  cid: "",
  path: "",
  srcPath: "",
  fileType: "",
  content: "",
});
let signInfo = reactive({
  sign: "",
  filePath: "",
});

const selectImg = async () => {
  let fileInfo2 = await window.electronAPI.openFile();
  // fileInfo.cid = fileInfo2.cid;
  fileInfo.path = fileInfo2.path;
  fileInfo.srcPath = fileInfo2.srcPath;
  fileInfo.content = fileInfo2.content;
  fileInfo.fileType = fileInfo2.fileType;
  let cid = await window.electronAPI.getCID(fileInfo.content);
  fileInfo.cid = cid;
  signInfo.sign = "";
  signInfo.filePath = "";
  // imgBase.value = fileInfo.content;
};

function getSignFileName(srcName: string) {
  let extindex = srcName.lastIndexOf(".");
  return srcName.substring(0, extindex) + "-sig" + srcName.substring(extindex);
}

const signImg = async () => {
  let timestmp = Date.now();
  let message = fileInfo.cid + timestmp;
  let sign = await signContent(message, serialNum.value);
  signInfo.sign = sign;

  let append = fileInfo.cid + "#" + timestmp + "#" + sign;
  let signData = stringToUint8Array(append);
  console.log(signData.length);
  let mergeData = new Uint8Array(fileInfo.content.length + signData.length);
  mergeData.set(fileInfo.content);
  mergeData.set(signData, fileInfo.content.length);

  signInfo.filePath = getSignFileName(fileInfo.path);

  window.electronAPI.saveFile(signInfo.filePath, mergeData);

  Notification.info({
    content: "Sign Success",
    duration: 15000,
  });
};

// /**
//  * 验证签名及地址
//  * @param {*} message 签名消息
//  * @param {*} signerAddress 签名地址即用户钱包地址
//  * @param {*} signature 签名后的字符串
//  * @returns
//  */
// const verifyMessage = async (message, signerAddress, signature) => {
//   const recoveredAddress = ethers.verifyMessage(message, signature);

//   return recoveredAddress === signerAddress;
// };


const verifyMessage = async (msg, publicKeyBytes, sign) => {
  let signature = sign.split("-");
  let signatureBytes = [];
  for (let i = 0; i < signature.length; i++) {
    signatureBytes.push(hexToBytes(signature[i]));
  }

  let isValid = await verifyContent(msg, publicKeyBytes, signatureBytes);

  return isValid;
};

function isSignedFile(fileName: string) {
  let filePre = fileName.substring(0, fileName.lastIndexOf("."));
  if (filePre.endsWith("-sig")) {
    return true;
  }
  return false;
}

const verifySign = async () => {
  /*check current if alreay signed
   * if not signed file, get signed file*/
  if (!isSignedFile(fileInfo.path)) {
    // signedFileName = getSignFileName(fileInfo.path);
    Notification.warning({
      content: "Please choose signed file",
      duration: 15000,
    });
    return;
  }
  let contentBuf = fileInfo.content;
  // console.log("contentBuf", contentBuf);
  let contentBuffer = contentBuf.subarray(0, contentBuf.length - 318);
  let signBuffer = contentBuf.subarray(contentBuf.length - 318);
  let signString = Uint8ArrayToString(signBuffer);
  let signArray = signString.split("#");
  if (signArray.length < 3) {
    Notification.warning({
      content: "Not a valid signed file",
      duration: 15000,
    });
  }
  let cidCheck = await window.electronAPI.getCID(contentBuffer);
  let cid = signArray[0];
  if (cidCheck != cid) {
    Notification.warning({
      content: "CID is wrong",
      duration: 15000,
    });
  }
  let tmp = signArray[1];
  let sign = signArray[2];

  let message = cid + tmp;
  let verify = await verifyMessage(message, publicKeyBytes.value, sign);
  Notification.info({
    content: verify ? "Verify Success" : "Verify Failed",
    duration: 15000,
  });
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