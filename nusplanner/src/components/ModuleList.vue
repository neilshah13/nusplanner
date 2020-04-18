<template>
    <div class="box">
        <div class="fbm"><strong>Filter By Modules</strong></div>
        <v-flex
        v-for="mod in moduleList"
        :key="mod" class="modlist">
        <v-checkbox :label="mod" v-model="selectedModules" :value="mod" color="rgb(42, 68, 99)"
        append-icon="mdi-delete" @click:append="deleteModFromList(mod)">
        </v-checkbox>
        </v-flex>
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
            console.log('here')
            console.log(this.moduleList)
            console.log(this.selectedModules)
        })
        this.displayCurrentMod();
        
    },

    watch: {
        selectedModules() {
            console.log(this.selectedModules)
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

    }
}
</script>

<style>
.box {
  background-color:aliceblue;
  max-width: 200px;
  height: 260px;
  color:rgb(42, 68, 99);
  margin: 14px 0px -20px 20px;
  padding-top: 2px;
  padding-bottom: 2px;
}
.fbm {
    margin: 10px 30px 0px 30px;
}
.modlist {
    max-width: 180px;
    margin: -10px 20px -30px 30px;
    padding-top: 3px;
}


</style>