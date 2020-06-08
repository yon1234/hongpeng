<template>
  <div>
    <Headers />

    <div class="quest-box">
      <div class="current">当前第2题/共8题</div>
      <div class="title">1.你选择学习的课程是？(多选)</div>
      <div class="text-area">
        <textarea @blur="bindTextAreaBlur" placeholder="请提出您宝贵的意见" />
      </div>

      <div class="next" @click="next6">下一题</div>
    </div>
  </div>
</template>

<script>
import Headers from "../Headers";
export default {
  props: {},
  data() {
    return {
      text: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    bindTextAreaBlur(e) {
      this.text = e.mp.detail.value;
    },
    next6() {
      this.globalData.mySuggest = this.text;
      console.log(this.globalData);
      wx.navigateTo({
        url: "../question6/main"
      });
    }
  },
  components: {
    Headers
  }
};
</script>

<style lang="less" scoped >
.quest-box {
  padding: 20px 10px;
  box-sizing: border-box;
  .current {
    padding-left: 10px;
    font-size: 12px;
  }
  .title {
    padding: 10px 0;
    font-size: 14px;
    font-weight: 600;
  }

  .text-area {
    padding: 0 10px;
    textarea {
      width: 100%;
      border: 1px solid rgb(176, 174, 174);
      border-radius: 5px;
      padding: 10px;
      height: 200px;
      box-sizing: border-box;
    }
  }

  .next {
    width: 50%;
    margin: 20px auto;
    padding: 10px 0;
    font-weight: 600;
    background-color: rgb(39, 177, 27);
    text-align: center;
    color: white;
  }
}
</style>

