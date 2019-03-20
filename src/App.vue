<template>
  <div id="app">
    <router-view/>
    <smallPlayer v-show="show"></smallPlayer>
    <audio :src="src" ref="audio"></audio>
  </div>
</template>

<script>
import smallPlayer from './components/smallPlayer'
import { initAudio } from './util/playStystem'

export default {
  mounted () {
    initAudio(this.$refs.audio, this)
    this.$store.commit('loadAudio', this.$refs.audio)
  },
  computed: {
    show () {
      return this.$store.state.smallPlayer && this.$store.state.playData.musicStack.length !== 0
    },
    src () {
      return this.$store.state.playData.playingMusic.src
    }
  },
  components: {
    smallPlayer
  }
}
</script>

<style lang="less">
  @import "./common/base.less";
  #app{
    width:100%;
    height:100%;
  }
</style>
