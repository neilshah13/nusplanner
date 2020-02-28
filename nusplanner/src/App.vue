<template>
<div id="app">
  <Header></Header>
  <router-view>
  </router-view>
</div>
</template>

<script>
import Header from "./components/Header.vue";
import Vue from "vue";
//import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";

//Vue.use(AutoCompletePlugin);
export default Vue.extend({
  name: "App",
  components: {
    Header,
  },
});
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.no-gutters {
  margin-right: 0;
  margin-left: 0;

  > [class*="col-"] {
    padding-right: 0;
    padding-left: 0;
  }
}

#prioritylist {
  float: right;
  margin-right: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>



