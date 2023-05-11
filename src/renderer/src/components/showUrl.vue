<template>
<!--  <a-spin :tip="tip" :spinning="state.spinning" wrapperClassName="iframe_warp">-->
<!--    <iframe :src="src" frameborder="0" class="my_iframe" id="_iframe" frameborder="0"></iframe>-->
<!--  </a-spin>-->
  <div style="width:100%; height: 100%;">
    <iframe id="iframe" :src="src" frameborder="0" style="width:100%; min-height: 600px;"></iframe>
  </div>

</template>
<script setup>
import { reactive, onMounted, nextTick } from "vue"
const props = defineProps({
  src:String,
  tip:{
    type:String,
    default: ""
  }
})
const state = reactive({
  spinning:true
})
function init(){
  const iframe = document.getElementById('_iframe');
  if (!iframe) return false;
  iframe.onload = () => {
    state.spinning = false;
  };
}
onMounted(()=>
  nextTick(()=>init())
)
</script>

<style lang="less">
.iframe_warp{
  width: 100%;
  height: 100%;
  .ant-spin-container,.my_iframe{
    width: 100%;
    height: 100%;
  }
}
</style>
