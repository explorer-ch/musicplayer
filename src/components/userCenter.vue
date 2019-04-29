<template>
  <div class="container">
    <div class="upBgd"></div>
    <div class="mesCol">
      <div class="img" :style="{backgroundImage:userImg}"></div>
      <span>{{nickname}}</span>
    </div>
    <div class="content">
      <ul class="mes">
        <li><i class="font iconfont icon-yinle"></i>本地音乐</li>
        <li @click="gotofun"><i class="font iconfont icon-zuijinbofang"></i>最近播放</li>
        <li><i class="font iconfont icon-xiazai"></i>下载管理</li>
        <li><i class="font iconfont icon-diantaizhibo"></i>我的电台</li>
        <li><i class="font iconfont icon-shoucang"></i>我的收藏</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userImg () {
      return this.$store.state.loginState ? 'url(' + this.$store.state.user.headImg + ')' : ''
    },
    nickname () {
      return this.$store.state.loginState ? this.$store.state.user.nickname : ''
    }
  },
  methods: {
    gotofun () {
      if (this.$store.state.loginState) this.$router.push({ name: 'localFun' })
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width:100%;
  height:100%;
  position:relative;
  .upBgd{
    height:15%;
    background-color:red;
  }
  .mesCol{
    width:90%;
    height:15%;
    box-shadow:2px 2px 2px gray;
    border-radius:4px;
    position:absolute;
    left:50%;
    top:5%;
    background-color:white;
    transform:translateX(-50%);
    display:flex;
    align-items:center;
    padding:0px 10px 0px 10px;
    .img{
      width:50px;
      height:50px;
      border-radius:50%;
      background-size:cover;
      margin-right:10px;
    }
  }
  .content{
    height:70%;
    padding-top:15%;
  }
}
.mes{
  padding:0px;
  list-style:none;
  margin:0px;
  li{
    height:50px;
    border-bottom:1px solid rgba(0, 0, 0, .05);
    line-height:50px;
  }
}
.font{
  font-size:24px;
  margin:15px;
  color:red;
}
</style>
