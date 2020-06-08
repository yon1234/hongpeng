<template>
  <div>
    <Headers />
    <div class="container">
      <div class="title">
        <p>请留下你的联系方式，您提交完问卷后可参与抽奖，中奖工作人员会第一时间联系您!</p>
      </div>

      <form @submit="formSubmit" class="form">
        <view class="form-area name">
          <view class="title">姓名:</view>
          <input
            name="input"
            placeholder="请输入选手名称"
            class="type"
            v-model.trim="forms.name"
            @change="ChangeName"
          />
        </view>

        <view class="form-area phone">
          <view class="title">电话:</view>
          <input
            name="input"
            placeholder="请输入手机号"
            class="type"
            v-model.trim="forms.phone"
            @change="ChangePhone"
          />
        </view>

        <view class="form-area sex">
          <view class="title">性别:</view>
          <radio-group class="radio-group" @change="radioChange">
            <radio class="radio" value="男">
              <text>男</text>
            </radio>
            <radio class="radio" value="女">
              <text>女</text>
            </radio>
          </radio-group>
        </view>

        <view class="form-area selection-data">
          <view class="section__title">出生日期:</view>
          <picker
            mode="date"
            value="2016-09-01"
            start="1980-01-01"
            end="2019-12-31"
            @change="bindDateChange"
            class="picker"
          >
            <view class="data">{{forms.data}}</view>
          </picker>
        </view>
        <view class="form-area name">
          <view class="title">拼接:</view>
          <input
            name="input"
            placeholder="请输入选手名称"
            class="type"
            @change="ChangeName"
            disabled
            v-model="pinjie"
          />
        </view>

        <view class="btn-area">
          <button formType="submit" @click="sub">提交</button>
        </view>
      </form>
    </div>
  </div>
</template>

<script>
import Headers from "../Headers";
export default {
  props: {},
  data() {
    return {
      forms: {
        data: "2016-09-02",
        name: "",
        sex: "",
        phone: ""
      }
    };
  },
  computed: {
    pinjie() {
      return `${this.forms.name} ${this.forms.phone}${this.forms.sex}${
        this.forms.data
      }`;
    }
  },

  onLoad() {
    console.log(this.globalData);
  },

  created() {},
  mounted() {},
  watch: {
    // name(newName, oldName) {
    //   console.log(newName);
    //   console.log(oldName);
    // }
  },
  methods: {
    // async sub() {
    //   let res = await this.$Api.addHdInfogiftlog({
    //     questionnaireId: 2,
    //     name: this.name,
    //     sex: this.sex,
    //     tel: this.phone,
    //     lesson: this.globalData.myChooseCorse,
    //     cause:this.globalData.mycause.checkboxs+":"+this.globalData.mycause.text,
    //     advantage:this.globalData.myAdvantage.checkboxs+":"+this.globalData.myAdvantage.text,
    //     place:this.globalData.myPlace,
    //     changee:this.globalData.mySuggest,
    //     satisfaction:this.globalData.mySatisfaction,
    //     negativeComment:'',
    //     education:this.globalData.education,
    //     current:this.globalData.freshGraduate
    //   });

    //   console.log(res);
    // },
    formSubmit(e) {
      console.log(e);

      // wx.redirectTo({
      //   url: "../luckyDraw/main"
      // });
    },

    radioChange(e) {
      console.log(e);
      this.forms.sex = e.mp.detail.value;
    },
    bindDateChange(e) {
      console.log(e);
      this.forms.data = e.mp.detail.value;
    }
  },
  components: { Headers }
};
</script>

<style lang="less" scoped >
.container {
  padding: 10px;
  box-sizing: border-box;
  .title {
    padding: 10px 0;
  }
  .form {
    .form-area {
      display: flex;
      align-items: center;
      padding: 10px;
      input {
        padding: 5px;
        border: 1px solid rgb(184, 182, 182);
        margin-left: 20px;
        width: 70%;
      }
      .radio-group {
        margin-left: 20px;
        .radio {
          margin-right: 20px;
        }
      }
    }
    .picker {
      margin-left: 20px;
      padding: 5px;
      border: 1px solid rgb(184, 182, 182);
      width: 50%;
    }
    .btn-area {
      width: 50%;
      margin: auto;
      padding: 10px;
      box-sizing: border-box;
      button {
        background-color: chartreuse;
        color: white;
      }
    }
  }
}
</style>

