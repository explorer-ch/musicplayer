<template>
  <transition name="move">
    <div class="layer" @click="hide" ref="layer" v-show="listLayerShow">
      <div class="list">
        <div class="footer">
          <span class="iconCon"><i class="iconfont font" :class="mode" @click="switchMode"></i>{{modeTitle}}</span>
          <span class="iconfont"><i class="iconfont icon-shoucang font"></i>收藏全部
          <i class="iconfont icon-shanchu font" @click="empty"></i></span>
        </div>
        <ul>
          <li v-for=" (list,key) in lists" :key="key" :class="{playStyle:key===0}"><i class="iconfont icon-laba font" :class="{playIcon:key!==0}"></i>{{list.title}}</li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
const modeClass = {
  0: 'icon-danquxunhuan',
  1: 'icon-liebiaoxunhuan',
  2: 'icon-duoxunhuan'
}
const modeDescribe = {
  0: '单曲循环',
  1: '列表循环',
  2: '随机播放'
}
export default {
  created () {
  },
  computed: {
    lists () {
      return this.$store.state.playData.musicStack
    },
    listLayerShow () {
      return this.$store.state.playListlayerShow
    },
    mode () {
      return modeClass[this.$store.state.playData.playRule]
    },
    modeTitle () {
      return modeDescribe[this.$store.state.playData.playRule] + '(' + this.$store.state.playData.musicStack.length + ')'
    }
  },
  methods: {
    hide (e) {
      if (e.target === this.$refs.layer) {
        this.$store.commit('switchListLayer')
      }
    },
    switchMode () {
      this.$store.commit('changePlayMode')
    },
    empty () {
      this.$store.commit('emptyMusicList')
    }
  }
}
</script>

<style lang="less" scoped>
.move-enter-active{
  animation:slide .6s;
}
.move-leave-active{
  animation:slide .6s reverse;
}
@keyframes slide{
0%{
top:50%;
background:rgba(0,0,0,0);
}
100%{
top:-50%;
background:rgba(0,0,0,0);
}
}
.layer{
  width:100%;
  height:150%;
  position:absolute;
  top:-50%;
  z-index:999;
  background:rgba(0,0,0,0);
  .list{
    height:33%;
    background:white;
    position:relative;
    top:67%;
    border-radius:5% 5% 0px 0px;
    border:1px solid #d4d4d4;
    .footer{
      height:12%;
      padding:8px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      .iconCon{
        display:flex;
        align-items:center;
      }
    }
    ul{
      list-style:none;
      margin:0px;
      padding:0px;
      overflow:scroll;
      li{
        height:50px;
        line-height:50px;
        border-top:1px solid #d4d4d4;
        border-bottom:1px solid #d4d4d4;
        font-size:14px;
      }
    }
    .font{
      width:30px;
      height:30px;
      font-size:25px;
      margin:0px 5px 0px 5px;
    }
    .playStyle{
      color:red;
    }
    .playIcon{
      display:none;
    }
  }
}
</style>
