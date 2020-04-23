<template>
  <v-app>
  <v-container>
    <div>
        <v-toolbar color="#36567d">
          <v-toolbar-title class='toolbartitle'>Groups Created</v-toolbar-title>
    <!-- <v-app-bar class='appbar' color='rgb(42, 68, 99)'> -->
      <!-- <div class='btnalign'> -->
        <v-spacer></v-spacer>
      <v-btn @click='creategroup = true'>Create Group
      <v-dialog v-model="creategroup" max-width="550">
      <CreateGroup @module-notselected='modulesnack' @update-grpsnack='updateSnackGrp' @update-grpsnack-nouserfalse='updategroupnouser' @update-grpsnack-notfilled='updateSnackGrpnotfilled' @get-groups='getGroups'>
      </CreateGroup>
      </v-dialog>
      </v-btn>
        </v-toolbar>
      <v-snackbar
    v-model="grpsnack"
    class='grpsnackbar'
  >
    Group successfully created!
    <v-btn
      color="error"
      text
      @click="grpsnack = false"
    >
      Close
    </v-btn>
  </v-snackbar>

  <v-snackbar
    v-model="grpsnacknouser"
  >
    You need to include yourself in the group!
    <v-btn
      color="error"
      text
      @click="grpsnacknouser = false"
    >
      Close
    </v-btn>
  </v-snackbar>

  <v-snackbar
    v-model="grpsnacknotfilled"
    class='grpsnackbar'
  >
    Please make sure all fields are filled!
    <v-btn
      color="error"
      text
      @click="grpsnacknotfilled = false"
    >
      Close
    </v-btn>
  </v-snackbar>
    <v-snackbar v-model="modulenotselected">
      You must select a module!
      <v-btn color="error" text @click="modulenotselected = false">Close</v-btn>
    </v-snackbar>
    </div>
    <div v-if="displayText != ''" class='displayPadding'>
      {{ displayText }}
    </div>
      <v-row dense>
        <v-col v-for="(group, i) in groups" :key="i" cols="12">
          <v-card class='group' :color="colors[i]" dark>
              <div class='editingtoolbar'>
                <v-card-title class="headline" v-text="group.name">
                </v-card-title>
                <div class='buttons'>
                <v-btn icon v-if="group.id != editGroup.id"
                  @click.prevent="editGrp(group)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn text v-else @click="updateGroup(editGroup)">Save</v-btn>
                <!-- <v-btn icon class='mr-4' @click="deletepopup = true"> -->
                <v-btn icon class='mr-4' @click="deletepopup = true, selectGrp(group)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-dialog v-model="deletepopup" max-width="300">
                  <v-card min-height='120'>
                    <v-toolbar-title class='deletetitle'>
                      Confirm delete?
                    </v-toolbar-title>
                  <v-btn color='primary' class= 'mr-4' @click="deleteGroup(selected.id)"> Confirm </v-btn>
                  <v-btn @click='deletepopup = false'> Cancel </v-btn>
                  </v-card>
                </v-dialog>
                </div>
              </div>
              <v-card-subtitle v-text="group.module_id" align="left"></v-card-subtitle>
              <v-card-text align="left">
                {{ arrange(group.usernames) }}
              </v-card-text>
                  <v-card color="rgb(42, 68, 99)" v-if="group.id == editGroup.id">
                  <v-form ref="form" class="neweventform">
                    <v-text-field
                      class="groupname"
                      v-model="currentlyEditing"
                      outlined
                      label="Group Name"
                      light
                  ></v-text-field>
                  <v-autocomplete
                    class="groupmembers"
                    outlined
                    dense
                    :items="usernames"
                    v-model="membernames"
                    chips
                    color="blue-grey lighten-2"
                    light
                    label="Select Group Members"
                    multiple
                    :placeholder="text"
                    @click="getUsers"
                    @change="addUser"
                    no-data-text="Loading..."
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
                    <!-- <template>
                      <v-list-item-content v-text="data.item"></v-list-item-content>
                    </template> -->
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content v-text="data.item"></v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                      </v-list-item-content>
                     </template>
                  </template>
                  </v-autocomplete>
                <v-card-actions>
                  <v-btn text color="white" @click="editGroup= {}">Close</v-btn>
                </v-card-actions>
              </v-form>
              </v-card>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</v-app>
</template>

<script>
// import Vue from "vue";
import firebase from "firebase";
import CreateGroup from "./CreateGroup.vue"
// import firebase, { database } from "firebase";

// export default Vue.extend({
export default {
    // name: "App",
    components: {
      CreateGroup
    },
    data: () => ({
      groups: [], //groups {name, module_id, usernames}
      membernames: [], //user names from the group
      usernames: [], //users' names taking the mod
      users: [], //users with {name, id} taking the mod
      editGroup: {}, //stores grp
      selected: {},
      currentlyEditing: '', //stores grp name
      module: 'Select Module',
      creategroup: false,
      // search: null,
      deletepopup: false,
      grpsnack: false,
      grpsnacknouser: false,
      grpsnacknotfilled: false,
      modulenotselected: false,
      displayText: '',
      text: "Select Group Members",
      // loading: false,
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
          let grplist= [] // stores grpids
          let groups = [] // store group name and module and members list
          // await firebase.auth().onAuthStateChanged(async function(user) {
          var current = firebase.auth().currentUser;
          //console.log("Current user is " + current.uid)
          let uid= current.uid
          await firebase.firestore().collection('users').doc(uid).get().then(function(doc) {
            grplist = doc.data().group_list
            //console.log(grplist)
          })
          if (grplist.length != 0) {
            this.displayText= ''
            let groupdb = await firebase.firestore().collection('group').get()
            groupdb.forEach(doc => {
              for(var i = 0; i < grplist.length; i++) {
                if (doc.id == grplist[i]) { //finding the grp
                  var groupInfo = {
                    name: doc.data().name,
                    module_id: doc.data().module_id,
                    user_list: doc.data().user_list,
                    id: doc.id
                  }
                  // console.log("grpid for group " + doc.data().name + " is " + doc.id)
                  groups.push(groupInfo) //now showing userids
                  // groups.push(doc.data()) //now showing userids
                }
              }
            })
            for (var j = 0; j < groups.length; j++) {
              let members = groups[j].user_list
              let usernames = []
              for (var k = 0; k < members.length; k++) {
                let memberid = members[k]
                firebase.firestore().collection('users').doc(memberid).get().then(function(doc) {
                  //console.log(doc.data().name)
                  usernames.push(doc.data().name)
                })
              }
              // groups[j]['id'] = grplist[j]
              groups[j]['usernames'] = usernames
              //console.log("usernames are " + usernames)
              delete groups[j].user_list
            }
          } else {
            this.displayText = "You currently have no groups. Click on the Create Group button to create a group!"
          }
        // firebase.firestore().collection('group').get().then(querySnapShot => {
        //   querySnapShot.forEach(doc => {
            // var groupInfo = {
            //   name: doc.data().name,
            //   module: doc.data().module_id,
            //   members: doc.data().user_list,
            // }
            // this.groups.push(groupInfo)
          // })
        this.groups = groups
        this.grpids = grplist
      },
      async getUsers() {
        // should only get users in the module
          let users = [];
          let usernames = [];
          let module_id = "";
          await firebase
            .firestore()
            .collection("module")
            .where("module_code", "==", this.editGroup.module_id) //module code
            .get()
            .then(function(qs) {
              qs.forEach(function(document) {
                module_id = document.id;
                firebase
              .firestore()
              .collection("users")
              .where("module_list", "array-contains", module_id) //module id
              .get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  let user = { name: "", id: "" };
                  user.name = doc.data().name;
                  user.id = doc.id;
                  console.log("now user is "+ user)
                  if (user.name != "") {
                    users.push(user);
                    usernames.push(user.name);
                    // console.log(user.id);
                  }
                });
              });
              });
          });
          this.users = users;
          this.usernames = usernames;
      },
      addUser(username) {
        // username is array of current users
        // let user = username;
        // if (username.length > 1) {
        //   user = username[username.length - 1];
        // }
        this.membernames = username //changed reference
        // console.log("now members are " + username)
        //console.log("now membernames is " + this.membernames)
        // let index = this.usernames.indexOf(username)
        // const index = this.indexWhere(this.users, item => item.name == user);
        // let userid = this.users[index].id;
        // this.members.push(userid);
      },
      remove(username) {
        // find from array of name and id
        var members = []
        let membername = this.membernames.indexOf(username)
        members = this.membernames
        members.splice(membername, 1)
        // this.membernames.splice(membername,1)
        // for (var i = 0; i < this.membernames.length; i++) {
        //   members.push(this.membernames[i])
        // }
        this.membernames = members
        // let membername = this.editGroup.usernames.indexOf(username);
        //console.log("current members are " + this.membernames)
        //console.log("original is " + this.editGroup.usernames)
        // this.membernames.splice(membername, 1);
        // let member = this.members.indexOf(this.users[index].id)
        // const index = this.indexWhere(this.users, item => item.name == membername)
        // let member = this.users.indexOf(membername)
        // console.log(this.membernames)
        // console.log(this.members)
        //console.log("now current members are " + this.membernames)
        //console.log("now original is " + this.editGroup.usernames)
      },
      // saveGroup(grp) {
      //     grp.name = this.currentlyEditing
      //     grp.usernames = this.membernames
      //     this.updateGroup(grp)
      //     this.editGroup = {}
      //     this.currentlyEditing= ''
      // },
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
        var members = []
        // members = grp.usernames
        for (var i= 0; i < grp.usernames.length; i++) {
          members.push(grp.usernames[i])
        }
        var grpInfo = {
          name: grp.name,
          id: grp.id,
          module_id: grp.module_id,
          usernames: grp.usernames
        }
        this.editGroup = grpInfo;
        this.currentlyEditing = grp.name;
        this.membernames = members;
        this.module = grp.module_id;
      },
      selectGrp(group) {
        this.selected = group
      },
      indexWhere: function(array, conditionFn) {
        const item = array.find(conditionFn);
        return array.indexOf(item);
      },
      async updateGroup(grp) { //grp == editGroup
        // let index = this.groups.indexOf(grp)
        // let idx = this.indexWhere((this.groups, item => item.id == grp.id))
        // console.log("index of grp edited is " + idx)
        if (this.currentlyEditing != grp.name && grp.usernames == this.membernames) { //if only grp name changed
          //console.log("now updating for unchanged grp members")
          await firebase.firestore().collection('group').doc(grp.id).update({
            name: this.currentlyEditing,
          })
          this.currentlyEditing=''
        } else if (this.currentlyEditing == grp.name && grp.usernames != this.membernames) { //if user list changed
          //console.log("now updating for changed grp members")
          //get user ids
          var userids = []
          // var modusers = this.users
          //console.log("this.membernames = " + this.membernames)
          //console.log("this.users = " + this.users)
          for (var j=0 ; j < this.membernames.length; j++) {
            for (var u = 0; u < this.users.length; u++) {
              if (this.membernames[j] == this.users[u].name) {
                //console.log("the final member is " + this.users[u].name)
                userids.push(this.users[u].id)
              }
            }
            // let idx = this.indexWhere((modusers, item => item.name == this.membernames[j]))
            // var uid = modusers[idx].id
            // var uid = this.users.filter(function(user){return user.name == this.membernames[j]}).id;
            // userids.push(uid)
          }
          await firebase.firestore().collection('group').doc(grp.id).update({
            name: this.currentlyEditing,
            user_list: userids //store list of userids
          })
          this.currentlyEditing=''
          let memberids = []
          for (var k = 0; k < grp.usernames.length; k++) {
            for (var m = 0; m < this.users.length; m++) {
              if (grp.usernames[k] == this.users[m].name) {
                //console.log("the original member is " + this.users[m].name)
                memberids.push(this.users[m].id)
              }
            }
            // let idx = this.indexWhere((modusers, item => item.name == grp.usernames[k]))
            // var mid = modusers[idx].id
            // var uid = this.users.filter(function(user){return user.name == this.membernames[j]}).id;
            // memberids.push(mid)
          }
          let compiled_list = userids
          //console.log("compiled_list at the start :" + compiled_list)
          //console.log("memberids are now " + memberids)
          compiled_list = compiled_list.concat(memberids)
          //console.log("after concat is " + compiled_list)
          compiled_list = [...new Set(compiled_list)] //to get all affected
          //console.log("compiled list is " + compiled_list)
          for (var i = 0; i < compiled_list.length; i++) { //for all affected users
              await firebase.firestore().collection('users').doc(compiled_list[i]).get().then(function(doc) {
                  let grplist = doc.data().group_list
                  //console.log("new members' userids are "+ userids)
                  //console.log("original members' userids are "+ memberids)
                  if (userids.includes(compiled_list[i])) { //user in final list
                    if (! memberids.includes(compiled_list[i])) { //user not in original list
                      if (!grplist.includes(grp.id)) { //grp id is newly added
                        grplist.push(grp.id)
                        //console.log("new grp added for " + compiled_list[i])
                        grplist = grplist.filter(item => item)
                        firebase.firestore().collection('users').doc(compiled_list[i]).update({group_list:grplist})
                      }
                    }
                  } else { //user not in final list
                    if (memberids.includes(compiled_list[i])) { //user in original list
                      if (grplist.includes(grp.id)) { //grp id to delete
                        let index = grplist.indexOf(grp.id)
                        //console.log("index to be deleted for " + compiled_list[i] + " is " + index)
                        grplist.splice(index, 1)
                        grplist = grplist.filter(item => item)
                        firebase.firestore().collection('users').doc(compiled_list[i]).update({group_list:grplist})
                      }
                    }
                  }
            // await firebase
            // .firestore()
            // .collection("users")
            // .where("name", "==", compiled_list[i]) //check for each member
            // .get()
            // .then(function(qs) {
            //   qs.forEach(function(doc) {
            //     let grplist = doc.data().group_list
            //     if (compiled_list[i] in grp.usernames) { //user is in the final list
            //       if (!grplist.includes(grp.id)) { //add grpid to the group_list
            //         grplist.push(grp.id)
            //         console.log("new grp added for " + compiled_list[i])
            //       }
            //     } else { //user is not in the final list
            //       if (grplist.includes(grp.id)) { //remove grpid from the group_list
            //         let index = grplist.indexOf(grp.id)
            //         console.log("index to be deleted for " + compiled_list[i] + " is " + index)
            //         grplist.splice(index, 1)
            //       }
            //     }
            //   })
            })
          }
          this.membernames= []
          this.editGroup={}
        }
        this.getGroups()
      },
      async deleteGroup (grp) { //selected grp's id
        this.deletepopup = false;
        // console.log("the group deleted is " + grp)
        // let groupdb = await firebase.firestore().collection('group').get()
        //   groupdb.forEach(async function(doc) {
        //       if (doc.id == grp.id) { //finding the grp
        //       console.log("now deleting grp " + doc.id)
        await firebase.firestore().collection('group').doc(grp).delete();
          //     }
          // })
        // var user = firebase.auth().currentUser;
        await firebase
        .firestore()
        .collection("users")
        .where("group_list", "array-contains", grp)
        .get()
        .then(function(qs) {
          qs.forEach(async function(doc) {
            let userid = doc.id;
            await firebase.firestore().collection('users').doc(userid).get().then(function(document) {
              let grplist = document.data().group_list
              let grpidx = grplist.indexOf(grp)
              if (grpidx !== -1) grplist.splice(grpidx, 1); //removing grp from users' group_list
              grplist = grplist.filter(item => item)
              firebase.firestore().collection('users').doc(userid).update({group_list:grplist})
            })
          })
        })
        this.getGroups()
      },
      modulesnack() {
        this.modulenotselected = true;
        setTimeout(function(){ this.modulenotselected = this.modulenotselected.replace(true, false); }, 3000)
      },
      updategroupnouser(){
        this.grpsnacknouser = true;
        setTimeout(function(){ this.grpsnacknouser = this.grpsnacknouser.replace(true, false); }, 3000)
      },
      updateSnackGrp() {
        this.grpsnack = true;
        this.creategroup = false;
        setTimeout(function(){ this.grpsnack = this.grpsnack.replace(true, false); }, 3000)
        this.getGroups()
      },
      updateSnackGrpnotfilled() {
        this.grpsnacknotfilled = true;
        setTimeout(function(){ this.grpsnacknotfilled = this.grpsnacknotfilled.replace(true, false); }, 3000)
      },

    },
    created() {
      this.getGroups();
    },
    mounted() {
      this.getGroups();
    },
    // watch: {
    //     editGroup() {
    //       console.log(this.editGroup.name)
    //       this.editGrp(this.editGroup)
    //     },
    //     currentlyEditing() {
    //       console.log(this.currentlyEditing)
    //     }
    // }
  }
</script>

<style scoped>
/* .appbar {
  display: flex;
  justify-content: space-between;
} */
.cont {
  padding: 0;
}
.group {
  width: 500px;
  margin: auto;
  padding: 5px;
}
.toolbartitle {
  color: white;
  padding: 80px;
}
/* .btnalign {
  margin: right;
} */
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
.deletetitle {
  padding: 12px;
}
.displayPadding {
  padding: 50px;
}
.creategroupbtn {
  padding: 20px;
}
.grpsnackbar {
  display: flex;
}
</style>