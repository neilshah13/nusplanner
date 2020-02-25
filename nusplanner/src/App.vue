<template>
  <div id="app">
    <app-header></app-header>
    <moduleAdding></moduleAdding>
  </div>
</template>

<script>
import Vue from "vue";
import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
import Header from './components/Header.vue';
import ModuleAdding from './components/ModuleAdding.vue';

Vue.use(AutoCompletePlugin);
export default Vue.extend({
  data: function() {
    return {
      dataItem:[
        { Id: 'Module1', Module: 'BT1101'},
        { Id: 'Module2', Module: 'BT2101'},
        { Id: 'Module3', Module: 'BT2102'},
        { Id: 'Module4', Module: 'BT3102'},
        { Id: 'Module5', Module: 'BT2103'},
      ],
      dataFields:{value: 'Module'}
    }
  },
    components: {
    //Registering with a name
    'app-header':Header,
    'ModuleAdding':ModuleAdding,
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
@import url(https://cdn.syncfusion.com/ej2/material.css);
/* For the headers to look good, be sure to reset the margin and padding of the body */
body {
	margin:0;
	padding:0;
}
</style>
