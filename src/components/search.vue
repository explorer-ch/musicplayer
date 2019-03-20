<template>
   <div class="container">
     <searchBox></searchBox>
     <div class="musicerSearch">
        <span class="textCon">按歌手搜索</span>
     </div>
     <div class="hotList">
        <div class="hotTitle"><span class="textCon">热门搜索</span></div>
        <span class="musicBlock" v-for="(music,index) in hotMusics" :key='index' @click="searchHot(music.first)">{{music.first}}</span>
     </div>
     <div class="historyList" v-show="historyShow">
        <div class="historyTitle">
          <span class="textCon">历史记录</span>
          <i class="iconfont icon-shanchu font" @click="empty"></i>
        </div>
        <span class="musicBlock" v-for="(music,index) in historyMusics" :key='index' @click="searchHot(music)">{{music}}</span>
     </div>
   </div>
</template>

<script>
import { getHot } from '../api/index.js'
import searchBox from './searchBox'

export default {
  name: 'search',
  components: {
    searchBox: searchBox
  },
  data () {
    return {
      hotMusics: []
    }
  },
  computed: {
    historyShow () {
      return this.$store.state.searchHistory.length > 0
    },
    historyMusics () {
      return this.$store.state.searchHistory
    }
  },
  methods: {
    searchHot (keyword) {
      this.$router.push({ name: 'musicList', params: { keyword: keyword } })
    },
    empty () {
      this.$store.commit('emptyHistory')
    }
  },
  created () {
    getHot().then((val) => {
      this.hotMusics = val
    })
  }
}
</script>

<style lang="less" scoped>
.container{
    width:100%;
    height:100%;
    .musicerSearch{
      height:8%;
      border-bottom:1px solid rgba(0, 0, 0, .05);
      line-height:50px;
      font-size:20px;
      font-family:Microsoft YaHei;
    }
    .hotList{
      padding-top:20px;
      .hotTitle{
        font-size:16px;
        font-family:Microsoft YaHei;
      }
    }
    .historyList{
      padding-top:40px;
      .historyTitle{
        font-size:16px;
        font-family:Microsoft YaHei;
        display:flex;
        justify-content:space-between;
        align-items:center;
      }
      .font{
        width:30px;
        height:30px;
        font-size:25px;
        margin:0px 18px 0px 0px;
      }
    }
    .musicBlock{
      background-color:#cfcfcf;
      margin:10px;
      display:inline-block;
      border-radius:5px;
    }
    .textCon{
      margin-left:5%;
    }
}
</style>
