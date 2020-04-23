<template>
  <div>
    <picker @change="bindPickerChange" :value="index" :range="array" class="type">
      <view class="picker">{{array[selectionIndex]}}  <span class="iconfont icon-arrow-left"></span>  </view>
    </picker>
  </div>
</template>

<script>
export default {
    props: ['array'],
    data() {
        return {
            selectionIndex:0
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
  bindPickerChange: function(e) {
      console.log(e);
      this.selectionIndex = e.mp.detail.value;
    }
    },
    components: {

    },
};
</script>

<style scoped >
</style>
