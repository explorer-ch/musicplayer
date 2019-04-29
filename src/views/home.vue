<template>
    <div class="homeStyle" ref="all">
      <userMes></userMes>
      <div class="top">
        <i class="icon" @click="showAside"></i>
        <div class="tab">
          <i class="font iconfont icon-yinle" :class="{currfont:tabNum==0?true:false}" @click="switchTab(0)"></i>
          <i class="font iconfont icon-tubiaozhizuomobanyihuifu-" :class="{currfont:tabNum==1?true:false}" @click="switchTab(1)"></i>
          <i class="font iconfont icon-shipin" :class="{currfont:tabNum==2?true:false}" @click="switchTab(2)"></i>
        </div>
        <i class="search-icon" @click="goSearch"></i>
      </div>
      <calousel :wid="calWidth" :hei="calHeight" @getTabNum="changeTab" :tabKey="tabNum">
        <div class="plate" :style="{width:calWidth +'px',height:calHeight+'px'}"><userCenter></userCenter></div>
        <div class="plate" :style="{width:calWidth +'px',height:calHeight+'px'}"><recommendedCon></recommendedCon></div>
        <div class="bs" :style="{width:calWidth +'px',height:calHeight+'px'}"></div>
      </calousel>
    </div>
</template>

<script>
import userMes from '../components/userMes'
import userCenter from '../components/userCenter'
import calousel from '../components/calousel'
import recommendedCon from '../components/recommendedCon'

export default {
  name: 'home',
  data () {
    return {
      tabNum: 1,
      calWidth: 0,
      calHeight: 0
    }
  },
  mounted () {
    this.calWidth = this.$refs.all.offsetWidth
    this.calHeight = this.$refs.all.offsetHeight * 0.9
  },
  components: {
    userMes,
    userCenter,
    calousel,
    recommendedCon
  },
  methods: {
    showAside () {
      this.$store.commit('controlSlidePos', '0%')
      this.$store.commit('controlSlideGround', 'rgba(0,0,0,0.5)')
    },
    goSearch () {
      this.$router.push('/search')
    },
    changeTab (e) {
      this.tabNum = e
    },
    switchTab (num) {
      this.tabNum = num
    }
  }
}
</script>

<style lang="less" scoped>
   .homeStyle{
      width:100%;
      height:100%;
      .top{
        background-color:red;
        width:100%;
        height:10%;
        line-height:100%;
        position:relative;
        .tab{
          width:50%;
          position:absolute;
          height:30px;
          left:50%;
          bottom:10%;
          transform:translateX(-50%);
          display:flex;
          align-items:center;
          justify-content:space-around;
        }
      }
      .icon{
        width:30px;
        height:30px;
        background-image:url('../assets/menuIcon.svg');
        background-size:cover;
        display:inline-block;
        position:absolute;
        left:10%;
        bottom:10%;
      }
      .search-icon{
        width:30px;
        height:30px;
        background-image:url('../assets/searchIcon.svg');
        background-size:cover;
        display:inline-block;
        position:absolute;
        left:80%;
        bottom:10%;
      }
   }
   .font{
      color:#cfcfcf;
      font-size:26px;
    }
   .currfont{
     color:white;
   }
   .plate{
     float:left;
   }
   .bs{
     width:362px;
     height:578px;
     background-color:blue;
     float:left;
   }
</style>
