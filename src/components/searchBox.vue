<template>
  <div class="top">
    <div class="back">
       <i class="back-icon" @click="backHome"></i>
    </div>
    <input class="searchInput" v-model="mes" @keydown="search"/>
    <i class="cancel-icon" v-show="cancel" @click="cancelClick"></i>
  </div>
</template>

<script>
export default {
  name: 'searchBox',
  methods: {
    backHome () {
      this.$router.push('/home')
    },
    cancelClick () {
      this.mes = ''
    },
    search (e) {
      if (e.keyCode === 13 || e.keyCode === 108) {
        this.$router.push({ name: 'musicList', params: { keyword: this.mes } })
      }
    }
  },
  computed: {
    cancel () {
      return !!this.mes
    }
  },
  data () {
    return {
      mes: ''
    }
  }
}
</script>

<style lang="less" scoped>
.top{
   height:8%;
   background-color:red;
   padding:2%;
   position:relative;
   display:flex;
   .back{
      flex:1;
      padding:10px;
      .back-icon{
         width:30px;
         height:30px;
         display:inline-block;
         background-image:url('../assets/backIcon.svg');
         background-size:cover;
         display:inline-block;
      }
   }
   .searchInput:focus{
      outline:none;
   }
   .searchInput{
      flex:2;
      font-size:24px;
      border-left:0px;
      border-top:0px;
      border-right:0px;
      border-bottom:1px solid white;
      background-color:red;
      color:white;
   }
   .cancel-icon{
      width:30px;
      height:30px;
      top:20px;
      right:10px;
      position:absolute;
      display:inline-block;
      background-image:url('../assets/cancelIcon.svg');
      background-size:cover;
    }
}
</style>
