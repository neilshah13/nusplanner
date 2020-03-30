<template>
<div>
  <v-toolbar
    dark
    color="teal"
    class="mx-auto"
    src = "https://lh3.googleusercontent.com/proxy/6_4hiPG1zpcr-h5C4h8M0pGIqQYxp1hUCoWJXaf_E2gk_MmGWsMtzNHPPBuYg_PdxPnK4DR5Cdm8AoaWa4UiXZdOThEJZDoXXSECzyFHedCLWdgTWTVLpMCGhBQ4LuLeM6_0IoXcYZxsqMTmsa5R"
    dense
  >
  <v-toolbar-title class = "col-sm-2"> Missing a module ?</v-toolbar-title>
  <div class="col-sm-3">
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      flat
      hide-no-data
      hide-details
      label="Select Module"
      solo-inverted
      dense
      clearable="clear-icon"
    ></v-autocomplete> 
    </div>
    <v-btn icon @click = "displayMod(select)">
          <v-icon>mdi-magnify</v-icon>
    </v-btn>
    </v-toolbar>
    <div class = "col-sm-7">
    <h1>
      <v-layout class="whitebox" >
      <v-flex class="d-flex justify-content-between bg-secondary mb-3" v-for="mod in moduleList" :key="mod">
       <v-checkbox :label="mod" v-model="selectedModules" :value="mod" class="labels"></v-checkbox>
      </v-flex>        
      </v-layout>   
    </h1>
    </div>
    </div>  
</template>
// 
<script>
  export default {
    data () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null,
        moduleList: [],
        modules: [
          'BT2102',
          'BT2101',
          'BT3101',
          'BT3102',
          'BT3103',
          'BT4101',
        ],
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.modules.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },
        displayMod(v){
          this.moduleList.push(v)
      }
    },
  }
</script> 

<style scoped>
.whitebox {
  color: rgb(42, 68, 99);
  background: white;
  font-size: 20px;
  text-align:center;
  margin: auto;
}
</style>