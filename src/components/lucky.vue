<template>
  <div class="container" :style="{width:width,height:height}">
    <!-- 背景图 -->
    <image :src="backgroundImageUrl" model="aspectFill" class="background_image" v-if="backgroundImageUrl"></image>
    <!-- 九宫格 -->
    <div class='sudoku'>
        <div class="square" :style="{opacity:activatedColorIndex==0?'1': ( startGame ? '0.5' : '1' ),width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
          <image :src="prizeImages[0]" model="aspcetFit"></image>       
        </div>
        <div class="square" :style="{opacity:activatedColorIndex==1?'1': ( startGame ? '0.5' : '1' ),width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
          <image :src="prizeImages[1]" model="aspcetFit"></image>
        </div>
        <div class="square" :style="{opacity:activatedColorIndex==2?'1': ( startGame ? '0.5' : '1' ),width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
          <image :src="prizeImages[2]" model="aspcetFit"></image>
        </div>
        <div class="square" :style="{opacity:activatedColorIndex==7?'1': ( startGame ? '0.5' : '1' ),width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
          <image :src="prizeImages[7]" model="aspcetFit"></image>
        </div>
        <div class="square" @click="clickLuck" :style="{width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
          <image :src='lotteryButtonImage' model="aspcetFit"></image>
        </div>
        <div class="square" :style="{opacity:activatedColorIndex==3?'1': ( startGame ? '0.5' : '1' ),width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
          <image :src="prizeImages[3]" model="aspcetFit"></image>
        </div>
        <div class="square marginBottomNo" :style="{opacity:activatedColorIndex==6?'1': ( startGame ? '0.5' : '1' ),width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
          <image :src="prizeImages[6]" model="aspcetFit"></image>
        </div>
        <div class="square marginBottomNo" :style="{opacity:activatedColorIndex==5?'1': ( startGame ? '0.5' : '1' ),width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
          <image :src="prizeImages[5]" model="aspcetFit"></image>
        </div>
        <div class="square marginBottomNo" :style="{opacity:activatedColorIndex==4?'1': ( startGame ? '0.5' : '1' ),width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
          <image :src="prizeImages[4]" model="aspcetFit"></image>
        </div>
    </div>
  </div>
</template>
<script>
/*
 * @Author: wujiayi
 * @Date: 2019-08-19
 * @Last Modified by: wujiayi
 * @Last Modified time: 2019-08-19
 */

//定时器
let interval = null;
let timer = null;
//九宫格旋转速度，值越大速度越慢
let rotationalSpeed = 30;

export default {
    props:{
        width:{ //九宫格容器宽度
            type:String,
            default:'100%',
        },
        height:{ //九宫格容器高度
            type:String,
            default:'100%',
        },
        backgroundImageUrl:{ //九宫格容器背景图片
            type:String,
            default:'',
        },
        squareWidth:{ //九宫格格子宽度
            type:String,
            default:'31.28%',
        },
        squareHeight:{ //九宫格格子高度
            type:String,
            default:'200rpx',
        },
        squareMarginLeft:{ //九宫格格子左边距
            type:String,
            default:'3.08%',
        },
        squareMarginBottom:{ //九宫格格子下边距
            type:String,
            default:'20rpx',
        },
        bgColor:{ //九宫格格子背景颜色
            type:String,
            default:'none',
        },
        prizeImages:{ //奖品列表图片
            type:Array
        },
        lotteryButtonImage:{ //抽奖按钮图片
            type:String,
        },
        lotteryCount:{ //抽奖次数
            type:Number,
            default:0,
        },
         currentContent:{ //抽奖次数
            type:Array,
           
        },
    },

  data() {
    return {
      activatedColorIndex: -1, //当前位置选中状态
      btnDisabled:false,//抽奖按钮是否可以点击
      startGame:false,//是否正在抽奖
    };
  },
  methods: {
    //点击抽奖按钮
    clickLuck() {
      let that = this;
      //判断是否可以点击抽奖按钮
      if (that.lotteryCount<=0) {
          mpvue.showToast({
              title:'抽奖次数为0，不可抽奖！',
              icon:'none'
          })
          return
      }
      if (this.btnDisabled) {
          return
      }

      this.btnDisabled = !this.btnDisabled;
      this.startGame = true;
      that.lotteryCount--;
      interval && clearInterval(interval);
      // 九宫格旋转(设置当前位置选中状态)
      let index = 0;
      interval = setInterval(function() {
        if (index > 7) {
          index = 0;
        }
        that.activatedColorIndex = index;
        index++;
      }, rotationalSpeed);
      that.$emit('getlotteryPosition')
    },

    // 九宫格旋转减速
    stop(lotteryPosition) {
      let that = this;
      interval && clearInterval(interval);
      let currentIndex = that.activatedColorIndex + 1;
      that.stopLuck(lotteryPosition, currentIndex, rotationalSpeed, 30);
    },

    /**
     * lotteryPosition:中奖位置
     * currentIndex:当前选中位置
     * speed：九宫格旋转速度
     * stepTime：每次增加的旋转时间 值越大旋转速度越慢
     */
    stopLuck(lotteryPosition, currentIndex, speed, stepTime) {
      let that = this;
      timer && clearTimeout(timer);
      timer = setTimeout(()=> {

        if (currentIndex > 7) {
          currentIndex = 0;
        } 

        //当前位置为选中状态
        that.activatedColorIndex = currentIndex;

        //如果旋转时间过短或者当前位置不等于中奖位置则递归执行直到旋转至中奖位置
        if (speed < 300 || currentIndex != lotteryPosition) {
          //旋转速度越来越慢
          stepTime++;
          speed += stepTime;
          //当前位置+1
          currentIndex++;
          that.stopLuck(lotteryPosition, currentIndex, speed, stepTime);
        } else {
            //抽奖结束
            //假设中奖
            setTimeout(()=>{
              mpvue.showModal({
                title: '恭喜中奖',
                content:that.currentContent[currentIndex] ,
                showCancel: false,
                success: function(res) {
                  if (res.confirm) {
                      that.activatedColorIndex = -1;
                      that.btnDisabled = !that.btnDisabled;
                      that.startGame = false;   
                  }
                }
              })
            },500)
          }
      }, speed);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  margin: auto;
  > .background_image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  > .sudoku {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    > .square {
      border-radius: 20rpx;
      box-shadow: 0 0 6rpx #e6e6e6;
      &:nth-of-type(3n-2) {
        margin-left: 0 !important;
      }
      > image {
        width: 100%;
        height: 100%;
      }
    }
    > .marginBottomNo {
      margin-bottom: 0 !important;
    }
  }
}
</style>
