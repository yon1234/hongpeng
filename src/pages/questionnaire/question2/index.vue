<template>
  <div>
    <Headers />

    <div class="quest-box">
      <div class="current">当前第2题/共8题</div>
      <div class="title">2.你选择学习的课程是？(多选)</div>
      <div class="check-box">
        <myCheckbox :arrays="arrays" @sendValue="getValue" />
      </div>

      <div class="next" @click="next3">下一题</div>
    </div>
  </div>
</template>

<script>
import Headers from "../Headers";
import myCheckbox from "../myCheckbox";
export default {
  props: {},
  data() {
    return {
      arrays: [
        { id: 1, name: "1", value: "A.教学质量" },
        { id: 2, name: "2", value: "B.就业保障" },
        { id: 3, name: "3", value: "C.品牌知名度" },
        { id: 4, name: "4", value: "D.课程设置" },
        { id: 5, name: "5", value: "E.口碑美誉度" },
        { id: 6, name: "6", value: "F.办学规模" },
        { id: 7, name: "7", value: "G.校园环境" },
        { id: 8, name: "8", value: "H.住宿条件" },
        { id: 9, name: "9", value: "I.性价比" },
        { id: 10, name: "9", value: "Q.其他" }
      ],
      mychoose: {}
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    next3() {
      wx.navigateTo({
        url: "../question3/main"
      });

      this.globalData.myAdvantage = this.mychoose;
      console.log(this.globalData);
    },
    getValue(e) {
      console.log(e);

      this.mychoose = e;
    }
  },
  components: {
    Headers,
    myCheckbox
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

  .check-box {
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
