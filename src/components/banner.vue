<template>
   <div class="showLayer" :style="{width: w+'px', height: h+'px'}" @touchstart="start" @touchmove="dragging" @touchend="end">
     <div class="imgCon" :style="{width: w*imgs.length+'px', height: h+'px',marginLeft:banPos+'px'}" :class="{'banSlide':!jmpPic}">
       <div class="imgPlate" v-for="(img,index) in imgs" :key="index" :style="{backgroundImage:'url('+img.imageUrl+')',width: w+'px', height: h+'px'}"></div>
     </div>
     <div class="piontBlock">
      <i class="piont" v-for="(piont,index) in pionts" :key="index" :class="{'curPiont':index===picKey}"></i>
     </div>
   </div>
</template>

<script>
import { getBanner } from '../api/index'

export default {
  created () {
    this.banPos = 0 - this.w
    getBanner().then((val) => {
      this.pionts = new Array(val.length)
      if (val.length) {
        let leftimg = val[0]
        let rightimg = val[val.length - 1]
        val.unshift(rightimg)
        val.push(leftimg)
      }
      this.imgs = val
    })
    this.ani = setInterval(() => {
      if (this.banPos > -(this.w * (this.imgs.length - 1))) {
        this.jmpPic = false
        this.banPos -= this.w
      } else {
        this.jmpPic = true
        this.banPos = -this.w
      }
    }, 3000)
  },
  watch: {
    animateState (val, oldval) {
      if (this.ani) {
        clearInterval(this.ani)
        this.ani = null
      } else {
        this.ani = setInterval(() => {
          if (this.banPos > -(this.w * (this.imgs.length - 1))) {
            this.jmpPic = false
            this.banPos -= this.w
          } else {
            this.jmpPic = true
            this.banPos = -this.w
          }
        }, 3000)
      }
    }
  },
  data () {
    return {
      imgs: [],
      animateState: true,
      ani: null,
      banPos: 0,
      jmpPic: false,
      pionts: [],
      draggPos: 0
    }
  },
  computed: {
    picKey () {
      let index = -this.banPos / this.w - 1
      if (index === -1) {
        index = this.pionts.length - 1
      }
      if (index === this.pionts.length) {
        index = 0
      }
      return index
    }
  },
  props: ['w', 'h'],
  methods: {
    start (e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation()
      this.animateState = false
      this.jmpPic = true
      this.draggPos = e.touches[0].clientX
    },
    dragging (e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation()
      let move = e.touches[0].clientX - this.draggPos
      this.banPos = this.banPos + move
      this.draggPos = e.touches[0].clientX
    },
    end (e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation()
      this.jmpPic = false
      let curKey = -Math.round(this.banPos / this.w)
      this.banPos = -curKey * this.w
      this.animateState = true
      if (curKey === 0) {
        setTimeout(() => {
          this.jmpPic = true
          this.banPos = -this.pionts.length * this.w
        }, 1000)
      }
      if (curKey === this.imgs.length - 1) {
        setTimeout(() => {
          this.jmpPic = true
          this.banPos = -this.w
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
   .showLayer{
     width:200px;
     height:100px;
     border:1px solid black;
     border-radius:2%;
     overflow:hidden;
     .imgCon{
       .imgPlate{
         background-size:cover;
         float:left;
       }
     }
     .piontBlock{
       position:absolute;
       left:50%;
       transform:translateX(-50%);
       bottom:5%;
       display:flex;
       justify-content:space-around;
       align-items:center;
       .piont{
        width:10px;
        height:10px;
        border-radius:50%;
        background:gray;
        display:inline-block;
        margin:3px;
       }
       .curPiont{
         background:red;
       }
     }
   }
   .banSlide{
     transition:margin 1s;
   }
</style>
