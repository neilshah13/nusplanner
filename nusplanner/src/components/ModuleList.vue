<template>
    <div class="box">
            <v-container class="modlist">
                <ul
                v-for="mod in moduleList"
                :key="mod" class="mods">
                <v-checkbox :label="mod" v-model="selectedModules" :value="mod" color="rgb(42, 68, 99)"
                append-icon="mdi-delete" @click:append="deleteModFromList(mod)">
                </v-checkbox>
                </ul>
        </v-container>
    </div>    
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            selectedModules: [],
            moduleList: []
        }
    },
    
    mounted() {
        this.$root.$on('mod-list', data => {
            this.moduleList = data;
            this.selectedModules = data;
        })
        this.displayCurrentMod();
        
    },
    watch: {
        selectedModules() {
            this.$root.$emit("filter-module", this.selectedModules);
        },
        moduleList() {
            this.$root.$emit("announcement-module", this.moduleList);
        }
    },
    methods: {
    deleteModFromList(mod) {
        var user = firebase.auth().currentUser;
        let ml_index = this.moduleList.indexOf(mod);
        //let sm_index = this.selectedModules.indexOf(mod)
        this.moduleList.splice(ml_index, 1);
        //this.selectedModules.splice(sm_index, 1);
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

    displayCurrentMod() {
        //retrieve and display existing modules from user's module list
        firebase.auth().onAuthStateChanged(user => {
            //console.log(user);
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
}
}
</script>

<style scoped>
.box {
  background-color:whitesmoke;
  width: 200px;
  height: 240px;
  color:rgb(42, 68, 99);
  /* margin: 14px 0px -20px 20px; */
  display: flex;
  justify-content: center;
  padding-top: 2px;
  padding-bottom: 2px;
}
.modlist {
    max-width: 200px;
    max-height: 220px;
    display: grid;
    align-items: start;
    justify-content: start;
    /* margin-top: 10px; */
    /* margin-left: 3px; */
    overflow-y: scroll;
    overflow-x: hidden;
    /* margin-left: -10px; */
}
.mods {
    margin-top: -20px;
    margin-right: -10px;
}
</style>