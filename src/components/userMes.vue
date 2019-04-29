<template>
    <div class="menu" v-on:click="hide" :style="{marginLeft:pos,backgroundColor:ground}" ref="child">
      <div class="slide" data-title='slide'>
        <div class="header" data-id='1'>
          <div class="headerLeft">
            <div class="headerPic" :style="{backgroundImage:userImg}"></div>
            <div class="headerName">
              <span class="userName">{{nickname}}</span>
            </div>
          </div>
          <div class="headerRight"></div>
        </div>
        <div class="content" data-id='3'>
          <ul>
            <li>我的消息</li>
            <li>会员中心</li>
            <li>商城</li>
            <li>在线听歌免流量</li>
          </ul>
          <ul>
            <li>我的好友</li>
            <li>附近的人</li>
            <li @click="unlogin">退出</li>
          </ul>
        </div>
        <div class="footer" data-id='3'>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'userMes',
  data () {
    return {
    }
  },
  computed: {
    pos () {
      return this.$store.state.slideCom.slidePos
    },
    ground () {
      return this.$store.state.slideCom.slideGround
    },
    userImg () {
      return this.$store.state.loginState ? 'url(' + this.$store.state.user.headImg + ')' : ''
    },
    nickname () {
      return this.$store.state.loginState ? this.$store.state.user.nickname : ''
    }
  },
  methods: {
    hide (e) {
      let target = e.target
      if (target.dataset.id) {
        target = target.parentNode
      }
      if (!target.dataset.title) {
        this.$store.commit('controlSlidePos', '-100%')
        this.$store.commit('controlSlideGround', 'rgba(0,0,0,0)')
      }
    },
    unlogin (e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation()
      this.$store.commit('unlogin')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="less" scoped>
  .menu{
     width:100%;
     height:100%;
     z-index:10;
     position:absolute;
     transition:margin .5s,background-color .5s;
     -webkit-transition:margin .5s,background-color .5s;
     -o-transition:margin .5s,background-color .5s;
     -moz-transition:margin .5s,background-color .5s;
     .slide{
     width:80%;
     height:100%;
     display:flex;
     background-color:white;
     flex-direction:column;
     justify-content:space-between;
     border-width:0px 1px 0px 0px;
     border-style:solid;
     border-color:gray;
     .header{
        flex:0 0 33%;
        background-color:red;
        display:flex;
        .headerLeft{
          flex:0 0 50%;
          display:flex;
          flex-direction:column;
          padding:5%;
          .headerPic{
            flex:0 0 67%;
            border-radius:50%;
            background-size:cover;
          }
          .headerName{
            flex:0 0 33%;
            line-height:500%;
            .userName{
              color:white;
              margin-left:27%;
              border-radius:30%;
              font-size:20px;
            }
          }
        }
        .headerRight{
          flex:0 0 50%;
        }
     }
     .content{
        flex:0 0 67%;
     }
     .content ul{
      list-style:none;
      margin:0px;
      padding:20px 15px 5px 15px;
      border-bottom:5px solid rgba(0, 0, 0, .05);
      li{
        height:30px;
        margin-bottom:10px;
      }
     }
     .footer{
        position:absolute;
        bottom:0px;
        left:0px;
        width:80%;
        height:8%;
        border-width:1px 0px 0px 0px;
        border-style:solid;
        border-color:gray;
        background-color:white;
     }
     }
  }
</style>
