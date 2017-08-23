<template>
  <div class="goods">
     <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
             <span class="text border-1px">
               <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
             </span>
          </li>
        </ul>
      </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list"  ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" >
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/*  vm.$nextTick( [callback] )
  将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新*/
  const  ERR_OK = 0;
  import BScroll from 'better-scroll'
export default {
  props:{
    seller:{
      type:Object
    }
  }
  ,data(){
    return{
      goods:[]
      ,listHeight:[]
      ,scrolly:0
    }
  }
  ,computed:{
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrolly >= height1 && this.scrolly < height2)) {
          return i;
        }
      }
      return 0;
    }
  }
  ,created(){
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then((response)=>{
      response = response.body;
      if (response.errno === ERR_OK){
        this.goods = response.data;
        this.$nextTick( ()=> {
          this._initScroll();
          this._caculateHeight();
        });
      }
    });
  }
  ,methods:{
    _initScroll(){
      this.menuWrapper = new BScroll(this.$refs.menuWrapper,{
        click:true
      });
      this.foodsWrapper = new BScroll(this.$refs.foodsWrapper,{
        probeType:3
      });
      this.foodsWrapper.on('scroll',(pos) =>{
        this.scrolly =Math.abs( Math.round(pos.y));
      })
    }
    ,_caculateHeight(){
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for(let i = 0;i<foodList.length;i++){
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
    }
    ,selectMenu(index,event){
      //阻止pc端默认点击事件，只执行派发的事件
     if(!event._constructed){
       return;
     }
     let foodList = this.$refs.foodList;
     let el = foodList[index];
     this.foodsWrapper.scrollToElement(el, 300);
    }
  }
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .goods
      display: flex
      position: absolute
      top: 174px
      bottom: 46px
      width: 100%
      overflow: hidden
      .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
          display: table
          height: 54px
          width: 56px
          padding: 0 12px
          line-height: 14px
          &.current
            position: relative
            z-index: 10
            margin-top: -1px
            background: #fff
            font-weight: 700
            .text
              border-none()
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
          .text
            display: table-cell
            width: 56px
            vertical-align: middle
            border-1px(rgba(7, 17, 27, 0.1))
            font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
