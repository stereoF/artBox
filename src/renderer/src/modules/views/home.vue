<template>
  <a-button type="primary" @click="selectImg">Select Image</a-button>
  <a-button v-if="fileInfo.cid != '' && signInfo.sign.length == 0 && !isSignedFile(fileInfo.path)" type="button" @click="signImg">Sign Image</a-button>
  <a-button v-if="fileInfo.cid != ''" type="button" @click="verifySign">Verify Sign</a-button>
  <div v-if="fileInfo.cid != ''">
    <p>Image CID: {{ fileInfo.cid }}</p>
    <img
      :src="'file://' + fileInfo.srcPath"
      alt="The picture needs to signature"
    />
    <div v-if="signInfo.sign != ''">
      <p> sign: {{ signInfo.sign }} </p>
      <p> path: {{ signInfo.filePath }} </p>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {reactive,h} from "vue";
import {ethers} from "ethers";

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

function stringToUint8Array(str){
  var arr = [];
  for (var i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }
  var tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array
}

const selectImg = async () => {
  let fileInfo2 = await window.electronAPI.openFile();
  console.log(fileInfo2)
  fileInfo.cid = fileInfo2.cid;
  fileInfo.path = fileInfo2.path;
  fileInfo.srcPath = fileInfo2.srcPath;
  fileInfo.content = fileInfo2.content;
  signInfo.sign = '';
  signInfo.filePath = '';
  // imgBase.value = fileInfo.content;
};

function getSignFileName(srcName: string){
  let extindex = srcName.lastIndexOf(".");
  return srcName.substring(0, extindex) + "-sig" + srcName.substring(extindex);
}

const signImg = async () => {
  let privateKey = "93030c2db7ee1564b43693f99776a27112059dcd9c5cec8052f13444c991e0e7";
  let timestmp = Date.now();
  let signer = new ethers.Wallet(privateKey);
  let message = fileInfo.cid + timestmp;
  let sign = await signer.signMessage(message);
  signInfo.sign = sign
  console.log(fileInfo.content)

  let append = fileInfo.cid + "#" + timestmp + "#" + sign;
  let signData = stringToUint8Array(append);
  console.log(signData.length)
  let mergeData = new Uint8Array(fileInfo.content.length+signData.length)
  mergeData.set(fileInfo.content);
  mergeData.set(signData, fileInfo.content.length)

  signInfo.filePath = getSignFileName(fileInfo.path);

  window.electronAPI.saveFile(signInfo.filePath, mergeData);
};

/**
 * 验证签名及地址
 * @param {*} message 签名消息
 * @param {*} signerAddress 签名地址即用户钱包地址
 * @param {*} signature 签名后的字符串
 * @returns
 */
const verifyMessage = async (message, signerAddress, signature) => {
  const recoveredAddress = ethers.verifyMessage(message, signature);

  return recoveredAddress === signerAddress;
};

function Uint8ArrayToString(fileData){
  var dataString = "";
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString
}

function isSignedFile(fileName: string){
  let filePre = fileName.substring(0, fileName.lastIndexOf("."));
  if (filePre.endsWith("-sig")){
    return true;
  }
  return false;
}

const verifySign = async () => {
  let privateKey = "93030c2db7ee1564b43693f99776a27112059dcd9c5cec8052f13444c991e0e7";
  let signer = new ethers.Wallet(privateKey);
  let signerAddress = await signer.getAddress();

  let signedFileName = fileInfo.path;
  /*check current if alreay signed
  * if not signed file, get signed file*/
  if (!isSignedFile(signedFileName)){
    signedFileName = getSignFileName(fileInfo.path);
  }
  let contentBuf = await window.electronAPI.readFile(signedFileName);
  console.log("contentBuf",contentBuf);
    let signBuffer = contentBuf.subarray(contentBuf.length-193, contentBuf.length);
    let signString = Uint8ArrayToString(signBuffer);
    console.log(signString);
    let signArray = signString.split("#");
    if (signArray.length < 3){
      return false;
    }
    let cid = signArray[0];
    let tmp = signArray[1];
    let sign = signArray[2];
    let verify = await verifyMessage(cid+tmp, signerAddress, sign);
    console.log(verify)
    return verify;
}


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
