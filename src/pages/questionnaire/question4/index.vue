<template>
  <div>
    <Headers />

    <div class="quest-box">
      <div class="current">当前第4题/共8题</div>
      <div class="title">1.你选择学习的课程是？(多选)</div>
      <div class="check-box">
        <myCheckbox :arrays="arrays" @sendValue="getValue" />
      </div>

      <div class="next" @click="next5">下一题</div>
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
        { id: 1, name: "1", value: "A.课程体系优" },
        { id: 2, name: "2", value: "B.口碑好" },
        { id: 3, name: "3", value: "C.就业前景好" },
        { id: 4, name: "4", value: "D.教学质量好" },
        { id: 5, name: "5", value: "E.校区规模大" },
        { id: 6, name: "6", value: "F.性价比高" },
        { id: 7, name: "7", value: "G.校园环境好" },
        { id: 8, name: "8", value: "H.试听效果好" },
        { id: 9, name: "9", value: "I.品牌知名度" },
        { id: 10, name: "10", value: "J.师资力量" },
        { id: 11, name: "11", value: "K.课程模式" },
        { id: 12, name: "12", value: "L.父母决定" },
        { id: 10, name: "10", value: "M.亲友决定" },
        { id: 10, name: "10", value: "N.专业兴趣" },
        { id: 10, name: "10", value: "O.其他" }
      ],
      mychoose: {}
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    getValue(e) {
      console.log(e);
      this.mychoose = e;
    },

    next5() {
      this.globalData.mycause = this.mychoose;
      console.log(this.globalData);
      wx.navigateTo({
        url: "../question5/main"
      });
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
