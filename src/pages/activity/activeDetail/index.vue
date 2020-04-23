<template>
  <div class="activeDetail">
    <view class="page-section-spacing">
      <scroll-view
        scroll-y="true"
        style="height: 1600rpx;"
        bindscrolltoupper="upper"
        bindscrolltolower="lower"
        @scroll="scroll"
        class="scroll-area"
      >
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
        <div class="presentation">
          <div class="title">选手描述</div>

          <div class="detail">选手描述什么也没有留下</div>
        </div>

        <div class="user-img-big">
          <div class="title">选手照片</div>

          <div class="img-big">
            <img src="/static/images/01.jpg" alt />
          </div>
        </div>

        <div class="top-list">
          <div class="title">票数贡献榜</div>
          <div class="top-list-area">
            <scroll-view
              scroll-y="true"
              bindscrolltoupper="upper"
              bindscrolltolower="lower"
              @scroll="scroll"
              class="scroll-view"
            >
              <ul class="list">
                <li>
                  <div class="user-img">
                    <div>
                      <img src="/static/images/01.jpg" alt />
                    </div>
                  </div>
                  <div class="name">angel</div>
                  <div class="num">20票</div>
                </li>
                <li>
                  <div class="user-img">
                    <div>
                      <img src="/static/images/01.jpg" alt />
                    </div>
                  </div>
                  <div class="name">angel</div>
                  <div class="num">20票</div>
                </li>
                <li>
                  <div class="user-img">
                    <div>
                      <img src="/static/images/01.jpg" alt />
                    </div>
                  </div>
                  <div class="name">angel</div>
                  <div class="num">20票</div>
                </li>
                <li>
                  <div class="user-img">
                    <div>
                      <img src="/static/images/01.jpg" alt />
                    </div>
                  </div>
                  <div class="name">angel</div>
                  <div class="num">20票</div>
                </li>
                <li>
                  <div class="user-img">
                    <div>
                      <img src="/static/images/01.jpg" alt />
                    </div>
                  </div>
                  <div class="name">angel</div>
                  <div class="num">20票</div>
                </li>
                <li>
                  <div class="user-img">
                    <div>
                      <img src="/static/images/01.jpg" alt />
                    </div>
                  </div>
                  <div class="name">angel</div>
                  <div class="num">20票</div>
                </li>
                <li>
                  <div class="user-img">
                    <div>
                      <img src="/static/images/01.jpg" alt />
                    </div>
                  </div>
                  <div class="name">angel</div>
                  <div class="num">20票</div>
                </li>
              </ul>
            </scroll-view>
          </div>
        </div>

        <div class="poll">
          <div class="title">投票记录</div>

          <ul class="poll-list">
            <li class="list">
              <div class="name-time">
                <div class="name">彦希</div>
                <div class="time">2020-4-2113 13:46:51</div>
              </div>
              <div class="num">+1</div>
            </li>
          </ul>

          <div class="load-more">查看更多</div>
        </div>
      </scroll-view>
    </view>

    <div class="foot-nav">
      <div>
        <span class="iconfont icon-index"></span>
        <span>首页</span>
      </div>
      <div class="pull-btn">
        <span class="title">投票</span>
        <span class="center iconfont icon-toupiao1"></span>
      </div>
      <div @click="sendGift">
        <span class="iconfont icon-songliwu"></span>
        <span>送礼</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    scroll(e) {
      console.log(e);
    },
    // 送礼物
    sendGift() {
      wx.navigateTo({
        url: "../gift/main"
      });
    }
  },
  components: {}
};
</script>

<style lang="less" scoped >
.page-section-spacing {
  margin-bottom: 80px;
}

.scroll-area {
  padding: 10px;
  box-sizing: border-box;
  background-color: rgb(248, 244, 244);
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

  .presentation {
    margin-top: 20px;

    background-color: white;
    .title {
      border-bottom: 1px solid rgb(206, 204, 204);
      text-align: center;
      padding: 5px 0;
    }
    .detail {
      height: 50px;
      padding: 5px;
      font-size: 12px;
    }
  }

  .user-img-big {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    background-color: white;

    .title {
      border-bottom: 1px solid rgb(206, 204, 204);
      text-align: center;
      padding: 5px 0;
    }

    .img-big {
      padding: 5px;

      img {
        width: 100%;
        height: 400px;
      }
    }
  }
  .top-list {
    .title {
      background-color: yellowgreen;
      padding: 5px;
      text-align: center;
    }
    .top-list-area {
      .scroll-view {
        height: 300px;
        background-color: rgb(233, 228, 220);

        .list {
          padding: 10px;

          li {
            border-bottom: 1px solid rgb(216, 212, 212);
            display: flex;
            align-items: center;
            padding: 5px 0;
            .user-img {
              flex: 1;
              div {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .name {
              flex: 2;
            }
            .num {
              flex: 1;
              color: chartreuse;
            }
          }
        }
      }
    }
  }

  .poll {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    background-color: white;
    .title {
      width: 100%;
      padding: 5px;
      text-align: center;
      font-size: 12px;
      border-bottom: 1px solid rgb(230, 229, 228);
    }
    .poll-list {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;

      .list {
        display: flex;
        border-bottom: 1px solid rgb(230, 229, 228);
        padding: 5px 0;
        align-items: center;
        font-size: 12px;
        .name-time {
          display: flex;
          flex-direction: column;
          flex: 3;
          padding-left: 10px;

          .name {
            padding: 5px;
          }
        }
        .num {
          flex: 1;
          text-align: center;
          color: cyan;
        }
      }
    }

    .load-more {
      width: 80%;
      text-align: center;
      padding: 5px 0;
      background-color: turquoise;
    }
  }
}

.foot-nav {
  display: flex;
  background-color: yellowgreen;
  height: 40px;
  text-align: center;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;

  div {
    flex: 1;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon-index {
      font-size: 40px;
      color: turquoise;
    }
    .icon-toupiao1 {
      color: springgreen;
      font-size: 30px;
    }

    .icon-songliwu {
      color: red;
      font-size: 26px;
    }
  }
  .pull-btn {
    border-left: 1px solid white;
    border-right: 1px solid white;
    position: relative;
    .center {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -100%);
    }
    .title {
      height: 30px;
      position: absolute;
      bottom: 3px;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
</style>
