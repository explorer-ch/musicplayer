<template>
   <div class="root">
     <playList></playList>
     <div class="groundImg" :style="{backgroundImage:imgUrl}"></div>
     <div class="container">
       <div class="header">
         <i class="back-icon" @click="back"></i>
         <div class="titleCon">
           <div class="title">
            <div class="fontAni">
              <span class="moveTxt">{{title}}</span>
              <span class="moveTxt repateTxt">{{title}}</span>
            </div>
           </div>
           <div class="ar">{{musicAr}}</div>
         </div>
         <i class="link-icon"></i>
       </div>
       <div class="middle" @click="changeCon" ref="scroll">
         <div class="imgCon" :style="{display:imgConShow}">
           <div class="diskeet" :class="{playAni:playState}">
             <div class="img" :style="{backgroundImage:imgUrl}" :class="{playAni:playState}"></div>
           </div>
         </div>
         <div class="LyricCon" :style="{display:lyricConShow}">
           <div class="lyricText" v-for="(lyric,index) in lyricArr" :key="index" :style ="{'color':scrollPos===index?'rgba(255, 255, 255, 1)':'rgba(255, 255, 255, .5)'}"><span>{{lyric}}</span></div>
         </div>
       </div>
       <div class="footer">
         <audioer  @lyricAni="lyricMove"></audioer>
       </div>
     </div>
   </div>
</template>

<script>
import audioer from './audioer.vue'
import store from '../store'
import playList from './playList.vue'
import { switchMusic } from '../util/playStystem'

export default {
  name: 'musicPlayer',
  props: ['id'],
  components: {
    audioer,
    playList
  },
  watch: {
    scrollPos (val, oldval) {
      if (val !== oldval) {
        this.$refs.scroll.scrollTo(0, val * 40)
      }
    }
  },
  data () {
    return {
      lyricShow: false,
      scrollPos: 0
    }
  },
  computed: {
    playState () {
      return this.$store.state.playData.playing
    },
    imgConShow () {
      return this.lyricShow ? 'none' : 'flex'
    },
    lyricConShow () {
      return this.lyricShow ? 'block' : 'none'
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
    lyricArr () {
      return this.$store.state.playData.playingMusic.lyricArr
    },
    lyricTime () {
      return this.$store.state.playData.playingMusic.lyricTime
    }
  },
  created () {
    if (this.$route.query.update) {
      switchMusic(this.id, this)
    }
  },
  methods: {
    controlState (state) {
      this.playState = state
    },
    back () {
      this.$router.push('/home')
    },
    changeCon () {
      this.lyricShow = !this.lyricShow
    },
    lyricMove (time) {
      let times = this.lyricTime
      for (let i = 0; i < times.length; i++) {
        if (i === times.length - 1 && times[i] <= time) {
          this.scrollPos = i
        } else if (times[i] <= time && time <= times[i + 1]) {
          this.scrollPos = i
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    store.commit('switchPlayer')
    next()
  },
  beforeRouteLeave (to, from, next) {
    store.commit('switchPlayer')
    next()
  }
}
</script>

<style lang="less" scoped>
.playAni{
  animation:rotate 20s linear infinite;
}
@keyframes rotate {
  0%{
    transform:rotate(0deg);
  }
  50%{
    transform:rotate(180deg);
  }
  100%{
    transform:rotate(360deg);
  }
}
.root{
   width:100%;
   height:100%;
}
.groundImg{
   width:100%;
   height:100%;
   position:absolute;
   background-size:cover;
   filter:blur(40px);
}
.container{
   width:100%;
   height:100%;
   background-color:rgba(0,0,0,0.1);
   position:absolute;
   z-index:10;
   .header{
     height:10%;
     border:1px solid rgba(0, 0, 0, .05);
     display:flex;
     justify-content:space-around;
     align-items:center;
   }
   .middle{
     height:75%;
     overflow:scroll;
     .imgCon{
       width:100%;
       height:100%;
       justify-content:center;
       align-items:center;
       .diskeet{
         width:260px;
         height:260px;
         border-radius:50%;
         background-image:url('../assets/icon_diskette.png');
         background-size:cover;
         display:flex;
         justify-content:center;
         align-items:center;
         .img{
           background-size:cover;
           width:74%;
           height:74%;
           border-radius:50%;
         }
       }
     }
     .LyricCon{
       width:100%;
       .lyricText{
         height:20px;
         color:rgba(255, 255, 255, .5);
         margin-top:20px;
         margin-bottom:20px;
         display:flex;
         justify-content:center;
         align-items:center;
       }
     }
   }
   .footer{
     height:15%;
    }
   .back-icon{
     width:40px;
     height:40px;
     display:inline-block;
     background-image:url('../assets/backIcon.svg');
     background-size:cover;
   }
   .titleCon{
     width:60%;
     height:100%;
     display:flex;
     flex-direction:column;
     .title{
       flex:2;
       position:relative;
       overflow:hidden;
       .fontAni{
         position:absolute;
         width:300%;
         height:100%;
         line-height:40px;
         color:white;
         .moveTxt{
           animation:move 20s linear 5s infinite;
           -moz-animation:move 20s linear 5s infinite;
           -o-animation:move 20s linear 2s infinite;
           -webkit-animation:move 20s linear 5s infinite;
           display:inline-block;
         }
         .repateTxt{
           position:relative;
           left:10%;
         }
         @keyframes move{
           0%,25%{
             transform:translate(0,0);
           }
           100%{
             transform:translate(-110%,0);
           }
         }
       }
     }
     .ar{
       flex:1;
       color:rgba(255,255,255,0.5);
     }
   }
   .link-icon{
     width:40px;
     height:40px;
     display:inline-block;
     background-image:url('../assets/linkIcon.svg');
     background-size:cover;
     display:inline-block;
   }
}
</style>
