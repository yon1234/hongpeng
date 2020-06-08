<template>
  <div>
    <checkbox-group @change="checkboxChange" class="checkbox-group">
      <label class="checkbox" v-for="(item,index) in arrays" :key="index">
        <checkbox :value="item.value" :checked="item.checked" />
        {{item.value}}
      </label>
    </checkbox-group>

     <div class="text-area" >
          <textarea @blur="bindTextAreaBlur"  placeholder="请输入..." />
      </div>
  </div>
</template>

<script>
export default {
  props: ["arrays"],
  data() {
    return {
          value:{
          }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {

checkboxChange(e){
  console.log(e);
  this.value.checkboxs=e.mp.detail.value
  this.$emit('sendValue', this.value)
  
},
bindTextAreaBlur(e){
  console.log(e);
  this.value.text=e.mp.detail.value
   this.$emit('sendValue', this.value)
}


  },
  components: {}
};
</script>

<style  lang="less"  scoped >
.checkbox-group {
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(211, 210, 210);
  border-bottom: 0;
  .checkbox {
    padding: 5px 5px;
    border-bottom: 1px solid rgb(211, 210, 210);
  }
}


  .text-area{
      margin-top: 10px;
       padding: 0 10px;
      textarea{

          width: 100%;
         border: 1px solid rgb(176, 174, 174);
         border-radius: 5px;
         padding: 10px;
         height: 50px;
         box-sizing: border-box;
      }
  }
</style>
