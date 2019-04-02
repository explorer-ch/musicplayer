<template>
  <div class="container">
    <div class="header">
      <i class="font iconfont icon-fanhui" @click="back"></i>
      <span class="title">排行榜</span>
    </div>
    <div class="rankicon" v-for="(mes, index) in rankmes" :key="index">
      <div class="image" :style="{backgroundImage:'url('+mes.img+')'}"></div>
      <div class="content">
        <div class="musicname" v-for="(list,key) in mes.lists" :key="key">{{key+1+'.'+list}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { rank, musicDetail } from '../api/index'
/* 0：新歌榜 1:热歌榜 2：原创榜 3:飙升榜 */
const rankkeys = [0, 1, 2, 3]

export default {
  created () {
    for (let i = 0; i < rankkeys.length; i++) {
      let mes = {}
      mes.lists = []
      rank(rankkeys[i]).then((val) => {
        this.id.push(val.id)
        mes.img = val.coverImgUrl
        let lists = val.trackIds.slice(0, 3)
        for (let j = 0; j < 3; j++) {
          musicDetail(lists[j].id).then((song) => {
            let title = song[0].name + '-' + song[0].ar[0].name
            mes.lists.push(title)
          })
        }
      })
      this.rankmes.push(mes)
    }
  },
  data () {
    return {
      rankmes: [],
      id: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width:100%;
  height:100%;
  .header{
    height:40px;
    display:flex;
    .font{
      width:40px;
      height:40px;
      font-size:25px;
      text-align:center;
      line-height:40px;
    }
    .title{
      margin-left:30px;
      color:20px;
      line-height:40px;
    }
  }
  .rankicon{
    height:100px;
    display:flex;
    margin:10px 0 10px 0;
    .image{
      background-size:cover;
      width:100px;
      height:100px;
      border-radius:3px;
      margin:0 10px 0 10px;
    }
    .content{
      flex:1;
      display:flex;
      flex-direction:column;
      .musicname{
        flex:1;
        overflow:hidden;
        color:rgba(0,0,0,0.6);
      }
    }
  }
}
</style>
