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
          <a-menu-item key="0_0_0" data-obj="0">
            <router-link to="/home">Home</router-link>
          </a-menu-item>
          <a-menu-item key="0_0_1" data-obj="1">
            <router-link to="/keyManager">Key Manager</router-link>
          </a-menu-item>
          <a-menu-item key="0_0_2" data-obj="2">
            <router-link to="/serialPort">serialPort</router-link>
          </a-menu-item>
          <a-sub-menu key="1">
            <template #title>AIGC</template>
            <a-menu-item key="1_0">
              <a-link target="_blank" href="https://stablediffusionweb.com/"
                >StableDiffusion</a-link
              >
              <!--              <router-link to="/stableDiffusion">StableDiffusion</router-link>-->
            </a-menu-item>
            <a-menu-item key="1_1">
              <a-link target="_blank" href="https://www.midjourney.com/home/"
                >MidJourney</a-link
              >
              <!--              <router-link to="/midJourney">MidJourney</router-link>-->
            </a-menu-item>
            <a-menu-item key="1_2">
              <a-link target="_blank" href="https://openai.com/product/dall-e-2"
                >Dall-E</a-link
              >
              <!--              <router-link to="/dallE">Dall-E</router-link>-->
            </a-menu-item>
            <a-menu-item key="1_3">
              <a-link target="_blank" href="https://frame.infmonkeys.com/"
                >InfMonkeys</a-link
              >
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
