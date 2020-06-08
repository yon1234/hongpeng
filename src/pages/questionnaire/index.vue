<template>
  <div>
    <header>
      <Swiper :images="images" />
    </header>
    <div class="context">
      <div class="quest">
        <p>您好！</p>
        <p
          class="content"
        >感谢你对武汉宏鹏教育的支持与信任，我们秉承教育改变生活的理念，在我校全体教育员工的努力下，已经帮助数万学生，实现了自己的人生理想和学习目标。您的宝贵意见将指导我们在今后的工作中不断么里改进，请务必认真填写！</p>
      </div>
      <div class="readly" @click="goQuestion">开始调查问卷</div>
    </div>
  </div>
</template>

<script>
import Headers from  "./Headers"
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
goQuestion(){
   wx.navigateTo({url:"./question1/main"})
}
  },
  components: {
    Swiper,
    Headers
  }
};
</script>

<style lang="less"  scoped >
.context {
  padding: 20px;
  box-sizing: border-box;

  .quest {
    padding: 20px 18px 18px 18px;
    border-radius: 10px;
    box-shadow: rgb(193, 192, 192) 0px 0px 4px 4px; //边框阴影
    .content {
      text-indent: 2em;
    }
  }

  .readly {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: rgb(39, 177, 27);
    font-size: 16px;
    width: 60%;
    color: white;
    border-radius: 5px;
    margin: 20px auto;
  }
}
</style>
