<template>
  <div class="gift-container">
    <div class="gift">
      <div class="user">
        <div class="user-img">
          <img src="/static/images/01.jpg" alt />
        </div>
        <span>罗艺</span>
      </div>
      <div class="statistical-table">
        <div>
          <span>60</span>
          <span>排名</span>
        </div>
        <div>
          <span>1553</span>
          <span>票数</span>
        </div>
        <div>
          <span>0</span>
          <span>礼物</span>
        </div>
        <div>
          <span>7008</span>
          <span>浏览量</span>
        </div>
      </div>

      <div class="gift-list">
        <div class="title">送礼物加票数</div>
        <ul class="list">
          <li class="list-item" @click="check">
            <div class="top">666</div>
            <div class="gift-img">
              <img src="/static/images/timg.gif" alt />
            </div>
            <div class="num">+20票</div>
          </li>

          <li class="list-item">
            <div class="top">666</div>
            <div class="gift-img">
              <img src="/static/images/timg.gif" alt />
            </div>
            <div class="num">+20票</div>
          </li>

          <li class="list-item">
            <div class="top">666</div>
            <div class="gift-img">
              <img src="/static/images/timg.gif" alt />
            </div>
            <div class="num">+20票</div>
          </li>

          <li class="list-item">
            <div class="top">666</div>
            <div class="gift-img">
              <img src="/static/images/timg.gif" alt />
            </div>
            <div class="num">+20票</div>
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

    <div class="now-send">立即送出</div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
       

      num: 1,
      price:6,
      pollnum:20
    };
  },
  computed: {
        totalprice(){
          return this.num*this.price
      },
      totalnum(){
            return this.num*this.pollnum
      }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {


    add() {
      this.num++;
    },
    reduce() {
      this.num--;
      if(this.num<1){
          this.num=1
      }
    }
  },
  components: {

    
  }
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
      }
    }

    .compute {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      .total-price {
        width: 30%;
        font-size: 14px;
        color: rgb(184, 184, 184);
        .price {
          font-size: 18px;
          padding-right: 8px;
          font-weight: 100;
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
  }
}
</style>
