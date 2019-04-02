<template>
   <div class="win" :style="{width:width+'px',height:height+'px'}">
      <div :style="{width:conWidth+'px',height:height+'px',marginLeft:tabPos+'px'}" ref="container" @touchstart="start" @touchmove="dragging" @touchend="end" :class="{homeAni:!draggState}">
       <slot></slot>
     </div>
   </div>
</template>

<script>
export default {
  name: 'calousel',
  props: ['width', 'height', 'tabKey'],
  data () {
    return {
      conWidth: 0,
      draggState: true,
      draggPos: 0,
      layout: [0],
      tabPos: 0
    }
  },
  watch: {
    tabKey (newval) {
      this.tabPos = 0 - this.layout[newval]
      this.$emit('getTabNum', newval)
    }
  },
  mounted () {
    let container = this.$refs.container
    let childs = container.children
    let width = 0
    let initPos = 0
    for (let i = 0; i < childs.length; i++) {
      if (i < this.tabKey) {
        initPos -= childs[i].offsetWidth
      }
      width += childs[i].offsetWidth
      this.layout.push(width)
    }
    this.conWidth = width
    this.tabPos = initPos
    setTimeout(() => {
      this.draggState = false /* 消除初始化时tab变动的效果 */
    }, 1000)
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
      let nowMargin = this.tabPos + move
      if (nowMargin > 0) nowMargin = 0
      if (nowMargin < 0 - this.layout[this.layout.length - 2]) {
        nowMargin = 0 - this.layout[this.layout.length - 2]
      }
      this.tabPos = nowMargin
      this.draggPos = e.touches[0].clientX
    },
    end (e) {
      this.draggState = false
      let nowMargin = 0 - this.tabPos
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
      this.tabPos = 0 - nowMargin
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
