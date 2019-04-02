<template>
   <div class="container" ref="body">
     <div class="placeholder" :style="{backgroundImage:'url('+mes.coverImgUrl+')'}"></div>
     <div class="faceplane" ref="container" :style="{'overflow':scrollState?'scroll':'hidden'}">
     <div class="header">
       <i class="font iconfont icon-fanhui" @click="back"></i>
       <div class="sheettitle">{{mes.name}}</div>
     </div>
     <div class="describe">
       <div class="image" :style="{backgroundImage:'url('+mes.coverImgUrl+')'}"></div>
       <div class="describeText">
         <div class="desTitle">{{mes.name}}</div>
         <div class="author">
           <div class="avatar" :style="{backgroundImage:'url('+mes.creator.avatarUrl+')'}"></div>
           <div class="nickname">{{mes.creator.nickname+'>'}}</div>
         </div> <!--待添加创建者用户界面功能-->
         <div class="introduce">{{mes.description}}</div>
       </div>
     </div>
     <div class="content">
       <div class="menu">
         <div class="play"><i class="font iconfont icon-play_icon"></i>{{'播放全部(共'+musics.length+'首)'}}</div>
         <div></div>
       </div>
       <div class="musicList" :style="{'overflow':scrollState?'hidden':'scroll','height':listheight+'px'}" ref="list">
         <!--<music v-for="(detail,index) in musics" :details="detail" :key="index"></music>-->
         <div class="music" v-for="(detail,index) in musics" :key="index" @click="playmusic(detail.id,index)">
           <div class="serialnum" :style="{'display':index===playingKey?'none':'block'}">{{index+1}}</div>
           <i class="font iconfont icon-laba" :style="{'display':index===playingKey?'inline-block':'none'}"></i>
           <div class="musicmes">
             <span class="musictitle">{{detail.title}}</span>
             <span class="musicAuthor">{{detail.author}}</span>
           </div>
         </div>
       </div>
     </div>
     </div>
   </div>
</template>

<script>
import { songSheetDetail, musicDetail } from '../api/index'
import { switchMusic } from '../util/playStystem'

export default {
  created () {
    songSheetDetail(this.id).then((val) => {
      this.mes = val.data.playlist
      return val.data.playlist.trackIds
    }).then((val) => {
      let ids = ''
      for (let i = 0; i < val.length; i++) {
        if (i === val.length - 1) {
          ids += val[i].id
        } else {
          ids += val[i].id + ','
        }
      }
      musicDetail(ids).then((val) => {
        this.musics = val.map((song) => {
          let detail = {}
          detail.id = song.id
          detail.title = song.name
          detail.author = song.ar[0].name
          return detail
        })
      })
    })
  },
  mounted () {
    let self = this
    let allheight = this.$refs.body.offsetHeight
    this.listheight = allheight * 0.9 - 50 /* 计算歌曲容器的高度 */
    this.$refs.container.addEventListener('scroll', function () {
      let pos = this.offsetHeight * 0.3
      if (this.scrollTop >= pos) {
        self.scrollState = false
      }
    })
    this.$refs.list.addEventListener('scroll', function () {
      if (this.scrollTop === 0) {
        self.scrollState = true
      }
    })
  },
  props: ['id'],
  data () {
    return {
      mes: { creator: {} },
      musics: [],
      scrollState: true,
      listheight: 0,
      playingKey: null
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    playmusic (id, key) {
      this.playingKey = key
      switchMusic(id, this)
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width:100%;
  height:100%;
  position:relative;
  .placeholder{
    width:100%;
    height:100%;
    background-size:cover;
    filter:blur(40px);
    display:flex;
    position:absolute;
    z-index:-1;
  }
  .faceplane{
    width:100%;
    height:100%;
    position:relative;
    background:rgba(255, 255, 255, .05);
    .header{
      width:100%;
      height:10%;
      position:fixed;
      top:0px;
      z-index:20;
      border-bottom:1px solid rgba(0, 0, 0, .05);
      display:flex;
      justify-content:space-between;
      align-items:center;
      background:rgba(255, 255, 255, .05);
      .font{
        width:50px;
        height:50px;
        display:inline-block;
        color:white;
        font-size:40px;
      }
      .sheettitle{
        width:80%;
        height:100%;
        color:white;
        line-height:300%;
      }
    }
    .describe{
      height:40%;
      display:flex;
      justify-content:space-around;
      align-items:center;
      .image{
        background-size:cover;
        width:100px;
        height:100px;
      }
      .describeText{
        width:200px;
        height:100px;
        .desTitle{
          height:40%;
          color:white;
          font-size:18px;
          overflow:hidden;
        }
        .author{
          height:20%;
          display:flex;
          justify-content:flex-start;
          align-items:center;
          .avatar{
            width:20px;
            height:20px;
            border-radius:50%;
            background-size:cover;
          }
          .nickname{
            margin-left:5px;
            color:14px;
            color:rgba(255,255,255,0.5);
          }
        }
        .introduce{
          height:40%;
          overflow:auto;
          color:rgba(255,255,255,0.5);
          font-size:13px;
        }
      }
    }
    .content{
      background:rgba(255,255,255,1);
      border-radius:30px 30px 0 0;
      .menu{
        height:50px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        .play{
          height:40px;
          display:flex;
          align-items:center;
          .font{
            margin:0 10px 0px 20px;
            font-size:30px;
          }
        }
      }
      .music{
        height:50px;
        border-bottom:1px solid rgba(0,0,0,0.1);
        display:flex;
        flex-direction:row;
        justify-content:flex-start;
        .serialnum{
          width:50px;
          height:50px;
          font-size:25px;
          color:rgba(0,0,0,0.3);
          line-height:60px;
          text-align:center;
        }
        .font{
          width:50px;
          height:50px;
          color:red;
          font-size:25px;
          text-align:center;
          line-height:50px;
        }
        .musicmes{
          flex-grow:1;
          display:flex;
          flex-direction:column;
          .musictitle{
            flex:1;
            line-height:25px;
            font-size:16px;
          }
          .musicAuthor{
            flex:1;
            line-height:25px;
            font-size:12px;
            color:rgba(0,0,0,0.3);
          }
        }
      }
    }
  }
}
</style>
