<template>
  <div>
    <div class="swiper-box">
      <Swiper :images="images" />
    </div>
    <div class="content-box">
      <div class="statistical-table">
        <div>
          <span>60</span>
          <span>已报名</span>
        </div>
        <div>
          <span>1553</span>
          <span>总投票</span>
        </div>
        <div>
          <span>7008</span>
          <span>浏览量</span>
        </div>
      </div>
      <div class="apply-name">
        <button @click="myApply">我要报名</button>
      </div>
      <div class="count-down">
        <span>距离活动结束:{{remianTimes}}</span>
      </div>

      <div class="search-box">
        <input type="text" />
        <button>搜索</button>
      </div>

      <div class="list-box">
        <div class="tab-nav">
          <Picker :array="array"></Picker>
        </div>
        <div class="list-data">
          <ul>
            <li @click="goActiveDetail">
              <img src="/static/images/user.png" alt />
              <div class="botton">
                <span class="name">罗毅</span>
                <span class="num">33票</span>
                <div class="vote" @click="sendGift">投票</div>
              </div>
            </li>

            <li>
              <img src="/static/images/user.png" alt />
              <div class="botton">
                <span class="name">罗毅</span>
                <span class="num">33票</span>
                <div class="vote" @click="sendGift">投票</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="left-nav">
      <ul>
        <li>列表</li>
        <li>关注</li>
        <li>客服</li>
      </ul>
    </div>
    <div class="background-audio">
      <div class="audio" @click="playAudio">
        <div class="play-img" v-if="audioContr">
          <img class="Rotation" :src="playImg" alt />
        </div>
        <div class="stop-img" v-else>
          <div class="stop"></div>
        </div>
      </div>
    </div>

    <div class="snow-box">
      <canvas canvas-id="snow" class="snow"></canvas>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/swiper";
import Picker from "@/components/picker";
export default {
  props: {},
  data() {
    return {
      day: "2020-05-31 00:00",
      remianTimes: "",
      time:'',
      audioContr: true,
      innerAudioContext: null, // 音频对象
      playImg: "/static/images/yl.jpg",

      images: [
        {
          url:
            "https://img-oss.yunshanmeicai.com/goods/default/31d8dfa4-0d7b-4694-80f9-41b07c9d0a3a.png"
        },
        {
          url:
            "https://img-oss.yunshanmeicai.com/goods/default/e83c8f0f-4acc-4729-bcbb-294f2b314977.jpg"
        }
      ],
      array: [
        "全部分组",
        "北大青鸟鲁广校区",
        "北大青鸟光谷校区",
        "北大青鸟光谷学院",
        "课工场华中直营总校",
        "课工场光谷校区",
        "课工场郑州兰德校区",
        "北大青鸟徐东校区"
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    audioContr(val, oldVal) {
      this.innerAudioContext.offCanplay();
      if (val) {
        this.innerAudioContext.play();
      } else {
        this.innerAudioContext.pause();
      }
    }
  },
  onShow() {
    // 倒计时
    this.getRemianTimes(this.day);
     //展示雪花    
    this.$snow.play();
    // 放在created 一进入就会播放?
     this.creatAudio();
  },
  onHide() {
    clearInterval(this.time)
    this.innerAudioContext.destroy();
  },
  methods: {
    //倒计时
    getRemianTimes(day) {
  this.time= setInterval(() => {
        this.remianTimes = this.$index.remianTime(day);
      }, 1000);
    },
    //跳转送礼物页面
    sendGift() {
      wx.navigateTo({
        url: "../gift/main"
      });
    },
    //跳转报名页面
    myApply() {
      wx.navigateTo({
        url: "../apply/main"
      });
    },
    //跳转选手详情页面
    goActiveDetail() {
      wx.navigateTo({
        url: "../activeDetail/main"
      });
    },
    // 背景音乐控制
    playAudio() {
      this.audioContr = !this.audioContr;
    },
    //创建一个音频
    creatAudio() {
      // 创建音频播放对象
      this.innerAudioContext = wx.createInnerAudioContext();
      // 设置音频播放来源
      this.innerAudioContext.src = "/static/audio/3147640053.mp3";
      // 音频进入可以播放状态
      this.innerAudioContext.play();
      // 音频自然播放结束事件
      this.innerAudioContext.onEnded(res => {
        // 当音频播放结束后，重新播放
        this.innerAudioContext.play();
      });
    }
  },

  components: {
    Swiper,
    Picker
  },

  destroyed() {
    
  }
};
</script>

<style lang="less" scoped >
.content-box {
  padding: 20px 10px 0 10px;
  box-sizing: border-box;
  background-color: rgb(236, 241, 241);
  .statistical-table {
    display: flex;
    background-color: turquoise;
    color: white;
    font-size: 14px;

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px;
    }
  }

  .apply-name {
    padding: 20px 0 15px 0;

    button {
      font-size: 14px;
      width: 80%;
      color: white;
      background-color: turquoise;
      border-radius: 6px;
      border: 0;
    }
  }
  .count-down {
    background-color: rgb(228, 250, 247);
    text-align: center;
    padding: 5px;
    color: rgb(74, 76, 76);
    margin-bottom: 20px;
    color: rgb(41, 214, 233);
  }

  .search-box {
    display: flex;
    margin-bottom: 10px;
    input {
      flex: 1;
      background-color: white;
      height: 30px;
    }
    button {
      width: 100px;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      border-radius: 0;
      border: 0;
      color: white;
      background-color: turquoise;
    }
  }
  .list-box {
    .tab-nav {
      width: 50%;
      background-color: turquoise;
      color: white;
      text-align: center;
      padding: 5px 0;
      margin-bottom: 10px;
    }
    .list-data {
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 49%;
          display: flex;
          flex-direction: column;
          background-color: white;
          img {
            width: 100%;
            height: 150px;
          }

          .botton {
            display: flex;
            flex-direction: column;
            padding: 10px;
            box-sizing: border-box;

            span {
              font-size: 12px;
            }

            .name {
              padding: 5px 0;
            }
            .num {
              color: turquoise;
              margin-bottom: 10px;
            }
            .vote {
              width: 100%;
              font-size: 14px;
              background-color: turquoise;
              height: 26px;
              text-align: center;
              line-height: 26px;
            }
          }
        }
      }
    }
  }
}

.left-nav {
  position: fixed;
  left: 0;
  bottom: 5px;
  ul {
    display: flex;
    flex-direction: column;
    li {
      width: 30px;
      height: 30px;
      border: 1px solid turquoise;
      background-color: rgb(213, 251, 248);
      margin-bottom: 2px;
      font-size: 12px;
      text-align: center;
      line-height: 30px;
    }
  }
}

.background-audio {
  position: fixed;
  right: 10px;
  top: 50px;
  .audio {
    .play-img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }

      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .Rotation {
        transform: rotate(360deg);
        animation: rotation 8s linear infinite;
      }
    }

    .stop-img {
      height: 38px;
      width: 38px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid rgb(203, 200, 200);
      display: flex;
      justify-content: center;
      align-items: center;

      @keyframes stop {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .stop {
        transform: rotate(360deg);
        animation: stop 8s linear infinite;
        width: 16px;
        height: 16px;
        background-color: rgb(203, 200, 200);
      }
    }
  }
}
.snow-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  .snow {
    width: 100%;
    height: 100%;
  }
}
</style>
