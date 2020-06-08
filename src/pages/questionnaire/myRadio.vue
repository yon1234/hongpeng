<template>
  <div>
    <radio-group class="radio-group" @change="radioChange">
      <radio class="radio" v-for=" (item,index) in arrays" :key="index" :value="item.value">
        <text>{{item.value}}</text>
      </radio>
    </radio-group>
  </div>
</template>

<script>
export default {
  props: ["arrays"],
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    radioChange: function(e) {
      console.log(e);
      
      console.log("radio发生change事件，携带value值为：", e.mp.detail.value);

      this.$emit("sendValue",e.mp.detail.value)
    }
  },
  components: {}
};
</script>

<style lang="less" scoped >
.radio-group {
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(211, 210, 210);
  border-bottom: 0;
  .radio {
    padding: 5px 5px;
    border-bottom: 1px solid rgb(211, 210, 210);
  }
}
</style>
