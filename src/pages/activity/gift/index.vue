<template>
  <div class="gift-container">
    <div class="gift">
      <div class="user">
        <div class="user-img">
          <img :src="players.coverImg" alt />
        </div>
        <span>{{players.name}}</span>
      </div>
      <div class="statistical-table">
        <div>
          <span>{{players.i}}</span>
          <span>排名</span>
        </div>
        <div>
          <span>{{players.ticket}}}</span>
          <span>票数</span>
        </div>
        <div>
          <span>{{players.gift}}</span>
          <span>礼物</span>
        </div>
        <div>
          <span>{{players.browse}}</span>
          <span>浏览量</span>
        </div>
      </div>

      <div class="gift-list">
        <div class="title">送礼物加票数</div>
        <ul class="list">
          <li
            class="list-item"
            v-for="(item,index) in giftlist "
            :key="index"
            :class="{active:currentIndex==index}"
            @click="changeIndex(index,item.ticket,item.price)"
          >
            <div class="top">{{item.name}}</div>
            <div class="gift-img">
              <img :src="item.icon" alt />
            </div>
            <div class="num">+{{item.ticket}}票</div>
          </li>
        </ul>

        <div class="compute">
          <div class="total-price">
            <span>￥</span>
            <span class="price">{{totalprice}}</span>
            <span class="num">+{{totalnum}}</span>
            <span>票</span>
          </div>
          <div class="select-num">
            <div @click="reduce">-</div>
            <span>{{num}}</span>
            <div @click="add">+</div>
          </div>
        </div>
      </div>
    </div>

    <div class="now-send" @click="payGift">立即送出</div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      num: 1,
      price: 0.01,
      pollnum: 20,
      PlayerId: 0,
      ActivityId: 0,
      players: {},
      giftlist: [],

      currentIndex: 0
    };
  },
  computed: {
    totalprice() {
      return this.num * this.price;
    },
    totalnum() {
      return this.num * this.pollnum;
    }
  },

  onLoad(options) {
    this.PlayerId = parseInt(options.id);
    this.ActivityId = parseInt(options.activityId);

    this.getGiftlist();
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 获取礼物接口
    async getGiftlist() {
      let res = await this.$Api.getGiftList({
        activityId: 1,
        id: this.PlayerId
      });
      console.log(res);
      this.players = res.data.player;
      this.giftlist = res.data.hdGift;
    },

    //改变礼物当前索引index

    changeIndex(index, ticket, prices) {
      console.log(index);
      this.currentIndex = index;
      this.price = prices;
      this.pollnum = ticket;
    },

    add() {
      this.num++;
    },
    reduce() {
      this.num--;
      if (this.num < 1) {
        this.num = 1;
      }
    },

    // 支付
    payGift() {
      console.log(11111111);
      let that = this;
      wx.login({
        success: async function(result) {
          console.log(result);
          console.log(that.totalprice);
          let res = await that.$Api.wxPay({
            total_fee: that.totalprice * 100,
            js_code: result.code
          });
          console.log(res);
          if (res.code == 0) {
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: "MD5",
              paySign: res.data.paySign,
              success(resp) {
                console.log(resp);
              },
              fail(resp) {
                console.log(resp);
              }
            });
          }
        }
      });
    }
  },
  components: {}
};
</script>

<style lang="less" scoped >
.gift-container {
  background-color: whitesmoke;
  .gift {
    padding: 10px;
    box-sizing: border-box;
    .user {
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .user-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .statistical-table {
      display: flex;
      background-color: turquoise;
      color: white;
      font-size: 14px;
      padding: 5px 0;

      div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
      }
    }
    .gift-list {
      margin-top: 20px;
      .title {
        background-color: white;
        padding: 5px 0;
      }
      .list {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding-top: 10px;
        background-color: rgb(241, 239, 239);

        .list-item {
          width: 30%;
          margin-bottom: 10px;
          text-align: center;
          background-color: white;
          .top {
            color: rgb(142, 142, 142);
          }
          .gift-img {
            width: 100%;
            padding: 5px 0;
            img {
              width: 50px;
              height: 50px;
            }
          }

          .num {
            font-size: 12px;
            background-color: yellowgreen;
            border-bottom: 2px solid springgreen;
          }
        }

        .active {
          background-color: rgb(238, 238, 238);
          border: 1px solid yellowgreen;
        }
      }
    }

    .compute {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      margin-bottom: 40px;
      .total-price {
        width: 40%;
        font-size: 12px;
        color: rgb(184, 184, 184);
        .price {
          font-size: 14px;
          padding-right: 8px;
          font-weight: 400;
        }
      }

      .select-num {
        width: 30%;
        text-align: center;
        display: flex;
        font-size: 12px;
        color: rgb(184, 184, 184);
        div {
          width: 20px;
          height: 20px;
          line-height: 20px;
          border: 1px solid rgb(184, 184, 184);
        }
        span {
          flex: 1;
          height: 20px;
          line-height: 20px;
          border-top: 1px solid rgb(184, 184, 184);
          border-bottom: 1px solid rgb(184, 184, 184);
        }
      }
    }
  }

  .now-send {
    background-color: chartreuse;
    text-align: center;
    padding: 10px;
    position: fixed;
    width: 100%;
    bottom: 0;
    color: white;
    z-index: 10;
  }
}
</style>
