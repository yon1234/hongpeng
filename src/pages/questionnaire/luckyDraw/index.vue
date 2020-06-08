<template>
  <div class="container">
    <div class="lucky">
      <div class="title">您有一次抽奖的机会</div>

      <div class="lottery-box">
        <lottery
          ref="lottery"
          @getlotteryPosition="getlotteryPosition"
          :lotteryCount="lotteryCount"
          :prizeImages="prizeImages"
          :lotteryButtonImage="lotteryButtonImage"
          :currentContent="currentContent"
        ></lottery>
      </div>
    </div>
  </div>
</template>

<script>
import lottery from "@/components/lucky";
export default {
  props: {},
  data() {
    return {
      lotteryCount: 99, //抽奖次数
      currentContent:['爱奇艺会员1年',"谢谢参与","马尔代夫双人豪华十日游","现金500元","谢谢参与","宝马七系","谢谢参与","谢谢参与"],
      prizeImages: [
        "/static/images/eqy.jpg",
        "/static/images/xx.jpg",
        "/static/images/me.jpg",
        "/static/images/xj.jpg",
        "/static/images/xx.jpg",
        "/static/images/bm.jpg",
        "/static/images/xx.jpg",
        "/static/images/xj.jpg"
      ], //奖品列表图片
      lotteryButtonImage: "/static/images/02.jpg" //抽奖按钮图片
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    getlotteryPosition() {
      let that = this;
      //模拟网络请求时间
      setTimeout(function() {
        // 中奖位置
        let lotteryPosition =
          Math.floor(Math.random() * 5) + Math.floor(Math.random());
        that.$refs.lottery.stop(lotteryPosition);
      }, 1000);
    }
  },
  components: {
    lottery
  }
};
</script>

<style  lang="less" scoped >
.container {
 background-color: rgb(158, 245, 153);
 height: 750px;
  .lucky {
    padding: 10px;
    box-sizing: border-box;
   
    .title {
      text-align: center;
      margin: 20px;
      color: red;
    }
    .lottery-box {
      padding: 5px;
      box-sizing: border-box;
      border: 3px solid orange;
      border-radius: 10px;
    }
  }
}
</style>
