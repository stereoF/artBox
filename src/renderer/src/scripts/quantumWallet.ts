import { useStringParser } from "./stringParser";

let { toHexString } = useStringParser();

async function signChunk(chunk, serialNum) {
  let signed = await window.electronAPI.serialPortComm([
    0x53,
    0x48,
    serialNum,
    ...chunk,
  ]);
  return signed;
}

async function verifyChunk(chunk, publicKey, signature) {
  let isVerify = await window.electronAPI.serialPortComm([
    0x56,
    0x53,
    ...publicKey,
    ...signature,
    ...chunk,
  ]);
  return isVerify[0] === 1 ? true : false;
}

function getMessageBytesPadded(message) {
  let utf8Encode = new TextEncoder();
  let messageBytes = utf8Encode.encode(message);
  let messageBytesPadded = [];
  for (let i = 0; i < messageBytes.length; i += 32) {
    let chunk = messageBytes.slice(i, i + 32);
    if (chunk.length < 32) {
      let padding = new Uint8Array(32 - chunk.length).fill(0x00);
      chunk = new Uint8Array([...chunk, ...padding]);
    }
    messageBytesPadded.push(chunk);
  }
  return messageBytesPadded;
}

async function signContent(message, serialNum) {
  let messageBytesPadded = getMessageBytesPadded(message);
  let signedArray = [];
  for (let i in messageBytesPadded) {
    let signed = await signChunk(messageBytesPadded[i], serialNum);
    // let signString = signed.toString("hex");
    let signString = toHexString(signed);
    signedArray.push(signString);
  }

  let signedString = signedArray.join("-");
  return signedString;
}

async function verifyContent(message, publicKey, signature) {

  let messageBytesPadded = getMessageBytesPadded(message);
  if (messageBytesPadded.length != signature.length) {
    return false;
  }

  for (let i = 0; i < messageBytesPadded.length; i++) {
    let isVerify = await verifyChunk(messageBytesPadded[i], publicKey, signature[i]);
    if (!isVerify) {
      return false;
    }
  }
  return true;
}

export function useQuantumWallet() {
  return {
    signContent,
    verifyContent
  };
}
