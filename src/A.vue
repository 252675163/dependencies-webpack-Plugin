/**xx模块 */
<template>
  <div>a</div>
</template>
<script>
import A1 from "./A1";
import A2 from "./A2";
import C from "./C.vue";
export default {
  name: "as",
  methods: {
    CC: () => {
      console.log(A1);
      console.log(A2);
      const VV = 1;
    }
  }
};
</script>
<style lang="less" scoped>
div {
  color: red;
}
</style>


