<template>
  <a-button type="primary" @click="listPorts">List the serial ports</a-button>
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

let portList = reactive([]);
let portLength = ref(portList.length);
let selectedPort = ref("");

let store = useSerialPortStore();

const listPorts = async () => {
  let ports = await window.electronAPI.listPort();
  // console.log(ports);
  portList = ports.map((port) => {
    return port.path;
  });
  portLength.value = portList.length;
};

const openPort = async () => {
  console.log(selectedPort.value);
  // store.setPort(selectedPort.value);
  await window.electronAPI.openPort(selectedPort.value);
};

// watch(
//   () => selectedPort.value, (newVal, oldVal) => {
//     // console.log(newVal, oldVal);
//     store.setPort(newVal);
//   }
// )
</script>
