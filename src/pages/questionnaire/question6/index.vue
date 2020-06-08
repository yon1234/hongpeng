<template>
  <div>
    <Headers />
    <div class="quest-box">
      <div class="current">当前第1题/共8题</div>
      <div class="title">1.你选择学习的课程是？(单选)</div>
      <div class="radio-box">
        <myRadio :arrays="arrays" @sendValue="getValue" />
      </div>

      <div class="next" @click="next7">下一题</div>
    </div>
  </div>
</template>

<script>
import Headers from "../Headers";
import myRadio from "../myRadio";
export default {
  props: {},
  data() {
    return {
      arrays: [
        { id: 1, name: "1", value: "A.非常满意" },
        { id: 2, name: "2", value: "B.满意" },
        { id: 3, name: "3", value: "C.一般" },
        { id: 4, name: "4", value: "D.不满意(原因必填)" }
      ],
      myChoose: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    getValue(e) {
      console.log(e);
      this.myChoose = e;
      console.log(this.globalData);
    },
    next7() {
      this.globalData.mySatisfaction = this.myChoose;
      console.log(this.globalData);
      wx.navigateTo({
        url: "../question7/main"
      });
    }
  },
  components: {
    Headers,
    myRadio
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
  .radio-box {
    padding: 0 10px;
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
