<template>
  <v-card>
    <v-toolbar color="blue-grey">
        <!-- <v-row align = "left"> -->
        <!-- <v-btn class="btn" icon dark @click="closeGroupMembers" color="warning" outlined>
          <v-icon>mdi-close</v-icon>
        </v-btn> -->
    </v-toolbar>

    <!-- Form start here ******************************-->
    <div id="app">
      <v-card color="blue-grey darken-1" dark :loading="isUpdating">
        <v-img class ='image' src="../..//public/project.png">
          <!-- <v-row> -->
            <!-- <v-col class="text-right" cols="12"> -->
              <!-- <v-menu bottom left transition="slide-y-transition">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="isUpdating = true">
                    <v-list-item-action>
                      <v-icon dark>mdi-settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Update</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu> -->
            <!-- </v-col> -->
            <!-- <v-row class="pa-4" align="center" justify="center">
              <v-col class="text-center">
                <h3 class="headline">{{ name }}</h3>
              </v-col>
            </v-row> -->
          <!-- </v-row> -->
        </v-img>

        <v-form ref="form" class= "mb-0"> 
          <v-container class= "fluid ma-0 pa-0 fill-height">
            <v-row>
              <v-card-title class="menu ml-4 mb-3 pa-0">
                <div class="ps-7 title"> Choose Module : </div>
                  <v-menu>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" class="btn" @click="getMods">
                        <span>{{ module }}</span>
                        <v-icon bottom>mdi-menu-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="mod in modules" :key="mod" @click="module=mod">
                        <v-list-item-title >{{ mod }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
              </v-card-title >
            </v-row>
            
            <v-row class = "align-center justify-center pa-0 ma-0">
              <v-col cols="11" >
                <v-text-field
                  class= "groupname"
                  v-model="grpName"
                  :disabled="isUpdating"
                  color="blue-grey lighten-2"
                  label="Group Name"
                  filled
                  light
                  solo
                  clearable
                  flat
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            
              <!-- <v-col cols="11" md="6"></v-col> -->
            <v-row class = "justify-center pa-0 ma-0">
              <v-col cols="11" >
                <v-autocomplete
                  class="groupmembers"
                  :disabled="isUpdating"
                  :items="usernames"
                  solo
                  dense
                  v-model="membernames"
                  chips
                  color="blue-grey lighten-2"
                  light
                  label="Select Group Members"
                  item-text="name"
                  item-value="name"
                  multiple
                  :placeholder="text"
                  no-data-text="Loading..."
                  @click="getUsers"
                  @change="addUser"
                >

                  <template v-slot:selection="data">
                    <!-- @click="addUser(data.item)" -->
                    <!-- itemscope="addUser(data.item)" -->
                    <!-- @click="selectchip"> -->
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      @click:close="remove(data.item)"
                    >
                      <!-- v-model="data" -->
                      <!-- input value to highlight the item  -->
                      {{ data.item }}
                    </v-chip>
                  </template>

                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content v-text="data.item"></v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                        <!-- <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle> -->
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-btn type="submit" color="primary" class="mr-4 mb-4" @click.stop="addGroups">Create</v-btn>
        <v-btn color="error" class = "ml-4 mb-4" @click="reset">Reset</v-btn>
      </v-card>
    </div>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    autoUpdate: true,
    isUpdating: false,
    selected: "",
    membernames: [], //stores names of group members
    members: [], //stores uid of group members
    grpName: "",
    module: "Select Module",
    modulenotselected: false,
    text: "Select Group Members",
    snackbar: false,
    name: "Teamwork Makes the Dream Work!",
    usernames: [],
    users: [],
    modules: []
  }),
  methods: {
    // closeGroupMembers() {
    //   this.$emit("update-grp");
    // },
    reset() {
      this.$refs.form.reset();
    },
    indexWhere: function(array, conditionFn) {
      const item = array.find(conditionFn);
      return array.indexOf(item);
    },
    async getMods() {
      var user = firebase.auth().currentUser; //current user
      let uid = user.uid;
      let modlist = [];
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then(function(doc) {
          modlist = doc.data().module_list;
        });
      this.modules = [];
      let moddb = await firebase
        .firestore()
        .collection("module")
        .get();
      moddb.forEach(doc => {
        for (var i = 0; i < modlist.length; i++) {
          if (doc.id == modlist[i]) {
            //finding the module
            this.modules.push(doc.data().module_code);
          }
        }
      });
    },
    async getUsers() {
      // should only get users in the module
      if (this.module == "Select Module") {
        this.$emit("module-notselected");
      } else {
        console.log("members now are " + this.membernames);
        let users = [];
        let usernames = [];
        let module_id = "";
        await firebase
          .firestore()
          .collection("module")
          .where("module_code", "==", this.module)
          .get()
          .then(function(qs) {
            qs.forEach(function(document) {
              module_id = document.id;
              firebase
                .firestore()
                .collection("users")
                .where("module_list", "array-contains", module_id)
                .get()
                .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                    console.log("now user is " + doc.data().name)
                    let user = { name: "", id: "" };
                    user.name = doc.data().name;
                    user.id = doc.id;
                    console.log(user)
                    if (user.name != "") {
                      users.push(user);
                      usernames.push(user.name);
                    //console.log(user.id);
                    }
                  });
                });
            });
          });
        this.users = users;
        this.usernames = usernames;
      }
    },
    addUser(username) {
      // find from array of name and id
      let user = username;
      if (username.length > 1) {
        user = username[username.length - 1];
      }
      // let index = this.usernames.indexOf(username)
      const index = this.indexWhere(this.users, item => item.name == user);
      let userid = this.users[index].id;
      this.members.push(userid);
      console.log("membernames are now " + this.membernames)
      console.log("members are now " + this.members)
    },
    remove(username) {
      // find from array of name and id
      let membername = this.membernames.indexOf(username);
      this.membernames.splice(membername, 1);
      // let member = this.members.indexOf(this.users[index].id)
      // const index = this.indexWhere(this.users, item => item.name == membername)
      // let member = this.users.indexOf(membername)
      this.members.splice(membername, 1);
      console.log("membernames are now " + this.membernames)
      console.log("members are now " + this.members)
    },
    async addGroups() {
      this.$emit("update-dialog");
      //add to group collection
      var current = firebase.auth().currentUser;
      if (this.members.indexOf(current.uid)==-1) {
        this.$emit("update-grpsnack-nouserfalse");
      }
      else if (this.grpName && this.module != "Select Module" && this.members)  {
        this.$emit("update-grpsnack");
        // this.$emit("update-grp");
        var groupadded = await firebase
          .firestore()
          .collection("group")
          .add({
            name: this.grpName,
            module_id: this.module,
            user_list: this.members // list of uids
          });
        for (var i = 0; i < this.members.length; i++) {
          let uid = this.members[i];
          await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then(function(doc) {
              let grplist = doc.data().group_list;
              grplist.push(groupadded.id);
              grplist = grplist.filter(item => item);
              firebase
                .firestore()
                .collection("users")
                .doc(uid)
                .update({ group_list: grplist });
            });
        }
        this.$emit("get-groups");
        // console.log("saved members" + this.members)
        //clear out inputs after a submission
        this.grpName = "";
        this.members = [];
        this.membernames = [];
        this.module = "Select Module";
        // console.log("saved")
      } else {
        this.$emit("update-grpsnack-notfilled")
        // alert("Please make sure all fields are filled!");
      }
      //add to user collection's group_list
    }
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },
  async beforeMount() {
    var current = firebase.auth().currentUser;
    let userid = current.uid;
    this.members.push(current.uid);
    var username;
    await firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .get()
      .then(function(doc) {
        username = doc.data().name;
      });
    this.membernames.push(username);
  }
};
</script>

<style scoped>
.groupname >>> .v-text-field__slot input {
  color: black;
  position: relative;
}
.btn {
  transform: scale(0.9);
}
.image {
  padding: 20px;
  height: 220px;
  /* transform: scale(0.65); */
}
</style>