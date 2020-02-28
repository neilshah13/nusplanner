<template>
  <div>
    <v-container class="container" id="selected" fluid>
      <h1>
        <ejs-autocomplete :dataSource= 'dataItem' :fields= 'dataFields' 
        placeholder="Select a Module" popupWidth= "250px" popupHeight= "500px" :highlight = "true" > 
        </ejs-autocomplete>
      </h1> 
    </v-container>
    <h2>
      <v-layout row wrap class="whitebox">
        <v-flex xs2 v-for="mod in moduleList" :key="mod">
            <v-checkbox :label="mod" v-model="selectedModules" :value="mod" class="labels"></v-checkbox>
        </v-flex>        
      </v-layout>   
     </h2>  
  </div>
</template>

<script>
import Vue from "vue";
import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(AutoCompletePlugin);
export default Vue.extend({
  data: function() {
    return {
      selectedModules: [],
      moduleList: [ 'CS1231', 'BT3102', 'IS3103', 'IS4241', 'BT3103'],
      dataItem: [
        { Id: 'Module1', Module: 'BT1101'},
        { Id: 'Module2', Module: 'BT2101'},
        { Id: 'Module3', Module: 'BT2102'},
        { Id: 'Module4', Module: 'BT2103'},
        { Id: 'Module5', Module: 'BT3103'},
      ],
      dataFields:{value: 'Module'}
    }
  },
  /*
  methods: {
    filteredModules: function() {
      return this.moduleList.filter((mod) => { return this.selectedModules.includes(mod) });
    },
    addModule: function(temp) {
      return this.moduleList.push(temp);
    } 
  }*/
});
</script>

<style scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);
.container {
  text-align: left;
  max-width: 50vh;
}

h1 {
  font-size: 20px;
  color: white;
  font-size: 24px;
}
.whitebox {
  color: rgb(42, 68, 99);
  background: white;
  font-size: 20px;
  text-align:center;
  margin: auto;
}

.labels {
  color: rgb(42, 68, 99);
  background: white;
  font-size: 20px;
  margin-left:40px;  
  text-align:center;
}
</style>


