import A from "./A.vue";
import B from "./B.vue";
import Vue from "vue";

console.log(A)
const app = new Vue(A).$mount("#app");
console.log(A)