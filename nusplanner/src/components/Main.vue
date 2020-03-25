<template>
<div id="app">
  <body>
    <v-row no-gutters>
      <v-col md= "4">
        <moduleAdding></moduleAdding>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col md="2">
        <announcement></announcement>
        <Filters></Filters>
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
import Filters from "./Filters.vue";
import Announcement from "./Announcement.vue";

//Vue.use(AutoCompletePlugin);
export default Vue.extend({
  name: "App",
  components: {
    //Header,
    todolist,
    Weekly,
    Filters,
    moduleAdding: ModuleAdding,
    announcement: Announcement
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