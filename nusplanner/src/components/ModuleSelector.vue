<template>
  <div>
    <v-toolbar
      dark
      color="teal"
      class="mx-auto"
      src="https://lh3.googleusercontent.com/proxy/6_4hiPG1zpcr-h5C4h8M0pGIqQYxp1hUCoWJXaf_E2gk_MmGWsMtzNHPPBuYg_PdxPnK4DR5Cdm8AoaWa4UiXZdOThEJZDoXXSECzyFHedCLWdgTWTVLpMCGhBQ4LuLeM6_0IoXcYZxsqMTmsa5R"
      dense
    >
      <v-toolbar-title class="col-sm-3">
        Missing a module ? &nbsp;&nbsp;
        <v-icon class="col-sm-3">mdi-magnify</v-icon>
      </v-toolbar-title>
      <div class="col-sm-4">
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
      <v-btn icon @click=" displayNewlyAddedMod(select)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="col-sm-7">
      <h1>
        <div>
          <v-layout class="whitebox">
            <v-flex
              class="d-flex justify-content-between bg-secondary mb-3"
              v-for="mod in moduleList"
              :key="mod"
            >
              <v-checkbox :label="mod" v-model="selectedModules" :value="mod" class="labels"></v-checkbox>
              <v-btn icon @click="deleteModFromList(mod)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </div>
      </h1>
    </div>
  </div>
</template>
// 
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      moduleList: [],
      modules: []
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.modules.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    displayNewlyAddedMod(v) {
      //adding missing modules   v = moduleCode
      var user = firebase.auth().currentUser;
      if (this.moduleList.includes(v) == false && v != null) {
        //if module is not in user's module list
        this.moduleList.push(v); //adding module_code into moduleList
        console.log(v);
        firebase
          .firestore()
          .collection("module")
          .where("module_code", "==", v)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              console.log(doc.id, " => ", doc.data());
              var modID = doc.id;
              firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .get()
                .then(function(doc) {
                  var modulelist = doc.data().module_list;
                  modulelist.push(modID);
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(user.uid)
                    .update({ module_list: modulelist });
                });
            });
          });
      }
    },
    deleteModFromList(mod) {
      var user = firebase.auth().currentUser;
      let index = this.moduleList.indexOf(mod);
      this.moduleList.splice(index, 1);
      firebase
        .firestore()
        .collection("module")
        .where("module_code", "==", mod)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            var modID = doc.id;
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .get()
              .then(function(doc) {
                var nmodlist = doc.data().module_list;
                var index = nmodlist.indexOf(modID);
                if (index !== -1) nmodlist.splice(index, 1);
                nmodlist = nmodlist.filter(item => item);
                firebase
                  .firestore()
                  .collection("users")
                  .doc(user.uid)
                  .update({ module_list: nmodlist });
              });
          });
        });
    },

    fetchModules() {
      //update available modules from firebase database for autocomplete searchbar
      firebase
        .firestore()
        .collection("module")
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(doc => {
            this.modules.push(doc.data().module_code);
          });
        });
    },
    displayCurrentMod() {
      //retrieve and display existing modules from user's module list
<<<<<<< HEAD
      var user = firebase.auth().currentUser;
      let currentmod = [];
       firebase
=======
      await firebase.auth().onAuthStateChanged(user => {
        console.log(user)
        let currentmod = [];
        firebase
>>>>>>> upstream/master
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then(function(doc) {
          console.log("Ran this");
          var user_modules = doc.data().module_list;
          console.log(user_modules);
          for (let i in user_modules) {
            var mod = user_modules[i];
            console.log(mod);
            if (mod != "") {
              firebase
                .firestore()
                .collection("module")
                .doc(mod)
                .get()
                .then(function(doc) {
                  var modcode = doc.data().module_code;
                  console.log(modcode);
                  currentmod.push(modcode);
                });
            }
          }
        });
      this.moduleList = currentmod;
      console.log("Reached this code");
      console.log(this.moduleList);
      });
    }
  },
  created() {
    this.fetchModules();
    this.displayCurrentMod();
  }
};
</script> 

<style scoped>
.whitebox {
  color: rgb(42, 68, 99);
  background: white;
  font-size: 20px;
  text-align: center;
  margin: auto;
}
</style>