<template>
   <div class="container">
     <div class="header">
       <i class="font iconfont icon-fanhui" @click="back"></i>
       <div class="title"></div>
     </div>
     <div class="content"><musicShow></musicShow></div>
   </div>
</template>

<script>
import musicShow from '../components/musicShow'

export default {
  components: {
    musicShow
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
 .container{
   width:100%;
   height:100%;
   .header{
     height:10%;
     border-bottom:1px solid rgba(0,0,0,0.2);
     display:flex;
     justify-content:flex-start;
     align-items:center;
     .font{
       display:inline-block;
       width:40px;
       height:40px;
       font-size:40px;
       text-align:center;
       line-height:40px;
       margin:0 10px 0 10px;
     }
     .title{
       height:30px;
       line-height:30px;
     }
   }
   .content{
     height:90%;
      overflow:auto;
   }
 }
</style>
