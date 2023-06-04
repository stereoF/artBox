<template>
  <p>Serial Port</p>
  <a-button type="primary" @click="listPorts">listPorts</a-button>
</template>

<script setup lang="ts">
// import { SerialPort } from "serialport";

// async function listSerialPorts() {
//   await SerialPort.list().then((ports, err) => {
//     if (err) {
//         console.log("err", err);
//       return;
//     } else {
//     }
//     console.log("ports", ports);

//     if (ports.length === 0) {
//         console.log("No ports discovered");
//     }

//     console.log("ports", ports);
//   });
// }


async function listPorts() {
//   listSerialPorts();
//   setTimeout(listPorts, 2000);
}

// // Set a timeout that will check for new serialPorts every 2 seconds.
// // This timeout reschedules itself.
// setTimeout(listPorts, 2000);

// listSerialPorts();
</script>
