<template>
   <div class="container">
     <banner :w="bannerWid" :h="bannerhig" class="banPos"></banner>
     <div class="placeholder"></div>
     <div class="funSwitch">
      <div class="funBlock">
        <div class="iconBlock"><i class="funcon iconfont icon-tuijianbaobiao2"></i></div>
        <span>每日推荐</span>
      </div>
      <div class="funBlock">
       <div class="iconBlock"><i class="funcon iconfont icon-jiarugedan"></i></div>
       <span>歌单</span>
      </div>
      <div class="funBlock" @click="getRank">
       <div class="iconBlock"><i class="funcon iconfont icon-paihang"></i></div>
       <span>排行榜</span>
      </div>
     </div>
     <div class="songSheets">
       <div class="header">
         <span>推荐歌单</span>
         <span class="link">歌单广场</span>
       </div>
       <songSheetIcon v-for="(songSheet,index) in songSheets" :mes="songSheet" :key="index"></songSheetIcon>
     </div>
   </div>
</template>

<script>
import banner from './banner'
import songSheetIcon from './songSheetIcon'
import { commendSongSheet } from '../api/index'

export default {
  data () {
    return {
      bannerWid: 340,
      bannerhig: 120,
      songSheets: []
    }
  },
  components: {
    banner,
    songSheetIcon
  },
  created () {
    commendSongSheet().then((val) => {
      this.songSheets = val.slice(0, 6)
    })
  },
  methods: {
    getRank () {
      this.$router.push({ name: 'rank' })
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    width:362px;
    height:578px;
    background:white;
    position:relative;
    overflow:scroll;
    .banPos{
      position:absolute;
      top:5%;
      left:50%;
      transform:translateX(-50%);
    }
    .placeholder{
      width:100%;
      height:15%;
      background:red;
      margin-bottom:15%;
    }
    .funSwitch{
      width:100%;
      height:20%;
      display:flex;
      justify-content:space-around;
      align-items:center;
    }
    .funBlock{
      width:60px;
      height:70px;
      flex-direction:column;
      align-items:center;
      .iconBlock{
        width:50px;
        height:50px;
        border-radius:50%;
        background:red;
        display:flex;
        justify-content:center;
        align-items:center;
        .funcon{
          font-size:25px;
          color:white;
        }
      }
      span{
        font-size:12px;
        text-align:center;
        width:50px;
        height:20px;
        display:inline-block;
      }
    }
    .songSheets{
      width:100%;
      height:40%;
      border-top:1px solid rgba(0, 0, 0, .05);
      .header{
        width:100%;
        height:10%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        span{
          margin:10px 10px;
        }
        .link{
          border:1px solid rgba(0, 0, 0, .05);
          border-radius:10%;
          font-size:13px;
        }
      }
    }
  }
</style>
