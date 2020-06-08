<template>
  <div>
    <Headers />
    <div class="quest-box">
      <div class="current">当前第8题/共8题</div>
      <div class="title">8.你选择学习的课程是？(单选)</div>
      <div class="radio-box">
        <myRadio :arrays="arrays" @sendValue="getValue" />
      </div>

      <div class="next" @click="submitIndex">下一题</div>
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
        { id: 1, name: "1", value: "A.初中" },
        { id: 2, name: "2", value: "B.中专" },
        { id: 3, name: "3", value: "C.高中" },
        { id: 4, name: "4", value: "D.大专" },
        { id: 5, name: "5", value: "E.本科" },
        { id: 6, name: "6", value: "F.硕士" },
        { id: 7, name: "7", value: "G.博士" }
      ]
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

    submitIndex() {
      this.globalData.education = this.myChoose;
      console.log(this.globalData);
      wx.navigateTo({
        url: "../submitIndex/main"
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
