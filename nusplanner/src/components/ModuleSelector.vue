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
    <v-btn icon @click = " displayNewlyAddedMod(select)">
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
import firebase from "firebase"
  export default {
    data () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null,
        moduleList: [],
        modules: [],
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
      displayNewlyAddedMod(v){                 //adding missing modules   v = moduleCode        
        var user = firebase.auth().currentUser;
        if(this.moduleList.includes(v) == false && v !=null){   //if module is not in user's module list
          this.moduleList.push(v)                   //adding module_code into moduleList
          var modID = firebase.firestore().collection('module').forEachwhere("module_code", "==", v )  //retrieve module's id using module code
          alert(modID)
          // alert("hellobb")
          firebase.firestore().collection('users').doc(user.uid).update({module_list: firebase.firestore.FieldValue.arrayUnion(v.id)})   //add module_id into user's firebase module_list
        }
      },
      async fetchModules() {
        //update available modules from firebase database for autocomplete searchbar
        firebase.firestore().collection('module').get().then(querySnapShot => {
          querySnapShot.forEach(doc => {
            this.modules.push(doc.data().module_code)
          })
        })
      },
      async displayCurrentMod() {      //retrieve and display existing modules from user's module list      
        var user = firebase.auth().currentUser;
        let currentmod = []
        await firebase.firestore().collection('users').doc(user.uid).get('module_list').then(querySnapShot => {
          querySnapShot.forEach(doc => {   //for each mod_id in module_list
            currentmod.push(firebase.firestore().collection('module').doc(doc).module_code)
            this.moduleList = currentmod
            // this.moduleList.push(firebase.firestore().collection('module').doc(doc).module_code)  //using mod_id to retrieve modcode
          })
        })
      }
    },
    created() {
    this.fetchModules()
    this.displayCurrentMod()
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