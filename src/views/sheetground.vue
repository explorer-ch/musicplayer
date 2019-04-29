<template>
  <div class="container">
    <div class="bgCon" :style="{'backgroundImage':bgImg}"></div>
    <div class="content">
      <div class="header">
        <i class="font iconfont icon-fanhui" @click="back"></i>
        歌单广场
      </div>
      <div class="sheetsCon" ref="contentCon">
        <div class="carousel" ref="car">
          <songSheetIcon class="plate" :style="{'transform':computeCar(index, carouselKey, carouselWid), 'zIndex':index===carouselKey?1:0,'opacity':index===carouselKey?0.8:0.5}" v-for="(icon,index) in carouselIcons" :mes="icon" :key="index" :index="index" :unswitched="index !== carouselKey" @changeKey="changekey"></songSheetIcon>
        </div>
        <div class="sheets" ref="sheets">
          <songSheetIcon  v-for="(songSheet,index) in songSheets" :mes="songSheet" :key="index"></songSheetIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllSheet } from '../api/index'
import songSheetIcon from '../components/songSheetIcon'

export default {
  name: 'sheetground',
  created () {
    getAllSheet(21).then((val) => {
      let arr = val.playlists.slice(0, 3)
      let songs = val.playlists.slice(3)
      this.songSheets = songs.map((item) => {
        let nitem = {}
        nitem.id = item.id
        nitem.name = item.name
        nitem.playCount = item.playCount
        nitem.picUrl = item.coverImgUrl
        return nitem
      })
      this.beforesongsheet = val.playlists.slice(-1)[0].updateTime
      this.carouselIcons = arr.map((item) => {
        let nitem = {}
        nitem.id = item.id
        nitem.name = item.name
        nitem.playCount = item.playCount
        nitem.picUrl = item.coverImgUrl
        return nitem
      })
    })
  },
  mounted () {
    this.carouselWid = this.$refs.contentCon.offsetWidth
    let sheets = this.$refs.sheets
    let car = this.$refs.car
    let self = this
    this.$refs.contentCon.addEventListener('scroll', function () {
      let scrollLen = sheets.offsetHeight + car.offsetHeight - this.offsetHeight
      if (this.scrollTop === scrollLen) {
        getAllSheet(18, self.beforesongsheet).then((val) => {
          self.beforesongsheet = val.playlists.slice(-1)[0].updateTime
          let songSheets = val.playlists.map((item) => {
            let nitem = {}
            nitem.id = item.id
            nitem.name = item.name
            nitem.playCount = item.playCount
            nitem.picUrl = item.coverImgUrl
            return nitem
          })
          self.songSheets = self.songSheets.concat(songSheets)
        })
      }
    })
  },
  data () {
    return {
      carouselIcons: [],
      carouselKey: 1,
      carouselWid: 0,
      songSheets: [],
      beforesongsheet: 0
    }
  },
  computed: {
    bgImg () {
      let url = this.carouselIcons[this.carouselKey]
      return url ? 'url(' + url.picUrl + ')' : ''
    }
  },
  components: {
    songSheetIcon
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    computeCar (key, cKey, conWid) {
      let left
      let scalenum
      if (key === cKey) {
        left = (conWid * 0.5 - 100) + 'px'
        scalenum = 1
      } else {
        scalenum = 0.8
        if (cKey !== 2) {
          if (key === (cKey + 1)) {
            left = (conWid - 10 - 200 * 0.8) + 'px'
          } else {
            left = 0 + 'px'
          }
        } else {
          if (key === (cKey - 1)) {
            left = 0 + 'px'
          } else {
            left = (conWid - 10 - 200 * 0.8) + 'px'
          }
        }
      }
      return `translateX(${left}) scale(${scalenum})`
    },
    changekey (key) {
      this.carouselKey = key
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    width:100%;
    height:100%;
    position:relative;
    .bgCon{
      width:100%;
      height:20%;
      position:absolute;
      z-index:-1;
      background-size:cover;
      filter:blur(40px);
    }
    .content{
      width:100%;
      height:100%;
      background:rgba(255,255,255,0.01);
      display:flex;
      align-items:center;
      flex-direction:column;
      .header{
        width:100%;
        height:10%;
        display:flex;
        align-items:center;
        justify-content:flex-start;
        font-size:20px;
        .font{
          font-size:30px;
          margin:0 10px 0 10px;
        }
      }
      .sheetsCon{
        width:100%;
        height:90%;
        overflow:auto;
        .sheets{
          font-size:10px;
          display:flex;
          justify-content:space-around;
          align-content:space-around;
          flex-wrap:wrap;
        }
      }
    }
  }
  .carousel{
    width:100%;
    height:250px;
    transform-style: preserve-3d;
    perspective:600px;
    position:relative;
    font-size:15px;
  }
  .plate{
    position:absolute;
    left:0px;
    top:0px;
    box-shadow:2px 2px 2px #888888;
    transition:transform 1s;
  }
</style>
