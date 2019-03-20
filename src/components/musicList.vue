<template>
  <div class="container">
    <searchBox></searchBox>
    <div class="indexBox"></div>
    <music v-for="(musicdetail,index) in musicList" :details="musicdetail" :key="index"></music>
  </div>
</template>

<script>
import searchBox from './searchBox'
import music from './music'
import { search } from '../api/index.js'

export default {
  data () {
    return {
      musicList: []
    }
  },
  components: {
    searchBox: searchBox,
    music: music
  },
  created () {
    let keyword = this.$route.params.keyword
    search(keyword).then((val) => {
      this.$store.commit('addSearchHistory', keyword)
      this.musicList = val.map(function (item) {
        let title = item.name + (item.alias[0] ? '(' + item.alias[0] + ')' : '')
        return {
          title: title,
          author: item.artists[0].name,
          album: item.album.name,
          id: item.id
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.container{
   width:100%;
   height:100%;
   .indexBox{
     height:6%;
     background-color:red;
   }
}
</style>
