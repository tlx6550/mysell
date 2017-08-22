<template>
  <div class="goods">
    <div class="menu-wrapper"></div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    background-color:#7e8c8d
    .menu-wrapper
      flex:0 0 80px
      width: 80px
      background:#f3f5f7
    .foods-wrapper
      display: flex
</style>
