<template>
   <div class="win" :style="{width:width+'px',height:height+'px'}">
      <div :style="{width:conWidth+'px',height:height+'px'}" ref="container" @touchstart="start" @touchmove="dragging" @touchend="end" :class="{homeAni:!draggState}">
       <slot></slot>
     </div>
   </div>
</template>

<script>
export default {
  name: 'calousel',
  props: ['width', 'height', 'num'],
  data () {
    return {
      conWidth: 0,
      draggState: false,
      draggPos: 0,
      layout: [0]
    }
  },
  watch: {
    num (newval) {
      this.$refs.container.style.marginLeft = 0 - this.layout[newval] + 'px'
      this.$emit('getTabNum', newval)
    }
  },
  mounted () {
    let container = this.$refs.container
    let childs = container.children
    let width = 0
    for (let i = 0; i < childs.length; i++) {
      width += childs[i].offsetWidth
      this.layout.push(width)
    }
    this.conWidth = width
  },
  methods: {
    start (e) {
      this.draggState = true
      this.draggPos = e.touches[0].clientX
    },
    dragging (e) {
      e.preventDefault()
      if (!this.draggState) return ''
      let move = e.touches[0].clientX - this.draggPos
      let getStyle = window.getComputedStyle ? window.getComputedStyle : window.currentStyle
      let oldMargin = parseFloat(getStyle(this.$refs.container).marginLeft)
      let nowMargin = oldMargin + move
      if (nowMargin > 0) nowMargin = 0
      if (nowMargin < 0 - this.layout[this.layout.length - 2]) {
        nowMargin = 0 - this.layout[this.layout.length - 2]
      }
      this.$refs.container.style.marginLeft = nowMargin + 'px'
      this.draggPos = e.touches[0].clientX
    },
    end (e) {
      this.draggState = false
      let getStyle = window.getComputedStyle ? window.getComputedStyle : window.currentStyle
      let nowMargin = 0 - parseFloat(getStyle(this.$refs.container).marginLeft)
      for (let i = 0; i < this.layout.length - 1; i++) {
        let middle = (this.layout[i] + this.layout[i + 1]) / 2
        if (nowMargin < middle && nowMargin >= this.layout[i]) {
          nowMargin = this.layout[i]
          this.$emit('getTabNum', i)
          break
        } else if (nowMargin < this.layout[i + 1] && nowMargin >= middle) {
          nowMargin = this.layout[i + 1]
          this.$emit('getTabNum', i + 1)
          break
        }
      }
      this.$refs.container.style.marginLeft = 0 - nowMargin + 'px'
    }
  }
}
</script>

<style lang='css'>
.win{
   overflow:hidden;
}
.homeAni {
   transition: margin 1s
}
</style>
