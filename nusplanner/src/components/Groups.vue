<template>
  <v-container class="cont">
    <v-app-bar dark>
        <v-toolbar-title>Groups Created</v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col v-for="(group, i) in groups" :key="i" cols="12">
          <v-card :color="colors[i]" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline" v-text="group.name"></v-card-title>
                <v-card-subtitle v-text="group.module_id" align="left"></v-card-subtitle>
                <v-card-text align="left">
                  {{ arrange(group.usernames) }}
                </v-card-text>
              </div>
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
    },
    created() {
      this.getGroups();
    },
    mounted() {
      this.getGroups();
    }
  }
</script>

<style scoped>
.cont {
    width: 50%;
}
</style>