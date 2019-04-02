import { musicDetail, musicUrl, getLyric } from '../api/index.js'

export function initAudio (audio, vm) {
  audio.oncanplay = function () {
    let musicTime = Math.floor(this.duration)
    vm.$store.commit('computeMusicTime', musicTime)
    vm.$store.commit('switchPlay', true)
    this.play()
  }
  audio.addEventListener('play', function () {
    vm.$store.commit('updateMusicHistory', { ...vm.$store.state.playData.playingMusic })
    this.currentTime = vm.$store.state.playData.playingMusic.currentTime
  })
  audio.addEventListener('timeupdate', function () {
    vm.$store.commit('playing', this.currentTime)
  })
  audio.addEventListener('pause', function () {
    vm.$store.commit('switchPlay', false)
  })
  audio.addEventListener('ended', function () {
    vm.$store.commit('playing', 0)
    vm.$store.commit('switchPlay', true)
    this.play()
    if (vm.$store.state.playData.playRule === 0) {
    } else {
      vm.$store.commit('cyclePlay')
      switchMusic(vm.$store.state.playData.musicStack[0].id, vm)
    }
  })
}

export function switchMusic (id, vm) {
  vm.$store.commit('setMusicId', id)
  musicDetail(id).then((val) => {
    val = val[0]
    let imgUrl = 'url(' + val.al.picUrl + ')'
    let musicAr = val.ar[0].name + ' >'
    let title = val.name + (val.alia[0] ? '(' + val.alia[0] + ')' : '')
    vm.$store.commit('setMusicDetail', { imgUrl, musicAr, title })
  })
  musicUrl(id).then((val) => {
    vm.$store.commit('setMusicSrc', val)
    vm.$store.state.audio.src = val
  })
  getLyric(id).then((val) => {
    let lyric = val.split(/\[[^[\]]*\]/)
    let time = val.match(/\[[^[\]]*\]/g)
    let times = []
    let lyricArr = []
    for (let i = 0; i < time.length; i++) {
      if (lyric[i + 1].trim()) {
        times.push(time[i])
        lyricArr.push(lyric[i + 1])
      }
    }
    let lyricTime = times.map(function (item) {
      let time = item.match(/\[([^\]]*)\]/)[1].split(':')
      return parseFloat(time[0]) * 60 + parseFloat(time[1])
    })
    vm.$store.commit('setMusicLyric', { lyricTime, lyricArr })
  })
}
