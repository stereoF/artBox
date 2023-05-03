<template>
  <a-layout>
    <a-layout-sider>
      <div class="menu-demo">
        <a-menu
          :style="{ width: '200px', height: '100%' }"
          :default-open-keys="['0']"
          :default-selected-keys="['0_1']"
          show-collapse-button
        >
          <a-menu-item key="0_0_0" data-obj="1">ArtBox</a-menu-item>
          <a-sub-menu key="0">
            <template #icon><icon-apps></icon-apps></template>
            <template #title>Quantum Keys</template>
            <a-menu-item key="0_0">PublicKey Generation</a-menu-item>
            <a-menu-item key="0_1">Digital Signature</a-menu-item>
            <a-menu-item key="0_2">Verify Signature</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="1">
            <template #icon><icon-bug></icon-bug></template>
            <template #title>AIGC</template>
            <a-menu-item key="1_0">StableDiffusion</a-menu-item>
            <a-menu-item key="1_1">MidJourney</a-menu-item>
            <a-menu-item key="1_2">Dall-E</a-menu-item>
            <a-menu-item key="1_3">InfMonkeys</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="3">Settings</a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout-content>
      <a-button type="primary" @click="selectImg">Select Image</a-button>
      <p>Image CID: {{ fileInfo.cid }}</p>
      <img
        :src="'file://' + fileInfo.srcPath"
        alt="The picture needs to signature"
      />
    </a-layout-content>
  </a-layout>
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
</style>
