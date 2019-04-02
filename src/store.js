import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slideCom: {
      slidePos: '-100%',
      slideGround: 'rgba(0,0,0,0)'
    },
    audio: null,
    searchHistory: [],
    playData: {
      musicStack: [], // 当前播放的歌一定在数组的第一个
      playing: false,
      playRule: 0, // 0:single,1:cycle,2:random
      playingMusic: {
        id: '',
        src: '',
        currentTime: 0,
        musicTime: 0,
        lyricArr: [],
        lyricTime: [],
        imgUrl: '',
        musicAr: '',
        title: ''
      }
    },
    playListlayerShow: false,
    smallPlayer: true
  },
  mutations: {
    loadAudio (state, obj) {
      state.audio = obj
    },
    addSearchHistory (state, history) {
      let res = state.searchHistory.findIndex((item) => {
        return item === history
      })
      if (res === -1) {
        state.searchHistory.push(history)
      }
    },
    emptyHistory (state) {
      state.searchHistory = []
    },
    computeMusicTime (state, time) {
      state.playData.playingMusic.musicTime = time
    },
    setMusicId (state, id) {
      state.playData.playingMusic.id = id
    },
    setMusicDetail (state, detail) {
      state.playData.playingMusic.imgUrl = detail.imgUrl
      state.playData.playingMusic.musicAr = detail.musicAr
      state.playData.playingMusic.title = detail.title
    },
    setMusicSrc (state, src) {
      state.playData.playingMusic.src = src
    },
    setMusicLyric (state, lyric) {
      state.playData.playingMusic.lyricArr = lyric.lyricArr
      state.playData.playingMusic.lyricTime = lyric.lyricTime
    },
    switchPlay (state, bool) {
      if (bool === undefined) {
        state.playData.playing = !state.playData.playing
      } else {
        state.playData.playing = bool
      }
    },
    playing (state, time) {
      state.playData.playingMusic.currentTime = time
    },
    controlSlidePos (state, pos) {
      state.slideCom.slidePos = pos
    },
    controlSlideGround (state, ground) {
      state.slideCom.slideGround = ground
    },
    changePlayMode (state) {
      state.playData.playRule = (state.playData.playRule + 1) % 3
    },
    emptyMusicList (state) {
      state.playData.musicStack = []
      state.audio.src = ''
    },
    updateMusicHistory (state, music) {
      let res = state.playData.musicStack.findIndex((item) => {
        return item.id === music.id
      })
      if (res !== -1) {
        state.playData.musicStack.splice(res, 1)
        state.playData.musicStack.unshift(music)
      } else {
        state.playData.musicStack.unshift(music)
      }
    },
    cyclePlay (state) {
      let music = state.playData.musicStack.shift()
      state.playData.musicStack.push(music)
    },
    inversecyclePlay (state) {
      let music = state.playData.musicStack.pop()
      state.playData.musicStack.unshift(music)
    },
    switchListLayer (state) {
      state.playListlayerShow = !state.playListlayerShow
    },
    switchPlayer (state) {
      state.smallPlayer = !state.smallPlayer
    }
  }
})
