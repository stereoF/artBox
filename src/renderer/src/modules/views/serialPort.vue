<template>
  <!-- <a-button type="primary" @click="listPorts">List the serial ports</a-button> -->
  <a-badge v-if="portStatus" status="success" text="port connected" />
  <a-badge v-else status="danger" text="port disconnected" />
  <div v-if="portLength > 0">
    <p>Serial Port</p>
    <a-radio-group direction="vertical" v-model:model-value="selectedPort">
      <a-radio v-for="port in portList" :value="port">
        {{ port }}
      </a-radio>
    </a-radio-group>
    <div>
      <a-button type="primary" @click="openPort">open the port</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useSerialPortStore } from "@renderer/store/serialPort";
import { storeToRefs } from 'pinia'

let portList = reactive([]);
let portLength = ref(portList.length);
// let selectedPort = ref("");

let store = useSerialPortStore();
let { selectedPort } = storeToRefs(store);

const listPorts = async () => {
  let ports = await window.electronAPI.listPort();
  // console.log(ports);
  portList = ports.map((port) => {
    return port.path;
  });
  portLength.value = portList.length;
};

await listPorts();
let portStatus = ref(await window.electronAPI.isPortOpen());

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const openPort = async () => {
  console.log(selectedPort.value);
  // store.setPort(selectedPort.value);
  await window.electronAPI.openPort(selectedPort.value);

  await sleep(1000);
  portStatus.value = await window.electronAPI.isPortOpen();
};

// watch(
//   () => selectedPort.value, (newVal, oldVal) => {
//     // console.log(newVal, oldVal);
//     store.setPort(newVal);
//   }
// )
</script>
