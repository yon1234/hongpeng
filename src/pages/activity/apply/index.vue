<template>
  <div class="apply-box">
    <div class="online">在线报名</div>
    <form @submit="formSubmit" class="form">
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
          <Picker :array="array" :selectionIndex="selectionIndex" @passToIndex="getSeletion"></Picker>
        </view>
      </view>

      <view class="form-area description">
        <view class="title">选手描述</view>
        <textarea
          bindblur="bindTextAreaBlur"
          placeholder="请输入选手描述"
          class="type"
          v-model="userDescribes"
        />
      </view>

      <view class="uploadFile">
        <view class="title">上传选手图片(1-3张)</view>
        <Upimg @choosed="choosed" :urls="urls"></Upimg>
      </view>

      <view class="btn-area">
        <button formType="submit" @click="completeBtn">提交</button>
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
      userDescribes: "",
      //分组数据
      array: ["全部"],
      arrayId: [""],
      selectionIndex: 0,
      currentGroupId: "",
      currentExtend: 0,
      userInfo: "",
      // 图片
      urls: [],
      base64: []
    };
  },
  computed: {},

  onLoad() {
    this.getApplyGroupList();
  },

  created() {},

  mounted() {},
  watch: {},
  methods: {
    // picker 分组数据
    getSeletion(e) {
      this.selectionIndex = e;
      console.log("aaaaaaa");
      this.currentGroupId = this.arrayId[e];
      console.log(this.currentGroupId);
    },

    submit(e) {
      console.log(e);
    },
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

    //图片上传
    choosed(e) {
      console.log(e);
      console.log(1);
      this.urls = e.all;
      this.base64 = e.base64;
    },

    //每次删除选中的图片触发
    deleteImg(e) {
      console.log(e);
    },
    //报名判断接口
    async getApplyGroupList() {
      let res = await this.$Api.applyGroupList({
        activityId: 1
      });
      console.log(res);
      let arrlist = res.data.groupList.map(v => {
        return v.name;
      });

      let arrId = res.data.groupList.map(v => {
        return v.id;
      });
      console.log(arrlist);
      this.array = this.array.concat(arrlist);
      this.arrayId = this.arrayId.concat(arrId);
      console.log(this.array);
      this.userInfo = res.hdActivity.audit;
    },

    // 报名提交

    async completeBtn() {

      var extend1;
      if (this.userInfo == 1) {
        extend1 = 0;
      } else {
        extend1 = 1;
      }

      let newBase64 = JSON.stringify(this.base64);

      let res = await this.$Api.addApply({
        activityId: 1,
        name: this.name,
        tel: this.phone,
        describes: this.userDescribes,
        pics: newBase64,
        extend1: extend1,
        groupId: this.currentGroupId
      });
      console.log(res);

      if (res.code == 0) {
        (this.name = ""),
          (this.phone = ""),
          (this.userDescribes = ""),
          (this.urls = []);
        this.base64 = [];

        // 判断是否需要审核
        if (this.userInfo == 1) {
          wx.showModal({
            title: "提交成功",
            content: "本活动报名须进行资料审核，请您耐心等待",
            showCancel: false,
            // canCelcolor:"red",
            success: function(res) {
              if (res.confirm) {
                console.log("用户点击确定");
                wx.reLaunch({
                  url: "../hotactiv/main"
                });
              } else {
                console.log("用户点击取消");
              }
            }
          });
}
          if (this.userInfo == 0) {
            wx.showModal({
              title: "提示",
              content: "报名成功",
              showCancel: false,
              // canCelcolor:"red",
              success: function(res) {
                if (res.confirm) {
                  console.log("用户点击确定");
                  wx.reLaunch({
                    url: "../hotactiv/main"
                  });
                } else {
                  console.log("用户点击取消");
                }
              }
            });
          }

          // console.log(1111111111);
          // this.flag = true
        
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1500
        });
      }
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
