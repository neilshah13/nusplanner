<template>
  <div>
    <v-toolbar
      dark
      color="#36567d"
      src="https://lh3.googleusercontent.com/proxy/6_4hiPG1zpcr-h5C4h8M0pGIqQYxp1hUCoWJXaf_E2gk_MmGWsMtzNHPPBuYg_PdxPnK4DR5Cdm8AoaWa4UiXZdOThEJZDoXXSECzyFHedCLWdgTWTVLpMCGhBQ4LuLeM6_0IoXcYZxsqMTmsa5R"
      dense
      class = "justify-space-between"
    >
      <v-toolbar-title >  &nbsp;</v-toolbar-title>
      <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      class="col-sm-3 btn"
      cache-items
      flat
      hide-no-data
      hide-details
      label = "Add a Module"
      label: append-icon = mdi-magnify
      solo-inverted
      dense
      ></v-autocomplete>
      <v-btn icon @click=" displayNewlyAddedMod(select)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-card-subtitle>{{Week}}</v-card-subtitle>
    </v-toolbar>

    <h1></h1>
    <div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :multi-line="multiLine"
      :top="true"
       color="red darken-4"
    > 
      {{ text }}
      <v-btn
        color="black"
        text
        @click="snackbar=false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
  <div>
    <v-snackbar
      v-model="snack"
      :timeout="timeout1"
      :multi-line="multiLine"
      :top="true"
      color="success"
    > 
      {{ text1 }}
      <v-btn
        color="black"
        text
        @click="snackbar1=false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
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
      Week: "",
      snackbar: false,
      text: "Module selected already in module list",
      timeout: 2000,
      snack: false,
      text1: "Module successfully added",
      timeout1: 2000
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    getWeek() {
      let curr = new Date();
      let day = curr.getDate();
      let month = curr.getMonth() + 1;
      if (day <= 17 && month == 4) {
        this.Week = "AY2019/20, Semester 2, Week 13";
      } else if (day <= 24 && month == 4) {
        this.Week = "AY2019/20, Semester 2, Reading Week";
      } else if ((day <= 30 && month == 4) || (day == 1 && month == 5)) {
        this.Week = "AY2019/20, Semester 2, Examination Week 1";
      } else if (day <= 8 && month == 5) {
        this.Week = "AY2019/20, Semester 2, Examination Week 2";
      } else if (day <= 15 && month == 5) {
        this.Week = "AY2019/20, Special Term, Week 1";
      } else if (day <= 22 && month == 5) {
        this.Week = "AY2019/20, Special Term, Week 2";
      } else if (day <= 29 && month == 5) {
        this.Week = "AY2019/20, Special Term, Week 3";
      } else if ((day <= 31 && month == 5) || (day <= 5 && month == 6)) {
        this.Week = "AY2019/20, Special Term, Week 4";
      } else if (day <= 12 && month == 6) {
        this.Week = "AY2019/20, Special Term, Week 5";
      } else if (day <= 19 && month == 6) {
        this.Week = "AY2019/20, Special Term, Week 6";
      }
    },
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

    async displayNewlyAddedMod(v) {
      //adding missing modules   v = moduleCode
      var user = firebase.auth().currentUser;
      if (this.moduleList.includes(v) == false && v != null) {
        this.snack = true;
        //if module is not in user's module list
        this.moduleList.push(v); //adding module_code into moduleList
        if (!this.selectedModules.includes(v)) {
          this.selectedModules.push(v);
        }
        await firebase
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
                      .update({ module_list: modulelist });
                  }
                });
            });
          });
      }
      else {
        this.snackbar = true;
      }
    },
    async displayCurrentMod() {
      //retrieve and display existing modules from user's module list
      let currentmod = [];
      await firebase.auth().onAuthStateChanged(user => {
        //console.log(user);
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
      });
      this.moduleList = currentmod;
      this.selectedModules = currentmod;
    }
  },
  async mounted() {
    this.fetchModules();
    await this.displayCurrentMod();
    this.$root.$emit("mod-list", this.moduleList);
    this.getWeek();
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
.btn {
  max-width: 300px;
}
</style>