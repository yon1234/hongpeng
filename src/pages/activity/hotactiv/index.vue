<template>
  <div>
    <div class="swiper-box">
      <Swiper :images="images" />
    </div>
    <div class="content-box">
      <div class="statistical-table">
        <div>
          <span>{{totalRoll}}</span>
          <span>已报名</span>
        </div>
        <div>
          <span>{{totalVote}}</span>
          <span>总投票</span>
        </div>
        <div>
          <span>{{totalBrowse}}</span>
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
        <input type="text" v-model.trim="name" />
        <button @click="getactivityPlayer">搜索</button>
      </div>

      <div class="list-box">
        <div class="tab-nav">
          <Picker :array="array" :selectionIndex="selectionIndex" @passToIndex="getSeletion"></Picker>
        </div>
        <div class="list-data">
          <ul>
            <!--动态渲染数据 -->
            <li v-for="(item,index) in showDatalist" :key="index" @click="goActiveDetail(item.id,item.activityId)">
              <img :src="item.coverImg" alt />
              <div class="botton">
                <span class="name">{{item.name}}</span>
                <span class="num">{{item.ticket}}票</span>
                <div class="vote">投票</div>
              </div>
            </li>
          </ul>
          <div class="footer">已经到底部了</div>
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
      totalRoll: null,
      totalVote: null,
      totalBrowse: null,
      allDatalist: [],
      showDatalist: [],
      selectionIndex: 0,
      currrentGroupName: "全部分组",
      pages: 10,
      name: "",
      day: "",
      remianTimes: "",
      time: "",
      audioContr: true,
      innerAudioContext: null, // 音频对象
      playImg: "/static/images/yl.jpg",
      listDtat: [],
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
        "课工场徐东校区"
      ],
    
    };
  },
  computed: {},
  created() {},
  mounted() {
    //  this.showData()
  },
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
  onLoad() {
    this.getALLactivityPlayer();
    this.getHot();
  },
  onReady() {
    
     
  },

  onShow() {
    // 倒计时
   this.getRemianTimes();
    // 一进入就会播放背景音乐
    this.creatAudio();
  },
  onHide() {
    clearInterval(this.time);
    this.innerAudioContext.destroy();
  },
  onPullDownRefresh() {
    // 上拉刷新
    this.currrentGroupName = "全部分组";
    this.pages = 10;
    this.showDatalist = [];
    this.selectionIndex = 0;
    this.getALLactivityPlayer();
    this.showData();
  },

  onReachBottom() {
    if (this.pages >= this.allDatalist.length) {
      wx.showToast({
        title: "没有更多的数据",
        icon: "success",
        duration: 2000
      });
    } else {
      this.pages += 10;
      this.showData();
      console.log(this.showDatalist);
    }
  },
  methods: {
    // 获取报名量 浏览量
    async getHot() {
      let res = await this.$Api.getActivityList();
      console.log(res);
      this.totalRoll = res.data[0].enroll;
      this.totalVote = res.data[0].sumVote;
      this.totalBrowse = res.data[0].browse;
      this.day= res.data[0].end;
      console.log(this.day);
      
    },
    //获取所有的数据
    async getALLactivityPlayer() {
      let res = await this.$Api.getActivityPlayer({
        activityId: 1
      });
      this.allDatalist = res.rows;
      console.log(res);

      console.log(this.allDatalist);
      this.showDatalist = this.allDatalist.slice(0, this.pages);
    },

    //获取搜索的数据
    async getactivityPlayer() {
      console.log(this.name);
      if (this.name) {
        let res = await this.$Api.getActivityPlayer({
          activityId: 1,
          name: this.name
        });
        console.log(res);
        this.allDatalist = res.rows;
        this.name = "";
        console.log(this.allDatalist);

        this.showData();
      }
    },
    // 展示当前的数据，
    showData() {
      if (this.currrentGroupName === "全部分组") {
        this.showDatalist = this.allDatalist.slice(0, this.pages);
        console.log(this.showDatalist);
      } else {
        let res = this.allDatalist.filter(v => {
          return v.groupName === this.currrentGroupName;
        });
        this.showDatalist = res.slice(0, this.pages);
        console.log(this.pages);
        console.log(this.showDatalist);
      }
    },

    // picker 分组数据
    getSeletion(e) {
      this.selectionIndex = e;
      this.currrentGroupName = this.array[e];
      this.pages = 10;
      this.showData();
      console.log("aaaaaaa");
    },

    //倒计时
    getRemianTimes() {
      this.time = setInterval(() => {
        this.remianTimes = this.$index.remianTime(this.day);
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
    goActiveDetail(PlayerId,ActivityId) {
      wx.navigateTo({
        url: '../activeDetail/main?id='+PlayerId+'&activityId='+ActivityId
      },);
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

  destroyed() {}
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

          .footer {
            text-align: center;
            height: 50px;
            line-height: 50px;
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
