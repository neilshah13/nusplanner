<template>
<div id="app">
  <Header></Header>
  <router-view>
  <body>
    <div class="row no-gutters">
      <div class="col-md-2">
        <Filters></Filters>
        <moduleAdding></moduleAdding>
        <announcement></announcement>
      </div>
      <div class="col-md-7">
        <v-app>
          <v-content>
            <Weekly></Weekly>
          </v-content>
        </v-app>
      </div>
      <div class="col-md-3">
        <todolist></todolist>
      </div>
    </div>
  </body>
  </router-view>
</div>
</template>

<script>
import todolist from "./components/todolist.vue";
import Header from "./components/Header.vue";
import Weekly from "./components/Weekly";
import Vue from "vue";
//import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
import ModuleAdding from "./components/ModuleAdding.vue";
import Filters from "./components/Filters.vue";
import Announcement from "./components/Announcement.vue";

//Vue.use(AutoCompletePlugin);
export default Vue.extend({
  name: "App",
  components: {
    Header,
    todolist,
    Weekly,
    ModuleAdding,
    Filters,
    Announcement
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



