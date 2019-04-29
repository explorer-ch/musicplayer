<template>
  <div class="listCon">
    <div class="menu">
      <div class="fontcon"><i class="font iconfont icon-play_icon"></i>{{'播放全部('+musicLists.length+')'}}</div>
      <div class="fontcon"><i class="font iconfont icon-caidanzhankai"></i>多选</div>
    </div>
    <div class="musicItem" v-for="(music,index) in musicLists" :key="index" @click="playmusic(music.id,index)">
      <i class="font iconfont icon-laba" :style="{'display':index===playingKey?'inline-block':'none','color':'red'}"></i>
      <div class="musicmes">
        <div class="title">{{music.name}}</div>
        <div class="ar">{{music.ar}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { playhistory } from '../api/index'
import { switchMusic } from '../util/playStystem'

export default {
  created () {
    playhistory(this.userId).then((musics) => {
      this.musicLists = musics.map((music) => {
        let song = {}
        song.id = music.song.id
        song.name = music.song.name
        song.ar = music.song.ar[0].name + '-' + music.song.alia[0]
        return song
      })
    })
  },
  data () {
    return {
      musicLists: [],
      playingKey: null
    }
  },
  computed: {
    userId () {
      return this.$store.state.loginState ? this.$store.state.user.userId : ''
    }
  },
  methods: {
    playmusic (id, key) {
      this.playingKey = key
      switchMusic(id, this)
    }
  }
}
</script>

<style lang="less" scoped>
  .listCon{
    width:100%;
    .menu{
      width:100%;
      height:50px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      .fontcon{
        margin:0 10px 0 10px;
        display:flex;
        align-items:center;
      }
    }
    .musicItem{
      width:100%;
      height:60px;
      margin:20px 0 20px 0;
      display:flex;
      justify-content:flex-start;
      align-items:center;
      .musicmes{
        flex:1;
        .title{
          margin-left:20px;
          height:40px;
          line-height:40px;
          overflow:hidden;
          font-size:16px;
        }
        .ar{
          margin-left:20px;
          height:20px;
          line-height:20px;
          overflow:hidden;
          font-size:12px;
          color:gray;
        }
      }
    }
  }
  .font{
    width:40px;
    height:40px;
    display:inline-block;
    text-align:center;
    line-height:40px;
    font-size:25px;
  }
</style>
