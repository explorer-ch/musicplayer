<template>
  <div class="container">
    <div class="upBgd"></div>
    <div class="mesCol">
      <div class="img"></div>
      <span>古月方玄</span>
    </div>
    <div class="content">
      <ul class="mes">
        <li><i class="font iconfont icon-yinle"></i>本地音乐</li>
        <li><i class="font iconfont icon-zuijinbofang"></i>最近播放</li>
        <li><i class="font iconfont icon-xiazai"></i>下载管理</li>
        <li><i class="font iconfont icon-diantaizhibo"></i>我的电台</li>
        <li><i class="font iconfont icon-shoucang"></i>我的收藏</li>
      </ul>
    </div>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
.container{
  width:362px;
  height:578px;
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
      background-image:url('../assets/header.jpg');
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
