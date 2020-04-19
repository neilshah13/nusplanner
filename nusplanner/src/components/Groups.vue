<template>
  <v-container class="cont">
    <!-- <v-app-bar dark> -->
    <v-app-bar color='rgb(42, 68, 99)'>
        <v-toolbar-title class='toolbartitle'>Groups Created</v-toolbar-title>
    </v-app-bar>
    <v-container>
      <v-row dense>
        <v-col v-for="(group, i) in groups" :key="i" cols="12">
          <v-card :color="colors[i]" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div class='editingtoolbar'>
                <v-card-title class="headline" v-text="group.name">
                </v-card-title>
                <div class='buttons'>
                <v-btn icon v-if="currentlyEditing != editGroup.name"
                  @click.prevent="editGrp(group)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn text v-else @click="saveGroup(editGroup)">Save</v-btn>
                <v-btn icon class='mr-4' @click="deletepopup = true">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-dialog v-model="deletepopup" max-width="300">
                  <v-card min-height='120'>
                    <v-toolbar-title class='deletetitle'>
                      Confirm delete?
                    </v-toolbar-title>
                  <v-btn color='primary' class= 'mr-4' @click="deleteGroup(editGroup)"> Confirm </v-btn>
                  <v-btn @click='deletepopup = false'> Cancel </v-btn>
                  </v-card>
                </v-dialog>
                </div>
              </div>
              <v-card-subtitle v-text="group.module_id" align="left"></v-card-subtitle>
              <v-card-text align="left">
                {{ arrange(group.usernames) }}
              </v-card-text>
                <!-- <v-menu v-if="editGroup.name == currentlyEditing"
                  class="menu"
                  v-model="selectedOpen"
                  :close-on-content-click="false"
                  :activator="selectedElement"> -->
                  <v-card color="rgb(42, 68, 99)" v-if="currentlyEditing == editGroup.name">
                  <v-form ref="form" class="neweventform">
                    <v-text-field
                      class="groupname"
                      v-model="group.name"
                      :disabled="isUpdating"
                      outlined
                      label="Group Name"
                      light
                  ></v-text-field>
                  <v-autocomplete
                    class="groupmembers"
                    :disabled="isUpdating"
                    :items="usernames"
                    outlined
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
                    @click="getUsers"
                    @change="addUser"
                  ></v-autocomplete>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false, currentlyEditing= null">Close</v-btn>
                </v-card-actions>
              </v-form>
              </v-card>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import firebase from "firebase";
// import firebase, { database } from "firebase";

  export default {
    data: () => ({
      groups: [],
      grpids: [],
      membernames: [],
      usernames: [],
      users: [],
      editGroup: {}, //stores grp name
      currentlyEditing: '', //stores grp name
      deletepopup: false,
      colors: [
        '#900C3F', //prune red
        '#E4A74D', //mustard yellow
        '#428071', //dark green
        '#1F7087', //dark turqoise
        '#952175' //dark purple
      ]
    }),
    methods: {
      arrange(namelist) {
        let result = ''
        for (var i=0; i < namelist.length; i++) {
          if (i == namelist.length-1) {
            result += namelist[i]
          } else {
            result += namelist[i] + ', '
          }
        }
        return result;
      },
      async getGroups() {
          var user = firebase.auth().currentUser; //current user
          console.log("Current user is " + user.uid)
          let uid= user.uid
          let grplist= []
          firebase.firestore().collection('users').doc(uid).get().then(function(doc) {
            grplist = doc.data().group_list
            console.log(grplist)
          })
          let groups = [] // store group name and module and members list
          let groupdb = await firebase.firestore().collection('group').get()
          groupdb.forEach(doc => {
            for(var i = 0; i < grplist.length; i++) {
              if (doc.id == grplist[i]) { //finding the grp
                groups.push(doc.data()) //now showing userids
              }
            }
          })
          for (var j = 0; j < groups.length; j++) {
            let members = groups[j].user_list
            let usernames = []
            for (var k = 0; k < members.length; k++) {
              let memberid = members[k]
              firebase.firestore().collection('users').doc(memberid).get().then(function(doc) {
                console.log(doc.data().name)
                usernames.push(doc.data().name)
              })
            }
            groups[j]['usernames'] = usernames
            delete groups[j].user_list
          }
          this.groups = groups
          this.grpids = grplist
        // firebase.firestore().collection('group').get().then(querySnapShot => {
        //   querySnapShot.forEach(doc => {
            // var groupInfo = {
            //   name: doc.data().name,
            //   module: doc.data().module_id,
            //   members: doc.data().user_list,
            // }
            // this.groups.push(groupInfo)
          // })
        // })
      },
      async getUsers() {
        // should only get users in the module
        let users = [];
        let usernames = [];
        let module_id = "";
        await firebase
          .firestore()
          .collection("module")
          .where("module_code", "==", this.editGroup.module_id)
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
                    let user = { name: "", id: "" };
                    user.name = doc.data().name;
                    user.id = doc.id;
                    if (user.name != "") {
                      users.push(user);
                      usernames.push(user.name);
                      console.log(user.name);
                    }
                  });
                });
            });
          });
        this.users = users;
        this.usernames = usernames;
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
      },
      remove(username) {
        // find from array of name and id
        let membername = this.membernames.indexOf(username);
        this.membernames.splice(membername, 1);
        // let member = this.members.indexOf(this.users[index].id)
        // const index = this.indexWhere(this.users, item => item.name == membername)
        // let member = this.users.indexOf(membername)
        this.members.splice(membername, 1);
        // console.log(this.membernames)
        // console.log(this.members)
      },
      saveGroup(grp) {
          this.updateGroup(grp)
          this.editGroup = null
          this.currentlyEditing= null
      },
      // showGroup ({ nativeGroup, group }) {
      //   const open = () => {
      //     this.editGroup = group
      //     this.selectedElement = nativeGroup.target
      //     setTimeout(() => this.selectedOpen = true, 10)
      //   }
      //   if (this.selectedOpen) {
      //     this.selectedOpen = false
      //     setTimeout(open, 10)
      //   } else {
      //     open()
      //   }
      //   nativeGroup.stopPropagation()
      // },
      editGrp(grp) {
        this.currentlyEditing = grp.name;
        this.editGroup = grp;
        this.membernames = grp.usernames;
        console.log("grp edited is " + grp)
      },
      async updateGroup(grp) {
        let index = this.groups.indexOf(grp.name)
        let grpid = this.groupids[index]
        await firebase.firestore().collection('group').doc(grpid).update({
          group: name,
          user_list: this.membernames
        })
        this.currentlyEditing = null
        this.getGroups()
      },
      async deleteGroup (grp) {
        this.deletepopup = false;
        let index = this.groups.indexOf(grp.name)
        let grpid = this.groupids[index]
        // var user = firebase.auth().currentUser;
        await firebase.firestore().collection('group').doc(grpid).delete();
        await firebase
        .firestore()
        .collection("users")
        .where("group_list", "array-contains", grpid)
        .get()
        .then(function(qs) {
          qs.forEach(async function(doc) {
            let userid = doc.id;
            await firebase.firestore().collection('users').doc(userid).get().then(function(document) {
              let grplist = document.data().group_list
              let grpidx = grplist.indexOf(grpid)
              if (index !== -1) grplist.splice(grpidx, 1); //removing grp from users' group_list
              grplist = grplist.filter(item => item)
              firebase.firestore().collection('users').doc(userid).update({group_list:grplist})
            })
          })
        })
        this.getGroups()
      },
    },
    created() {
      this.getGroups();
    },
    mounted() {
      this.getGroups();
    },
    // watch: {
    //     selectedGroup() {
    //         console.log(this.selectedModules)
    //         this.$root.$emit("filter-module", this.selectedModules);
    //     },
    // }
  }
</script>

<style scoped>
.cont {
    width: 50%;
}
.toolbartitle {
  color: white;
}
.neweventform {
  display: block;
}
.neweventfield {
  transform: scale(0.75);
}
.editingtoolbar {
  display: flex;
  justify-content: space-between;
}
.buttons {
  padding: 12px;
}
</style>