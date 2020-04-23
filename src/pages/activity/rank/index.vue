<template>
  <div class="rank-container">
    <header>
      <div class="end-time">
        2010-05-31 00:00:00
        <span>结束</span>
      </div>
      <div class="remain-time">剩余{{remianTimes}}</div>
    </header>

    <div class="rank">
      <div class="title">票数排行榜</div>
      <div class="top-three">
        <div class="second">
          <div class="rank-num">N0.2</div>
          <div class="user-img">
            <img src="/static/images/01.jpg" alt />
          </div>
          <div class="name">高自立</div>
          <div class="num">245票</div>
        </div>
        <div class="one">
          <div class="rank-num"><img src="/static/images/huangguan.png" alt=""></div>
          <div class="user-img">
            <img src="/static/images/01.jpg" alt />
          </div>
          <div class="name">高自立</div>
          <div class="num">245票</div>
        </div>
        <div class="three">
          <div class="rank-num">N0.2</div>
          <div class="user-img">
            <img src="/static/images/01.jpg" alt />
          </div>
          <div class="name">高自立</div>
          <div class="num">245票</div>
        </div>
      </div>

      <div class="rank-list">
        <ul class="rank-under-four">
          <li class="list-item">
            <div class="left">
              <div class="user-img">
                <img src="/static/images/01.jpg" alt />
              </div>
              <div class="name-num">
                <span class="name">9205吴明军</span>
                <span class="num">143票</span>
              </div>
            </div>
            <div class="right">4</div>
          </li>

          <li class="list-item">
            <div class="left">
              <div class="user-img">
                <img src="/static/images/01.jpg" alt />
              </div>
              <div class="name-num">
                <span class="name">9205吴明军</span>
                <span class="num">143票</span>
              </div>
            </div>
            <div class="right">4</div>
          </li>

          <li class="list-item">
            <div class="left">
              <div class="user-img">
                <img src="/static/images/01.jpg" alt />
              </div>
              <div class="name-num">
                <span class="name">9205吴明军</span>
                <span class="num">143票</span>
              </div>
            </div>
            <div class="right">4</div>
          </li>

          <li class="list-item">
            <div class="left">
              <div class="user-img">
                <img src="/static/images/01.jpg" alt />
              </div>
              <div class="name-num">
                <span class="name">9205吴明军</span>
                <span class="num">143票</span>
              </div>
            </div>
            <div class="right">4</div>
          </li>

          <li class="list-item">
            <div class="left">
              <div class="user-img">
                <img src="/static/images/01.jpg" alt />
              </div>
              <div class="name-num">
                <span class="name">9205吴明军</span>
                <span class="num">143票</span>
              </div>
            </div>
            <div class="right">4</div>
          </li>

          <li class="list-item">
            <div class="left">
              <div class="user-img">
                <img src="/static/images/01.jpg" alt />
              </div>
              <div class="name-num">
                <span class="name">9205吴明军</span>
                <span class="num">143票</span>
              </div>
            </div>
            <div class="right">4</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      remianTimes: "",
      time:'',
      day: "2020-05-31 00:00"
    };
  },
  computed: {},
  created() {
  
  },


  onShow(){
     this.getRemianTimes(this.day);
  },
  onHide(){
    clearInterval(this.time)
  },
  mounted() {},
  watch: {},
  methods: {
    getRemianTimes(day) {

   this.time= setInterval(() => {
        this.remianTimes = this.$index.remianTime(day);
      }, 1000);
    }
  },
  components: {}
};
</script>

<style lang="less" scoped >
.rank-container {
  background-color: whitesmoke;
  padding: 10px;
  box-sizing: border-box;

  header {
    text-align: center;
    font-size: 14px;
    padding: 14px 0;
    .end-time {
      margin-bottom: 5px;
    }
  }
  .rank {
    .title {
      background-color: turquoise;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: white;
    }
    .top-three {
      display: flex;
      padding: 20px 0;
      background-color: white;
      font-size: 12px;
      .second {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .rank-num {
          color: orange;
          padding: 10px 0 6px 0;
        }
        .user-img {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .name {
          padding: 10px 0 5px 0;
        }
        .num {
          color: turquoise;
          font-weight: 400;
        }
      }
      .one {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        .rank-num {
          color: orange;
          display: flex;
         justify-content: center;
         align-items: center;
         img{
           padding-left: 8px;
          width: 70px;
          height: 20px;
         }
        }
        .user-img {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          padding: 6px;
        }
        .num {
          color: turquoise;
          font-weight: 600;
        }
      }
      .three {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;

        .rank-num {
          padding: 10px 0 6px 0;
          color: orange;
        }
        .user-img {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .name {
          padding: 10px 0 5px 0;
        }
        .num {
          color: turquoise;
          font-weight: 400;
        }
      }
    }

    .rank-list {
      padding: 10px;
      box-sizing: border-box;
      background-color: white;
      .rank-under-four {
        border-top: 1px solid rgb(235, 235, 235);

        .list-item {
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgb(235, 235, 235);

          .left {
            padding-left: 15px;
            display: flex;
            align-items: center;
            font-size: 12px;
            .user-img {
              height: 36px;
              width: 36px;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .name-num {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              padding-left: 10px;
            }
          }
          .right {
            flex: 1;
            padding-right: 20px;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
