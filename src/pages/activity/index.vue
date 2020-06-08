<template>
  <div>
    <div class="swiper-box">
      <Swiper :images="images" />
    </div>

    <div class="hot-activ">
      <dl class="activ-list">
        <dt>热门活动</dt>
        <dd>
          <div @click="goHotactiv" v-for='(item,index) in activeid' :key='index'>
            <span class="index">{{item.id}}</span>
            <p class="title">{{item.name}}</p>
            <span class="num">{{item.browse}}</span>
            <span class="hot-icon iconfont icon-huo"></span>
          </div>
        </dd>
      </dl>
    </div>

    <div class="back-home" @click="gohome">
      <span>首页</span>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/swiper";
export default {
  props: {},
  data() {
    return {
     activeid:[],
      images: [
        {
          url:
            "https://img-oss.yunshanmeicai.com/goods/default/31d8dfa4-0d7b-4694-80f9-41b07c9d0a3a.png"
        },
        {
          url:
            "https://img-oss.yunshanmeicai.com/goods/default/e83c8f0f-4acc-4729-bcbb-294f2b314977.jpg"
        }
      ]
    };
  },
  computed: {},
  created() {},
  onLoad() {
   
    this.getActive()
  },
  mounted() {},
  watch: {},
  methods: {
    getActive() {
      this.$Api.getActivityList()
        .then(res => {
           this.activeid=res.data
          console.log(res);
        });
    },

    goHotactiv() {
      wx.reLaunch({
        url: "./hotactiv/main"
      });
    },
    gohome() {
      wx.reLaunch({
        url: "../home/main"
      });
    }
  },
  components: {
    Swiper
  }
};
</script>

<style lang="less" scoped >
.hot-activ {
  margin-top: 10px;
  padding-left: 10px;
  .activ-list {
    dt {
      border-bottom: 1px solid rgb(235, 230, 230);
      padding: 5px 0;
    }
    dd {
      border-bottom: 1px solid rgb(235, 230, 230);
      div {
        display: flex;
        padding: 10px 0;
        .index {
          color: red;
          padding-right: 20px;
        }
        .title {
          width: 150px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .num {
          flex: 1;
          padding: 0 10px;
          color: rgb(221, 221, 226);
        }
        .hot-icon {
          padding-right: 20px;
        }
        .icon-huo {
          color: tomato;
        }
      }
    }
  }
}

.back-home {
  border-radius: 50%;
  width: 25px;
  height: 25px;
  border: 1px solid rgb(72, 204, 233);
  text-align: center;
  line-height: 25px;
  padding: 5px;
  font-size: 12px;
  position: fixed;
  right: 0;
  bottom: 30px;
  color: rgb(143, 143, 231);
  background-color: rgb(223, 249, 253);
}
</style>
