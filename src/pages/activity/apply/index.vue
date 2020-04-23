<template>
  <div class="apply-box">
    <div class="online">在线报名</div>
    <form bindsubmit="formSubmit" bindreset="formReset" class="form">
      <view class="form-area name">
        <view class="title">选手名称</view>
        <input
          name="input"
          placeholder="请输入选手名称"
          class="type"
          v-model.trim="name"
          @change="ChangeName"
        />
      </view>

      <view class="form-area phone">
        <view class="title">选手名称</view>
        <input
          name="input"
          placeholder="请输入手机号"
          class="type"
          v-model.trim="phone"
          @change="ChangePhone"
        />
      </view>

      <view class="form-area selection">
        <view class="title">分组</view>
        <!-- <picker @change="bindPickerChange" :value="index" :range="array" class="type">
          <view class="picker">{{array[selectionIndex]}}</view>
        </picker>-->
        <view class="type">
          <Picker :array="array"></Picker>
        </view>
      </view>

      <view class="form-area description">
        <view class="title">选手描述</view>
        <textarea bindblur="bindTextAreaBlur" placeholder="请输入选手描述" class="type" />
      </view>

      <view class="uploadFile">
        <view class="title">上传选手图片(1-3张)</view>
        <Upimg @choosed="choosed"></Upimg>
      </view>

      <view class="btn-area">
        <button formType="submit">提交</button>
      </view>
    </form>
  </div>
</template>

<script>
import Picker from "@/components/picker";
import Upimg from "@/components/upimg";
export default {
  props: {},
  data() {
    return {
      name: "",
      phone: "",
      array: [
        "全部",
        "北大青鸟鲁广校区",
        "北大青鸟光谷校区",
        "北大青鸟光谷学院",
        "课工场华中直营总校",
        "课工场光谷校区",
        "课工场郑州兰德校区",
        "北大青鸟徐东校区"
      ],
      selectionIndex: 0
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ChangeName(e) {
      
      if (!/^[\u4E00-\u9FA5A-Za-z]+$/.test(this.name)) {
        wx.showToast({
          title: "姓名有误",
          duration: 2000,
          icon: true
        });
      }
    },

    ChangePhone(e) {
      console.log(e);

      if (
        !/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(
          this.phone
        )
      ) {
        wx.showToast({
          title: "手机号码有误",
          duration: 2000,
          icon: "none"
        });
      }
    },

    bindPickerChange: function(e) {
      console.log(e);
      this.selectionIndex = e.mp.detail.value;
    },
    //图片上传
    choosed(e) {
      console.log(e);
      console.log(1);
    },

    //每次删除选中的图片触发
    deleteImg(e) {
      console.log(e);
    }
  },
  components: {
    Picker,
    Upimg
  }
};
</script>

<style lang="less" scoped >
.apply-box {
  padding: 0 10px 10px 10px;
  box-sizing: border-box;
  .online {
    border-bottom: 1px solid rgba(238, 238, 238, 0.993);
    padding: 5px;
    text-align: center;
  }

  .form {
    .form-area {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;
      .title {
        width: 100px;
        padding: 5px 0;
        color: rgb(109, 66, 142);
      }
      .type {
        flex: 1;
        margin-right: 20px;
        background-color: rgb(243, 241, 241);
        padding: 5px;
        font-size: 14px;
        border: 1px solid rgb(238, 236, 236);
        color: rgb(160, 158, 158);
      }
      textarea {
        height: 100px;
      }
    }
    .btn-area {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      button {
        background-color: chartreuse;
        color: white;
      }
    }
    .uploadFile {
      flex: 1;
      .uploadFile-img {
        margin-top: 15px;
        width: 50px;
        height: 50px;
        border: 1px dashed rgb(238, 236, 236);
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        color: rgb(213, 212, 212);
      }
    }
  }
}
</style>
