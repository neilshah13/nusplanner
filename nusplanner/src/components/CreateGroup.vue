<template>
  <v-card color="blue-grey" >
    <v-card-title primary-title class="justify-center">
      <v-row>
      <!-- <v-row align = "left"> -->
        <v-btn class='btn' icon dark @click="closeGroupMembers" color="warning" outlined> <!-- closing button -->
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-card-title>

      <!-- Form start here ******************************-->
      <div id="app">
    <v-card
      color="blue-grey darken-1"
      dark
      :loading="isUpdating"
    >
      <v-img
        height="200"
        src="../..//public/teamwork.jpg"
      >
        <v-row>
          <v-col
            class="text-right"
            cols="12"
          >
            <v-menu
              bottom
              left
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  v-on="on"
                >
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
            </v-menu>
          </v-col>
          <v-row
            class="pa-4"
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <h3 class="headline">{{ name }}</h3>
            </v-col>
          </v-row>
        </v-row>
      </v-img>
      <v-form ref='form'>
        <v-container>
          <v-row>
              <v-card-text class='menu' > Choose Module :
      <v-menu>
        <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="btn" @click="getMods">
          <span>{{ module }}</span>
           <v-icon bottom>mdi-menu-down</v-icon>
          </v-btn>
          </template>
            <v-list>
              <v-list-item v-for="mod in modules" :key="mod" @click="module=mod">
                <v-list-item-title>
                  {{ mod }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
      </v-menu>
    </v-card-text>

            <v-col
              cols="12"
            >
              <v-text-field
                class="groupname"
                v-model= "grpName"
                :disabled="isUpdating"
                outlined
                color="blue-grey lighten-2"
                label="Group Name"
                light
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                class = "groupmembers"
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
              >
                <template v-slot:selection="data"
                >
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
      <v-btn type="submit" color="primary" class="mr-4" @click.stop="addGroups">Save</v-btn>
      <v-btn color="error" @click="reset">Reset</v-btn>
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
    module: '',
    text: "Select Group Members",
    snackbar: false,
    name: 'Teamwork Makes the Dream Work!',
    usernames: [],
    users: [],
    modules: [],
  }),
  methods: {
    closeGroupMembers() {
      this.$emit('update-grp')
    },
    reset() {
      this.$refs.form.reset();
    },
    indexWhere: function(array, conditionFn) {
      const item = array.find(conditionFn)
      return array.indexOf(item)
    },
    async getMods() {
      this.modules = []
      let moddb = await firebase.firestore().collection('module').get()
      moddb.forEach(doc => {
        this.modules.push(doc.data().module_code)
      })
    },
    async getUsers() {
      let users= []
      let usernames = []
      let userdb = await firebase.firestore().collection('users').get()
      userdb.forEach(doc => {
        let user= {name: "", id: ""}
        user.name = doc.data().name
        user.id = doc.id
        users.push(user)
        usernames.push(user.name)
      })
      this.users = users
      this.usernames = usernames
    },
    addUser(username) { // find from array of name and id
      let user = username
      if (username.length > 1) {
        user = username[username.length - 1]
      }
// let index = this.usernames.indexOf(username)
      const index = this.indexWhere(this.users, item => item.name == user)
      let userid = this.users[index].id
      this.members.push(userid)
    },
    remove (username) { // find from array of name and id
      let membername = this.membernames.indexOf(username)
      this.membernames.splice(membername, 1);
// let member = this.members.indexOf(this.users[index].id)
      this.members.splice(membername, 1);
    },
    async addGroups() {
      console.log("saved")
      this.$emit('update-grpsnack')
      this.$emit('update-grp')
      //add to group collection
      var groupadded = await firebase.firestore().collection('group').add({
        name: this.grpName,
        module_id: this.module,
        user_list: this.members, // list of uids
      })
      //add to user collection's group_list
      for(var i=0; i < this.members.length; i++) {
        let uid = this.members[i]
        firebase.firestore().collection('users').doc(uid).get().then(function(doc) {
            let grplist = doc.data().group_list
            grplist.push(groupadded.id)
            grplist = grplist.filter(item => item)
            firebase.firestore().collection('users').doc(uid).update({group_list: grplist})
        })
      }
      //clear out inputs after a submission
      this.grpName = "";
      this.members = "";
      this.module = "";
    },
  },
  watch: {
    isUpdating (val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
  },
  async beforeMount() {
      var current = firebase.auth().currentUser;
      let userid = current.uid
      this.members.push(current.uid)
      var username
      await firebase.firestore().collection('users').doc(userid).get().then(function(doc) {
        username = doc.data().name
      })
      this.membernames.push(username)
  }
}
</script>

<style scoped>
  .groupname >>> .v-text-field__slot input {
    color: black;
  }
  .btn {
  transform: scale(0.75);
}
</style>