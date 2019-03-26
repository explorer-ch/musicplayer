<template>
   <div class="container">
     <banner :w="bannerWid" :h="bannerhig" class="banPos"></banner>
     <div class="placeholder"></div>
   </div>
</template>

<script>
import banner from './banner'

export default {
  data () {
    return {
      bannerWid: 340,
      bannerhig: 120
    }
  },
  components: {
    banner
  }
}
</script>

<style lang="less" scoped>
  .container{
    width:362px;
    height:578px;
    background:white;
    display:flex;
    justify-content:center;
    position:relative;
    .banPos{
      position:absolute;
      top:5%;
    }
    .placeholder{
      width:100%;
      height:15%;
      background:red;
    }
  }
</style>
