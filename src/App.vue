<template>
  <div>
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商 品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评 论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家2</router-link>
      </div>
    </div>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import header from 'components/header/header.vue';
  export  default {
    components:{
      'v-header':header
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .tab
     display :flex
     width:100%;
     height:40px;
     line-height 40px;
     .tab-item
       flex:1;
       text-align center;
</style>
