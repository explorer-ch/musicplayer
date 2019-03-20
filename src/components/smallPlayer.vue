<template>
  <div>
    <playList></playList>
    <div class="playerCon" @click="fullScreenPlay">
      <div class="imgCon" :style="{backgroundImage:imgUrl}"></div>
      <div class="lyricCon">
        <div class="title">{{title}}</div>
        <div class="lyric">{{musicAr}}</div>
      </div>
      <i class="font iconfont" :class="{'icon-zanting':state,'icon-play_icon':!state}" @click="switchPlay"></i>
      <i class="font iconfont icon-caidanzhankai" @click="showMusicStack"></i>
    </div>
  </div>
</template>

<script>
import playList from './playList.vue'

export default {
  data () {
    return {
    }
  },
  computed: {
    id () {
      return this.$store.state.playData.playingMusic.id
    },
    imgUrl () {
      return this.$store.state.playData.playingMusic.imgUrl
    },
    title () {
      return this.$store.state.playData.playingMusic.title
    },
    musicAr () {
      return this.$store.state.playData.playingMusic.musicAr
    },
    state () {
      return this.$store.state.playData.playing
    }
  },
  methods: {
    showMusicStack (e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation()
      this.$store.commit('switchListLayer')
    },
    fullScreenPlay () {
      this.$router.push({ name: 'musicPlayer', params: { id: this.id }, query: { update: false } })
    },
    switchPlay (e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation()
      if (!this.state) {
        this.$store.state.audio.play()
      } else {
        this.$store.state.audio.pause()
      }
      this.$store.commit('switchPlay')
    }
  },
  components: {
    playList
  }
}
</script>

<style lang='less' scoped>
.playerCon{
  position:fixed;
  bottom:0px;
  width:100%;
  height:8%;
  border-width:1px 0px 0px 0px;
  border-style:solid;
  border-color:gray;
  display:flex;
  align-items:center;
  justify-content:space-around;
  background:white;
  .imgCon{
    width:40px;
    height:40px;
    background-size:cover;
  }
  .lyricCon{
    width:50%;
    height:40px;
    display:flex;
    flex-direction:column;
    .title{
      font-size:15px;
      overflow:hidden;
      height:60%;
    }
    .lyric{
      font-size:12px;
      overflow:hidden;
      height:40%;
    }
  }
  .font{
    font-size:30px;
    color:black;
    width:30px;
    height:30px;
  }
}
</style>
