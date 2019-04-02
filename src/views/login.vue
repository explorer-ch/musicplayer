<template>
  <div class="container">
    <div class="switchpage" v-if="switchfun">
     <button class="btu" @click="goLogin">手机号登录</button>
     <button class="btu" @click="goLogin">邮箱登陆</button>
    </div>
    <div class="login" v-else>
      <div class="footer">
        <i class="font iconfont icon-fanhui" @click="goSwitch"></i>
        <div class="title"></div>
      </div>
      <form class="form">
        <input type="text" class="text" ref="num"/>
        <input type="password" class="text" ref="password"/>
        <input type="button" value="登录" class="submit" @click="numlogin"/>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '../api/index'

export default {
  data () {
    return {
      switchfun: true,
      loginstate: {
      }
    }
  },
  methods: {
    goLogin () {
      this.switchfun = false
    },
    goSwitch () {
      this.switchfun = true
    },
    numlogin () {
      login('cellphone', this.$refs.num.value, this.$refs.password.value)
    }
  }
}
</script>

<style lang="less">
.container{
  width:100%;
  height:100%;
  .switchpage{
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    .btu{
      width:80%;
      height:40px;
      margin:20px 0 20px 0;
      border-radius:10px;
      background:red;
      color:white;
      font-size:15px;
    }
  }
  .login{
    width:100%;
    height:100%;
    .footer{
      height:10%;
      display:flex;
      align-items:center;
      justify-content:center;
      .font{
        font-size:40px;
        color:black;
      }
      .title{
        width:100%;
        height:100%;
      }
    }
    .form{
      width:100%;
      height:50%;
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-items:center;
      .text{
        width:80%;
        height:50px;
        margin:20px 0px 20px 0px;
        font-size:16px;
        border-bottom:1px solid black;
        border-top:0px;
        border-left:0px;
        border-right:0px;
      }
      .text:focus{
        outline:none;
      }
      .submit{
        width:80%;
        height:50px;
        background:red;
        color:white;
        border-radius:10px;
        font-size:18px;
      }
    }
  }
}
</style>
