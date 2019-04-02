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
  props: ['mes'],
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
      this.$router.push({ name: 'songSheet', params: { id: id } })
    }
  }
}
</script>

<style lang="less" scoped>
  .sheetCon{
    width:100px;
    height:140px;
    margin:10px;
    display:inline-block;
    position:relative;
    .sheetData{
      position:absolute;
      width:50px;
      height:20px;
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
        font-size:10px;
        display:inline-block;
        width:30px;
        height:20px;
        line-height:20px;
      }
    }
    .img{
      width:100px;
      height:100px;
      background-size:cover;
    }
    .title{
      font-size:10px;
      height:40px;
    }
  }
</style>
