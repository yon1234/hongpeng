<template>
  <div class="container">
    <div class="swiper-box">
      <Swiper :images="images" />
    </div>

    <div class="nav-box">
      <ul class="nav-list">
        <li>
          <a href="../activity/main">
            <img src="/static/images/user.png" alt />
            <span>活动</span>
          </a>
        </li>

        <li>
          <a href="../activity/main">
            <img src="/static/images/user.png" alt />
            <span>报名</span>
          </a>
        </li>
        <li>
          <a href="../activity/main">
            <img src="/static/images/user.png" alt />
            <span>活动</span>
          </a>
        </li>

        <li>
          <a href="../activity/main">
            <img src="/static/images/user.png" alt />
            <span>活动</span>
          </a>
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
  mounted() {},
  watch: {},
  methods: {
   
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
      a {
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
