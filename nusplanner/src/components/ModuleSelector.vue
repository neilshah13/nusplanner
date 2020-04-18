<template>
  <div>
    <v-toolbar
      dark
      color=#36567d
      src="https://lh3.googleusercontent.com/proxy/6_4hiPG1zpcr-h5C4h8M0pGIqQYxp1hUCoWJXaf_E2gk_MmGWsMtzNHPPBuYg_PdxPnK4DR5Cdm8AoaWa4UiXZdOThEJZDoXXSECzyFHedCLWdgTWTVLpMCGhBQ4LuLeM6_0IoXcYZxsqMTmsa5R"
      dense
    >
      <v-toolbar-title class="col-sm-2">Missing a module ? &nbsp;</v-toolbar-title><v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      class="col-sm-3"
      cache-items
      flat
      hide-no-data
      hide-details
      label: append-icon = mdi-magnify
      solo-inverted
      dense
      ></v-autocomplete>
      <v-btn icon @click=" displayNewlyAddedMod(select)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <h1>
  
    </h1>
  </div>
</template>


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
      allModules: [],
      selectedModules: [],
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.allModules.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },

    fetchModules() {
      //update available modules from firebase database for autocomplete searchbar
      firebase
        .firestore()
        .collection("module")
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(doc => {
            this.allModules.push(doc.data().module_code);
          });
        });
    },

    displayNewlyAddedMod(v) {
      //adding missing modules   v = moduleCode
      var user = firebase.auth().currentUser;
      if (this.moduleList.includes(v) == false && v != null) {
          //if module is not in user's module list
          this.moduleList.push(v); //adding module_code into moduleList
          if (!this.selectedModules.includes(v)) {
          this.selectedModules.push(v);
          }
          firebase
          .firestore()
          .collection("module")
          .where("module_code", "==", v)
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
                  var modulelist = doc.data().module_list;
                  if (!modulelist.includes(modID)) {
                    modulelist.push(modID);
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(user.uid)
                      .update({ module_list: modulelist 
                    });
                  }
                  });
              });
          });
        }
    },
      displayCurrentMod() {
        //retrieve and display existing modules from user's module list
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            let currentmod = [];
            firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then(function(doc) {
                var user_modules = doc.data().module_list;
                for (let i in user_modules) {
                var mod = user_modules[i];
                if (mod != "") {
                    firebase
                    .firestore()
                    .collection("module")
                    .doc(mod)
                    .get()
                    .then(function(doc) {
                        var modcode = doc.data().module_code;
                        currentmod.push(modcode);
                    });
                }
                }
            });
            this.moduleList = currentmod;
            this.selectedModules = currentmod;
        });        
    }
  },
  async mounted() {
    this.fetchModules();
    await this.displayCurrentMod();
    this.$root.$emit("mod-list", this.moduleList);
  }
};
</script> 

<style scoped>
.whitebox {
  color: rgb(42, 68, 99);
  background: white;
  text-align: center;
  margin: auto;
  max-height: 70px;
}
</style>