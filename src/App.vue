<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商 品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评 论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商 家</router-link>
      </div>
    </div>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue';
  import {urlParse} from 'common/js/util';
  const  ERR_OK = 0;
  export  default {
    data() {
      return {
        seller:{
          //获取商家id
          id:(()=>{
            let queryParam = urlParse();
            console.log(' queryParam.id='+ queryParam.id)
            return queryParam.id;
          })()
        }
      }
    },
    created(){
      this.$http.get('/api/seller?id='+ this.seller.id).then((response)=>{
        response = response.body;
        if (response.errno === ERR_OK){
          //扩展seller,添加商家id
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    },
    components:{
      'v-header':header
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
     display :flex
     width:100%;
     height:40px;
     line-height: 40px;
     border-1px(rgba(7,17,27,0.1))
    .tab-item
       flex:1;
       text-align center;
       & > a
          display: block
          font-size :14px
          color: rgb(77,85,93)
          &.active
            color: rgb(240,20,20)
</style>
