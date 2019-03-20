<template>
  <div class="musicCon" @click="play(details.id)">
    <div class="title">{{details.title}}</div>
    <div class="author">{{details.author}}</div>
    <div class="album">{{details.album}}</div>
  </div>
</template>

<script>
export default {
  props: {
    details: Object
  },
  methods: {
    play (id) {
      this.$router.push({ name: 'musicPlayer', params: { id: id }, query: { update: true } })
    }
  }
}
</script>

<style lang="less" scoped>
.musicCon{
   border:1px solid rgba(0, 0, 0, .05);
   padding:5px 0px 5px 0px;
   .title{
     margin:6px 0px 6px 0px;
     font-size:16px;
     font-family:Microsoft YaHei;
   }
   .author{
     margin:6px 0px 6px 0px;
     font-size:12px;
     font-family:Microsoft YaHei;
   }
   .album{
     margin:6px 0px 6px 0px;
     font-size:13px;
     font-family:Microsoft YaHei;
   }
}
</style>
