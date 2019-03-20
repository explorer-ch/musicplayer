<template>
  <div class="audioCon">
    <div class="playBar">
      <span class="time">{{ctimeStr}}</span>
      <div class="sliderCon" @click="changePlay">
        <div class="sliderBtu" @touchstart="draggStart" @touchmove="dragging" @touchend="draggEnd" :style="{marginRight:btuPos+'px'}">
          <div class="btuCenter" ref="point"></div>
        </div>
        <div class="slider"></div>
      </div>
      <span class="time">{{timeStr}}</span>
    </div>
    <div class="control">
      <i class="icon iconfont" :class="playMode" @click="switchMode"></i>
      <i class="musicLeft" @click="lastMusic"></i>
      <i class="play" @click="play" :class="imgClass"></i>
      <i class="musicRight" @click="nextMusic"></i>
      <i class="icon iconfont icon-caidanzhankai" @click="showMusicStack"></i>
    </div>
  </div>
</template>

<script>
const mode = {
  0: 'icon-danquxunhuan',
  1: 'icon-liebiaoxunhuan',
  2: 'icon-duoxunhuan'
}
const initbtupos = 250
const sliderLen = 260

export default {
  name: 'audioer',
  watch: {
    currentTime (val, oldval) {
      this.$emit('lyricAni', val)
    }
  },
  mounted () {
    this.audio = this.$store.state.audio
  },
  computed: {
    ctimeStr () {
      return this.getTimeStr(this.currentTime)
    },
    timeStr () {
      return this.getTimeStr(this.musicTime)
    },
    imgClass () {
      return {
        'playIcon': this.playState,
        'stopIcon': !this.playState
      }
    },
    playMode () {
      return mode[this.$store.state.playData.playRule]
    },
    playState () {
      return this.$store.state.playData.playing
    },
    currentTime () {
      return this.$store.state.playData.playingMusic.currentTime
    },
    musicTime () {
      return this.$store.state.playData.playingMusic.musicTime
    },
    btuPos () {
      if (!this.musicTime) {
        return initbtupos
      } else {
        return initbtupos - this.$store.state.playData.playingMusic.currentTime * sliderLen / this.musicTime
      }
    }
  },
  data () {
    return {
      audio: null,
      btuDrag: false,
      currentX: null
    }
  },
  methods: {
    switchMode () {
      this.$store.commit('changePlayMode')
    },
    nextMusic () {
      this.$store.commit('cyclePlay')
      this.$router.push({ name: 'musicPlayer', params: { id: this.$store.state.playData.musicStack[0].id } })
    },
    lastMusic () {
      this.$store.commit('inversecyclePlay')
      this.$router.push({ name: 'musicPlayer', params: { id: this.$store.state.playData.musicStack[0].id } })
    },
    play () {
      if (!this.playState) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
      this.$store.commit('switchPlay')
    },
    getTimeStr (time) {
      time = Math.floor(time)
      let min = Math.floor(time / 60)
      min = min < 10 ? '0' + min.toString() : min.toString()
      let sec = time - min * 60
      sec = sec < 10 ? '0' + sec.toString() : sec.toString()
      return min + ':' + sec
    },
    getElePosX (ele) {
      let x = 0
      while (ele !== null) {
        x += ele.offsetLeft
        ele = ele.offsetParent
      }
      return x
    },
    changePlay (e) {
      let move = e.clientX - this.getElePosX(this.$refs.point)
      this.$store.commit('playing', this.currentTime + (move / 260) * this.musicTime)
      this.audio.currentTime = this.currentTime
      this.audio.play()
      this.$store.commit('switchPlay', true)
    },
    draggStart (e) {
      this.btuDrag = !this.btuDrag
      this.currentX = e.touches[0].clientX
      this.audio.pause()
      this.$store.commit('switchPlay', false)
    },
    dragging (e) {
      e.preventDefault()
      if (!this.btuDrag) return ''
      let move = e.touches[0].clientX - this.currentX
      let pos = this.btuPos - move
      if (pos > 250) {
        pos = 250
        move = this.btuPos - 250
      }
      if (pos < -10) {
        pos = -10
        move = this.btuPos + 10
      }
      this.$store.commit('playing', this.currentTime + (move / 260) * this.musicTime)
      this.currentX = e.touches[0].clientX
    },
    draggEnd (e) {
      this.btuDrag = !this.btuDrag
      this.audio.play()
      this.$store.commit('switchPlay', true)
    },
    showMusicStack () {
      this.$store.commit('switchListLayer')
    }
  }
}
</script>

<style lang="less" scoped>
  .audioCon{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
  }
  .sliderCon{
    width:260px;
    height:4px;
    background:gray;
    border-radius:5px;
    .sliderBtu{
      width:16px;
      height:16px;
      background:white;
      border-radius:50%;
      float:right;
      margin-top:-6px;
      display:flex;
      justify-content:center;
      align-items:center;
      .btuCenter{
        width:4px;
        height:4px;
        border-radius:50%;
        background:red;
      }
    }
    .slider{
      height:4px;
      background:red;
      overflow: hidden;
    }
  }
  .playBar{
    flex:1;
    display:flex;
    justify-content:space-around;
    align-items:center;
      .time{
        color:rgba(255,255,255,0.5);
        font-size:12px;
      }
  }
  .control{
    flex:3;
    display:flex;
    justify-content:space-around;
    align-items:center;
    .musicLeft{
      width:30px;
      height:30px;
      display:inline-block;
      background-image:url('../assets/musicLeft.svg');
      background-size:cover;
    }
    .musicRight{
      width:30px;
      height:30px;
      display:inline-block;
      background-image:url('../assets/musicRight.svg');
      background-size:cover;
    }
    .play{
      width:50px;
      height:50px;
      display:inline-block;
      background-size:cover;
    }
  }
  .playIcon{
    background-image:url('../assets/playIcon.svg')
  }
  .stopIcon{
    background-image:url('../assets/stopPlay.svg')
  }
  .icon{
    color:white;
    font-size:24px;
  }
</style>
