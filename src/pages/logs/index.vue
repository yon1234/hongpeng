<template>
  <div class="continue">
    <div class="title">一起搞活动 申请获得</div>
    <div class="under">以下权限</div>
    <div class="purview">获得你的公开信息(昵称，头像，地区，及性别）</div>
    <button class="btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">确认</button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      code: ""
    };
  },
  created() {},
  mounted() {},

  onReadly() {},
  methods: {
    bindGetUserInfo(e) {
      // console.log('回调事件后触发')
      const self = this;
      wx.login({
        success(re) {
          if (re.code) {
            //发起网络请求
            if (e.mp.detail.userInfo) {
              console.log("用户按了允许授权按钮", e.mp.detail);
              let { encryptedData, userInfo, iv } = e.mp.detail;
              self.$Api
                .getOpenId({
                  // 这里的code就是通过wx.login()获取的
                  code: re.code,
                  encryptedData,
                  iv
                })
                .then(res => {
                  console.log(`后台交互拿回数据:`, res);
                  // 获取到后台重写的session数据，可以通过vuex做本地保存
                  wx.setStorage({
                    key: "session_key",
                    data: res.data.session_key
                  });
                  wx.setStorage({
                    key: "openid",
                    data: res.data.openid
                  });
                 wx.reLaunch({ url: "/pages/home/main" });
              
                  console.log(111111);
                  
                })
                .catch(err => {
                  console.log(`api请求出错:`, err);
                });
            } else {
              //用户按了拒绝按钮
              console.log("用户按了拒绝按钮");
            }
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.continue {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;

  .title {
    font-size: 16px;
    padding: 10px;
    font-weight: 600;
  }
  .under {
    font-size: 16px;
    padding: 10px;
    font-weight: 600;
  }

  .purview {
    font-size: 14px;
    padding: 10px;
  }
  .btn {
    width: 80%;
    color: white;
    background-color: yellowgreen;
  }
}
</style>
