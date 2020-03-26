<template>
  <v-container class="cont">
    <v-app-bar dark>
        <v-toolbar-title>Groups Created</v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <!-- <v-col v-for="(group, i) in groups" :key="i" cols="12"> -->
        <v-col v-for="group in groups" :key="group" cols="12">
          <!-- <v-card :color="color[i]" dark> -->
          <v-card dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline" v-text="group.name"></v-card-title>
                <v-card-subtitle v-text="group.module_id" align="left"></v-card-subtitle>
                <v-card-text v-text="group.user_list" align="left"></v-card-text>
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

  export default {
    data: () => ({
      groups: [],
      colors: ['#1F7087', '#952175']
      // groups: [
      //   {
      //     color: '#1F7087',
      //     name: 'Team Work',
      //     module: 'BT3103',
      //     members: 'Neil, Gerald, Weisheng, Carine, Kohmin, Xuehui'
      //   },
      //   {
      //     color: '#952175',
      //     name: 'Team Hustle',
      //     module: 'IS3103',
      //     members: 'Shah, Tan, Chang, Tan, Koh, Tan'
      //   },
      // ],
    }),
    methods: {
      async getGroups() {
          let snapshot = await firebase.firestore().collection('group').get()
          let groups = []
          snapshot.forEach(doc => {
            let groupInfo = doc.data()
            groupInfo.id = doc.id
            groups.push(groupInfo)
            console.log(groups)
          })
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