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
            <a-menu-item key="0_0">
              <router-link to="/pkGen"> PublicKey Generation</router-link>
            </a-menu-item>
            <a-menu-item key="0_1">
              <router-link to="/digiSign">Digital Signature</router-link>
            </a-menu-item>
            <a-menu-item key="0_2">
              <router-link to="/verifySign">Verify Signature</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="1">
            <template #icon><icon-bug></icon-bug></template>
            <template #title>AIGC</template>
            <a-menu-item key="1_0">StableDiffusion</a-menu-item>
            <a-menu-item key="1_1">MidJourney</a-menu-item>
            <a-menu-item key="1_2">Dall-E</a-menu-item>
            <a-menu-item key="1_3">InfMonkeys</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="3">
            <router-link to="/settings">Settings</router-link>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout-content>
      <a-layout-header>Header</a-layout-header>
      <router-view></router-view>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout-content>
  </a-layout>
</template>
