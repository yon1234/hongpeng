<template>
  <div class="container">
    <div class="swiper-box">
      <Swiper :images="images" />
    </div>

    <div class="nav-box">
      <ul class="nav-list">
        <li>
          <div @click="goAactivity">
            <img :src='imgurl' alt />
            <span>活动</span>
          </div>
        </li>

        <li>
          <div @click="goQuestionnaire">
            <img src="/static/images/02.jpg" alt />
            <span>问卷</span>
          </div>
        </li>
        <li>
          <div>
            <img src="/static/images/3.jpg" alt />
            <span>夏令营</span>
          </div>
        </li>

        <li>
          <div>
            <img src="/static/images/04.jpg" alt />
            <span>课程</span>
          </div>
        </li>
      </ul>
    </div>
   

  </div>
</template>

<script>
import Swiper from "@/components/swiper";

export default {
  props: {},
  data() {
    return {
      imgurl:'',
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
     
    };
  },
  computed: {},
  created() {},
  mounted() {

  },
    onLoad() {
    // this.getindex();
    this.$Api.getIndex({activityId: 1}).then(res=>{
       this.imgurl=res.data.coverList[0].url
        console.log(res);
    })

    
  },  
  watch: {},
  methods: {

// getindex() {
//       this.$http
//         .post("https://mp.zymcloud.com/hp-hd/applet/activity/list", {
//           activityId: 1
//         })
//         .then(res => {
//          this.imgurl=res.data.data.coverList[0].url
//           console.log(res);
//         });
//     },

    goAactivity() {
      wx.reLaunch({ url: "../activity/main" });
    },
    goQuestionnaire() {
      wx.reLaunch({ url: "../questionnaire/main" });
    }
  },

  components: {
    Swiper
  }
};
</script>

<style lang="less" scoped >
.swiper {
  height: 100px;
}

.nav-box {
  background-color: rgb(243, 243, 243);
  .nav-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
    li {
      background-color: white;
      padding: 5px;
      box-sizing: border-box;
      width: 48%;
      border: 1px solid rgb(109, 227, 240);
      margin-bottom: 10px;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 100%;
          height: 150px;
        }
      }
    }
  }
}
</style>
