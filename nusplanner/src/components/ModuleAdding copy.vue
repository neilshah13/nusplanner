<template>
<div class="container-fluid" id = "ac">
  <div class="autocomplete">
    <ejs-autocomplete
      :dataSource="dataItem"
      :fields="dataFields"
      placeholder="Select a Module"
      popupWidth="100px"
      popupHeight="400px"
      :highlight="true"
      align: center
    ></ejs-autocomplete>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(AutoCompletePlugin);

export default Vue.extend({
  data: function() {
    return {
      dataItem: [
        { Id: "Module1", Module: "BT1101" },
        { Id: "Module2", Module: "BT2101" },
        { Id: "Module3", Module: "BT2102" },
        { Id: "Module4", Module: "BT3102" },
        { Id: "Module5", Module: "BT2103" }
      ],
      dataFields: { value: "Module" }
    };
  }
});
</script>

<style scoped>
#ac {
  float: center;
}

.autocomplete {
  width: 150px;
  padding: 10px;
  margin: auto;
  background-color:lavender;
}

@import url(https://cdn.syncfusion.com/ej2/material.css);
</style>