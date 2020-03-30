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
import firebase from "firebase"
//import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";

//Vue.use(AutoCompletePlugin);
export default Vue.extend({
  name: "App",
  components: {
    Header
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
        this.user = user;
    });
},
});
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>



