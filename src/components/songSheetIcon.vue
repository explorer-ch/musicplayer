<template>
   <div class="sheetCon" @click="openSheet(mes.id)">
    <div class="sheetData">
      <i class="intricon iconfont icon-tubiaozhizuomobanyihuifu-"></i>
      <span>{{playCount}}</span>
    </div>
    <div class="img" :style="{backgroundImage:'url('+mes.picUrl+')'}"></div>
    <div class="title">{{mes.name}}</div>
   </div>
</template>

<script>
export default {
  props: ['mes', 'unswitched', 'index'],
  computed: {
    playCount () {
      if (this.mes.playCount < 10000) {
        return this.mes.playCount
      } else {
        return Math.floor(this.mes.playCount / 10000) + '万'
      }
    }
  },
  methods: {
    openSheet (id) {
      if (this.unswitched) {
        this.$emit('changeKey', this.index)
      } else {
        this.$router.push({ name: 'songSheet', params: { id: id } })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .sheetCon{
    width:10em;
    height:14em;
    margin:1em;
    display:inline-block;
    position:relative;
    .sheetData{
      position:absolute;
      width:5em;
      height:2em;
      top:0px;
      right:0px;
      display:flex;
      justify-content:center;
      align-items:center;
      .intricon{
        color:white;
        font-size:13px;
      }
      span{
        color:white;
        font-size:1em;
        display:inline-block;
        width:3em;
        height:2em;
        line-height:2em;
      }
    }
    .img{
      width:10em;
      height:10em;
      background-size:cover;
    }
    .title{
      font-size:1em;
      height:4em;
      line-height:2em;
      background:white;
    }
  }
</style>
