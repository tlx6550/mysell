<template>
   <div class="shopcart">
     <div class="content">
       <div class="content-left">
         <div class="logo-wrapper">
           <div class="logo" :class="{'highlight':totalCount>0}">
             <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
           </div>
           <div class="num" v-show="totalCount>0">{{totalCount}}</div>
         </div>
         <div class="price" :class="{'highlight':totalPrice>0}">{{totalPrice}}元</div>
         <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
       </div>
       <div class="content-right">
         <div class="pay" :class="payClass">
           {{payDesc}}
         </div>
       </div>
     </div>
     <div class="ball-container">
       <ul>
         <li v-for="(ball,index) in balls" :key="index">
           <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
             <div class="ball" v-show="ball.show" :css="false">
               <div class="inner inner-hook"></div>
             </div>
           </transition>
         </li>
       </ul>
     </div>
   </div>
</template>

<script type="text/ecmascript-6">
  //在props里如果传入的类型为数组或者object，那么默认类型是函数
export default {
  props:{
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 3
          }
        ];
      }
    }
    ,deliveryPrice:{
      type:Number
      ,default:0
    }
    ,minPrice:{
      type:Number
      ,default:0
    }
  }
  ,data(){
    return{
      balls:[
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        }
      ]
      ,dropBalls:[]
    }
  }
  ,methods:{
    drop(el) {
      // 拿到第一个还未开始动画的小球令其开始进行下落动画
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          let divObject = el;
          ball.divObject = divObject;
          this.dropBalls.push(ball);
          return;
        }
      }
    }
    ,beforeDrop(el) {
      //这里el(类为ball的div)默认就是绑定该函数钩子的元素，区别于drop方法里面的el(为触发‘加’事件按钮元素)
      // 要把所有设置为true的小球都找出来做动画，因为可能用户会连续点击
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          //rect拿到点击按钮的位置信息,ball.divObject为触发‘加’事件按钮元素
          let rect = ball.divObject.getBoundingClientRect();
          // 减去小球本身已经已经定义的css偏移量
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          // 外层元素完成纵向动画，内层元素完成横向动画
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.querySelector('.inner-hook');
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    }
    ,dropping(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.querySelector('.inner-hook');
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', () => {
          done();
        });
      });
    }
    ,afterDrop(el) {
      // 每完成一个小球的动画就把这个小球的状态重置
      //shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
      let ball = this.dropBalls.shift();
      if (ball) {
        el.style.display = 'none';
        ball.show = false;
      }
    }
  }
  ,computed:{
    totalPrice(){
      let total = 0;
      this.selectFoods.forEach((food)=>{
        total += food.price * food.count;
      })
      return total;
    }
    ,totalCount(){
    let count = 0;
    this.selectFoods.forEach((food)=>{
      count += food.count ;
    })
    return count;
  }
  ,payDesc(){
      if (this.totalPrice ===0 ){
        return `￥${this.minPrice}元起送`;
      }else if(this.totalPrice < this.minPrice){
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      }else {
        return '去结算'
      }
    }
  ,payClass(){
      if(this.totalPrice < this.minPrice){
        return "not-enough";
       }else{
        return "enough";
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: absolute
        left: 32px
        bottom: 22px
        z-index: -1
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
</style>
