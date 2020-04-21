<template>
<div id="app">
  <body>
    <v-app>
      <v-row no-gutters>
        <v-col md="12">
          <moduleAdding></moduleAdding>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col md="2" class="leftpanel">
          <modulelist></modulelist>
          <announcement></announcement>
        </v-col>
        <v-col md="7">
          <v-app>
            <Weekly></Weekly>
          </v-app>
        </v-col>
        <v-col md="3">
          <todolist></todolist>
        </v-col>
      </v-row>
    </v-app>
  </body>
</div>
</template>

<script>
import todolist from "./todolist.vue";
//import Header from "./Header.vue";
import Weekly from "./Weekly.vue";
import Vue from "vue";
//import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
import ModuleAdding from "./ModuleSelector.vue";
//import Filters from "./Filters.vue";
import Announcement from "./Announcement.vue";
import ModuleList from "./ModuleList.vue"

//Vue.use(AutoCompletePlugin);
export default Vue.extend({
  name: "App",
  components: {
    //Header,
    todolist,
    Weekly,
    //Filters,
    moduleAdding: ModuleAdding,
    announcement: Announcement,
    modulelist: ModuleList
  }
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.no-gutters {
  margin-right: 0;
  margin-left: 0;
  margin-bottom: 0;

  > [class*="col-"] {
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
.leftpanel {
  margin-top: 15px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: auto;
  grid-row-gap: 10%;
  height:250px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>