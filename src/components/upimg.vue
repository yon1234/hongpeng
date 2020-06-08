<template>
  <div class="j-pic-upload">
    <div
      class="j-upload-btn"
      @click="uploadImg()"
      :style="{'width':width || '120rpx','height':height || '120rpx'}"
    >
      <span class="j-upload-add">+</span>
    </div>
    <img
      @click="previewImg(index)"
      v-for="(src,index) in urls"
      :key="src"
      :src="src"
      :style="{'width':width || '120rpx','height':height || '120rpx'}"
      class="img"
    />
  </div>
</template>
 
<script>
export default {
  props: ["width", "height", "max", "srcs","urls"],
  data() {
    return {
      // urls: [],
      base64:[]
    };
  },
  mounted() {
    this.urls = this.srcs || [];
  },
  methods: {
    uploadImg() {
      let that = this;
      wx.chooseImage({
        count: that.max || 3,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function(res) {
          // 、调用文件管理器
          let base64 = wx
            .getFileSystemManager()
            .readFileSync(res.tempFilePaths[0], "base64");
          res.tempFilePaths.forEach(v => {
            that.urls.push(v);
            that.base64.push({ img: "data:image/png;base64," + base64 });
          });
          that.$emit("choosed", {
            all: that.urls,
            currentUpload: res.tempFilePaths,
            base64:that.base64

          });
        }
      });
    },
    previewImg(index) {
      let that = this;
      wx.showActionSheet({
        itemList: ["预览", "删除"],
        success: function(res) {
          if (res.tapIndex === 0) {
            wx.previewImage({
              current: that.urls[index],
              urls: that.urls
            });
          } else {
            that.urls.splice(index, 1);
             that.base64.splice(index, 1);
            that.$emit("delete", that.urls);
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.j-pic-upload {
  padding: 10rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.j-upload-btn {
  border: 1px dashed #ddd;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}
.j-upload-add {
  font-size: 80rpx;
  font-weight: 500;
  color: #c9c9c9;
}
.img {
  margin: 10rpx 20rpx 10rpx 0;
}
</style>
 
