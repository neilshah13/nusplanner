<template>
  <v-card>
    <v-container class='neweventcont'>
      <v-toolbar-title class="neweventtitle">
        <v-btn icon dark @click="closeDialog" x-small outlined class='neweventclose'> <!-- closing button -->
          <v-icon>mdi-close</v-icon>
        </v-btn>
     Type of Event:
      <v-menu>
        <template v-slot:activator="{ on }">
        <v-btn outlined color='white' v-on="on" class="btn">
          <span>{{ eventTypes[eventType] }}</span>
           <v-icon bottom>mdi-menu-down</v-icon>
          </v-btn>
          </template>
            <v-list>
              <v-list-item @click="eventType = 'event'">
                <v-list-item-title>Event</v-list-item-title>
              </v-list-item>
              <v-list-item @click="eventType = 'assignment'">
                <v-list-item-title>Assignment</v-list-item-title>
              </v-list-item>
              <v-list-item @click="eventType = 'groupMeeting'">
                <v-list-item-title>Group Meeting</v-list-item-title>
              </v-list-item>
            </v-list>
        </v-menu>
      </v-toolbar-title>
<!-- for events -->
      <v-form v-if="eventType == 'event'" @submit.prevent="submittedEvent" ref="form" class="neweventform">

      <v-card-text class='menu'> Module (Optional):
        <v-menu>
        <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="btn" @click="displayCurrentMod">
          <span>{{ module }}</span>
           <v-icon bottom>mdi-menu-down</v-icon>
          </v-btn>
          </template>
            <v-list>
              <v-list-item v-for = "mod in modules" v-bind:key="mod" @click="module = mod">
                <v-list-item-title> {{ mod }} </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </v-card-text>

        <v-text-field outlined prepend-icon="insert_emoticon" class= 'neweventfield' v-model="name" type="text" label="Event Name"></v-text-field>
        <v-text-field outlined prepend-icon="insert_emoticon" class= 'neweventfield' v-model="details" type="text" label="Details (e.g. Meet at Jurong East MRT)"></v-text-field>
        <!-- v-text-field outlined class= 'neweventfield' v-model="startdate" type="date" label="Start Date"></v-text-field> -->
        <!-- <v-text-field outlined class= 'neweventfield' v-model="enddate" type="date" label="End Date"></v-text-field> -->
        <!-- <v-text-field outlined class= 'neweventfield' v-model="starttime" type="time" label="(Optional) Start Time [hh:mm AM/PM] "></v-text-field> -->
        <!-- <v-text-field outlined class= 'neweventfield' v-model="endtime" type="time" label="(Optional) End Time [hh:mm AM/PM]"></v-text-field> -->
        
          <v-menu
            v-model="fromStartDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                class= 'neweventfield'
                label="Start Date"
                prepend-icon="event"
                readonly
                :value="startdate"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="en-in"
              v-model="startdate"
              @input="fromStartDateMenu = false"
            ></v-date-picker>
          </v-menu>
        
          <v-menu
            v-model="fromEndDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                class= 'neweventfield'
                label="End Date"
                prepend-icon="event"
                readonly
                :value="enddate"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="en-in"
              v-model="enddate"
              @input="fromEndDateMenu = false"
            ></v-date-picker>
          </v-menu>

          <v-menu
            v-model="fromStartTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            v-on:click="this.starttime = ''"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                class= 'neweventfield'
                label="Start Time (Optional)"
                prepend-icon="access_time"
                readonly
                :value="starttime"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              ampm-in-title=true
              v-model="starttime"
              full-width
            ></v-time-picker>
          </v-menu>
        
          <v-menu
            v-model="fromEndTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                class= 'neweventfield'
                label="End Time (Optional)"
                prepend-icon="access_time"
                readonly
                :value="endtime"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              ampm-in-title=true
              v-model="endtime"
              full-width
            ></v-time-picker>
          </v-menu>



        <div class='colorfieldtitle'>
          <div class="mr-4">
          Please choose a color:
          </div>

      <v-btn
        v-bind:color="this.color"
        dark
        @click.stop="dialog = true"
      >
        Color
      </v-btn>

      <v-dialog
        v-model="dialog"
        max-width="300"
      >
      <ColorPicker v-model = "color"> </ColorPicker>
            <v-btn
              v-bind:color="this.color"
              dark
              @click="dialog = false"
            >
              Choose
            </v-btn>
      </v-dialog>
            </div>
            <br>
            <br>
          <v-btn type="submit" color="primary" class="mr-4">Create Event</v-btn>
          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      </v-form>
<!-- for assignment -->
      <v-form v-else-if="eventType == 'assignment'" @submit.prevent="submittedAssignment" ref="form" class="neweventform">

        <v-card-text class='menu'> Module (Optional):
                <v-menu>
                <template v-slot:activator="{ on }">
                <v-btn v-on="on" class="btn" @click="displayCurrentMod">
                  <span>{{ module }}</span>
                  <v-icon bottom>mdi-menu-down</v-icon>
                  </v-btn>
                  </template>
                    <v-list>
                      <v-list-item v-for = "mod in modules" v-bind:key="mod" @click="module = mod">
                        <v-list-item-title> {{ mod }} </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
              </v-card-text>

        <v-text-field outlined class= 'neweventfield' prepend-icon="insert_emoticon" v-model="name" type="text" label="Assignment Name"></v-text-field>
        <v-text-field outlined class= 'neweventfield' prepend-icon="insert_emoticon" v-model="details" type="text" label="Details (e.g. Due 2359, submit in PDF format)"></v-text-field>
        <!-- <v-text-field outlined class= 'neweventfield' v-model="enddate" type="date" label="Due Date"></v-text-field> -->

          <v-menu
            v-model="fromEndDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                class= 'neweventfield'
                label="Due Date"
                prepend-icon="event"
                readonly
                :value="enddate"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="en-in"
              v-model="enddate"
              @input="fromEndDateMenu = false"
            ></v-date-picker>
          </v-menu>



          <div class='colorfieldtitle'>
          <div class="mr-4">
          Please choose a color:
          </div>
          <v-btn
            v-bind:color="this.color"
            dark
            @click.stop="dialog = true"
          >
            Color
          </v-btn>

          <v-dialog
            v-model="dialog"
            max-width="300"
          >
          <ColorPicker v-model = "color"> </ColorPicker>

                <v-btn
                  v-bind:color="this.color"
                  dark
                  @click="dialog = false"
                >
                  Choose
                </v-btn>
          </v-dialog>
            </div>
          <br>
          <br>
          <v-btn type="submit" color="primary" class="mr-4">Create Assignment</v-btn>
          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      </v-form>
<!-- for group meeting -->
      <v-form v-else-if="eventType== 'groupMeeting'" @submit.prevent="submittedGroupMeeting" ref="form" class="neweventform">

        <v-card-text class='menu'> Your Saved Groups:
        <v-menu>
        <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="btn" @click = "displayCurrentGroups">
          <span>{{ group }}</span>
           <v-icon bottom>mdi-menu-down</v-icon>
          </v-btn>
          </template>
            <v-list>
              <v-list-item v-for = "grp in groups" v-bind:key="grp" @click="group = grp">
                <v-list-item-title> {{ grp }} </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          </v-card-text>

        <v-text-field outlined prepend-icon="insert_emoticon" class= 'neweventfield' v-model="details" type="text" label="Details (e.g. Meet at Computing)"></v-text-field>
        <!-- <v-text-field outlined class= 'neweventfield' v-model="startdate" type="date" label="Date"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="starttime" type="time" label="(Optional) Start Time [hh:mm AM/PM]"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="endtime" type="time" label="(Optional) End Time [hh:mm AM/PM]"></v-text-field> -->

          <v-menu
            v-model="fromStartDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                class= 'neweventfield'
                label="Start Date"
                prepend-icon="event"
                readonly
                :value="startdate"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="en-in"
              v-model="startdate"
              @input="fromStartDateMenu = false"
            ></v-date-picker>
          </v-menu>

           <v-menu
            v-model="fromStartTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            v-on:click="this.starttime = ''"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                class= 'neweventfield'
                label="Start Time (Optional)"
                prepend-icon="access_time"
                readonly
                :value="starttime"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              ampm-in-title=true
              v-model="starttime"
              full-width
            ></v-time-picker>
          </v-menu>
        
          <v-menu
            v-model="fromEndTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                class= 'neweventfield'
                label="End Time (Optional)"
                prepend-icon="access_time"
                readonly
                :value="endtime"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              ampm-in-title=true
              v-model="endtime"
              full-width
            ></v-time-picker>
          </v-menu>


        <div class='colorfieldtitle'>
          <div class="mr-4">
          Please choose a color:
          </div>
            <v-btn
              v-bind:color="this.color"
              dark
              @click.stop="dialog = true"
            >
              Color
            </v-btn>

            <v-dialog
              v-model="dialog"
              max-width="300"
            >
            <ColorPicker v-model = "color"> </ColorPicker>

                  <v-btn
                    v-bind:color="this.color"
                    dark
                    @click="dialog = false"
                  >
                    Choose
                  </v-btn>
            </v-dialog>
            </div>
            <br>
            <br>
          <v-btn type="submit" color="primary" class="mr-4">Create Group Meeting</v-btn>
          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      </v-form>
<!-- For Event Failure -->
  <v-snackbar
    v-model="eventfalse"
  >
    You must enter Event name, Start, and End Date!
    <v-btn
      color="error"
      text
      @click="eventfalse = false"
    >
      Close
    </v-btn>
  </v-snackbar>

<!-- For Assignment Failure -->
  <v-snackbar
    v-model="assignmentfalse"
  >
    You must enter Assignment Name and Due Date!
    <v-btn
      color="error"
      text
      @click="assignmentfalse = false"
    >
      Close
    </v-btn>
  </v-snackbar>

<!-- For Group Meeting Failure -->
  <v-snackbar
    v-model="grpmeetingfalse"
  >
    You must choose a Group, and enter the Start Date!
    <v-btn
      color="error"
      text
      @click="grpmeetingfalse = false"
    >
      Close
    </v-btn>
  </v-snackbar>

    <br>
    <!-- <v-btn type="submit" color="primary" class="mr-4" @click.stop="submittedEvent">Create Event</v-btn>
    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn> -->
    </v-container>
  </v-card>
</template>

<script>
import ColorPicker from 'vue-color-picker-wheel';
import firebase from "firebase";

export default {
    components:{
        ColorPicker
    },
    data: () => ({
      fromEndDateMenu: false,
      fromStartDateMenu: false,
      fromEndTimeMenu: false,
      FromStartTimeMenu: false,
      fromDateVal: null,
      groupMembers: false,
      grpsnack: false,
      dialog: false,
      today: new Date().toISOString().substr(0, 10),
      focus: '',
      color: '#1976D2', // default event color
      colors: ['#1976D2', 'red', 'pink', 'cyan', 'orange', 'indigo', 'purple'],
      startdate: null,
      enddate: null,
      starttime: '',
      endtime: '',
      snackbar: false,
      eventfalse: false,
      assignmentfalse: false,
      grpmeetingfalse: false,
      details: '',
      name: '',
      eventType: 'event', //default
      group: 'Select Group',
      groupids: [],
      groups: [],
      groupmods: [],
      modules: [],
      module: 'Select Module',
      eventTypes: {
        assignment: 'Assignment',
        event: 'Event',
        groupMeeting: 'Group Meeting',
      },
    }),
    computed: {
      fromDateDisp() {
              return this.fromDateVal;
              // format date, apply validations, etc. Example below.
              // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
            }
    },
    methods: {
    async displayCurrentMod() {
      //retrieve and display existing modules from user's module list
      await firebase.auth().onAuthStateChanged(user => {
        //console.log(user)
        let currentmod = [];
        firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then(function(doc) {
          var user_modules = doc.data().module_list;
          //console.log(user_modules);
          for (let i in user_modules) {
            var mod = user_modules[i];
            //console.log(mod);
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
          currentmod.push('Select Module')
        });
      this.modules = currentmod;
      //console.log(this.modules);
      });
    },
    async displayCurrentGroups() {
      //retrieve and display existing modules from user's module list
      await firebase.auth().onAuthStateChanged(user => {
        let currentgroups = [];
        let user_groups = [];
        let grpids = [];
        let modids = []
        firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then(function(doc) {
          user_groups = doc.data().group_list;
          for (let i in user_groups) {
            var group = user_groups[i]
            if (group != "") {
              grpids.push(group);
              firebase
                .firestore()
                .collection("group")
                .doc(group)
                .get()
                .then(function(doc) {
                  var groupname = doc.data().name + " (" + doc.data().module_id + ")";
                  modids.push(doc.data().module_id)
                  currentgroups.push(groupname);
                });
             }
          }
        });
      this.groupids = grpids;
      this.groupmods = modids;
      this.groups = currentgroups;
      });
    },
      updateGrp() {
        this.groupMembers = false;
      },
      updateSnackGrp() {
        this.grpsnack = true;
      },
      closeDialog() {
        this.$emit('update-dialog')
      },
      reset() {
        this.$refs.form.reset();
        this.startdate = ""
        this.enddate = ""
        this.starttime = ""
        this.endtime = ""
        this.module = "Select Module"
        this.group = "Select Group"
      },
      submittedEvent() {
        if (this.name && this.startdate && this.enddate) {  //somewhere here
          this.$emit('update-dialog')
          this.$emit('update-eventsnack')
        } else {
          this.eventfalse = true
        }
        this.addEvent()
        this.$emit('getEventsfromDatabase') //calls the getEvent from Weekly.vue to update the calendar
      },
      submittedAssignment() {
        //console.log(this.name && this.enddate)
        if (this.name && this.enddate) { //Takes in as long as there is a date
          this.$emit('update-dialog')
          this.$emit('update-eventsnack')
        } else {
          this.assignmentfalse = true
        }
        this.addAssignment()
        this.$emit('getEventsfromDatabase') //calls the getEvent from Weekly.vue to update the calendar
      },
      async submittedGroupMeeting() {
        if (this.startdate && this.group != "Select Group") {
          this.$emit('update-dialog')
          this.$emit('update-eventsnack')
        } else {
          this.grpmeetingfalse = true
        }
        //add if condition once done to make sure "event successfully added" is not shown when event not actually created (requirements not satisfied)
        await this.addGroupMeeting()
        this.$emit('getEventsfromDatabase') //calls the getEvent from Weekly.vue to update the calendar
      },
      async pushEventintoUsersFirebase(id) {
        var user = firebase.auth().currentUser;
        var uid = user.uid
        var eventlist;
        await firebase.firestore().collection('users').doc(uid).get().then(function(doc) {
            eventlist = doc.data().event_list
            eventlist.push(id)
            eventlist = eventlist.filter(item => item)
            //console.log(eventlist)
            firebase.firestore().collection('users').doc(uid).update({event_list:eventlist})
        })
        //console.log("Added event into user's event_list!")
        this.name = '',
        this.details = '',
        this.startdate = '',
        this.enddate = '',
        this.starttime = '',
        this.endtime = '',
        this.group = 'Select Group',
        this.module = 'Select Module',
        this.color= '#1976D2' // default event color
      },
      async addEvent () {
        //console.log(this.starttime)
        if (this.name && this.startdate && this.enddate) { //Takes in as long as there is a date
          if (this.starttime != ''){ //If there is time input, then we input both date and time into database
            var startinput = this.startdate.concat(" ".concat(this.starttime))
            var endinput = this.enddate.concat(" ".concat(this.endtime))
          } else { //if no time input, we just input date into database
            startinput = this.startdate
            endinput = this.enddate
          }
          var user = firebase.auth().currentUser;
          var eventAdded = await firebase.firestore().collection('event').add({
            name: this.name,
            details: this.details,
            startdate:this.startdate,
            enddate:this.enddate,
            starttime: this.starttime,
            endtime:this.endtime,
            start: startinput,
            end: endinput,
            color: this.color,
            global: false,
            group_id: "", //change this
            module_id: this.module, //change this
            type: 1, //1 == Event
            uid: user.uid,
          })
        this.pushEventintoUsersFirebase(eventAdded.id);
        }
      },
          async addAssignment () {
            var startinput;
            var endinput;
            if (this.name && this.enddate) { //Takes in as long as there is a date
                startinput = this.enddate
                endinput = this.enddate
              var user = firebase.auth().currentUser;
              var eventAdded = await firebase.firestore().collection('event').add({
                name: this.name,
                details: this.details,
                startdate:this.enddate,
                enddate:this.enddate,
                starttime: this.starttime,
                endtime:this.endtime,
                start: startinput,
                end: endinput,
                color: this.color,
                global: false,
                group_id: "", //change this
                module_id: this.module, //change this
                type: 2, //2 == Assignment
                uid: user.uid, 
              })
              this.pushEventintoUsersFirebase(eventAdded.id);
            }
          },
          async addGroupMeeting () { //must put in all members event_list
            if (this.group != "Select Group" && this.startdate) { //Takes in as long as there is group and date
              if (this.starttime != ''){ //If there is time input, then we input both date and time into database
                var startinput = this.startdate.concat(" ".concat(this.starttime))
                var endinput = this.startdate.concat(" ".concat(this.endtime))
              } else { //if no time input, we just input date into database
                startinput = this.startdate
                endinput = this.startdate
              }
              let index = this.groups.indexOf(this.group)
              var groupid = this.groupids[index]
              var modid = this.groupmods[index]
              var userlist = []
              //console.log(groupid)
              await firebase.firestore().collection('group').doc(groupid).get().then(function(doc) {
                userlist = doc.data().user_list
              })
              for (let i in userlist) {
                //console.log("user is " + userlist[i])
                var eventAdded = await firebase.firestore().collection('event').add({ //update event collection
                  name: this.group + " Meeting",
                  details: this.details,
                  startdate:this.startdate,
                  enddate:this.startdate,
                  starttime: this.starttime,
                  endtime: this.endtime,
                  start: startinput,
                  end: endinput,
                  color: this.color,
                  global: false,
                  group_id: this.group,
                  module_id: modid,
                  type: 3,
                  uid: userlist[i], 
                })
                var eventlist;
                firebase.firestore().collection('users').doc(userlist[i]).get().then(function(doc) { //update user collection
                  eventlist = doc.data().event_list
                  eventlist.push(eventAdded.id)
                  eventlist = eventlist.filter(item => item)
                  //console.log(eventlist)
                  firebase.firestore().collection('users').doc(userlist[i]).update({event_list:eventlist})
                })
               }
                this.group = 'Select Group',
                this.details = '',
                this.startdate = '',
                this.starttime = '',
                this.endtime = '',
                this.color= '#1976D2' // default event color
             }

           },
    }
    // model: {
    //   prop: 'dialog',
    //   event: 'change'
    // },
    // props: {
    //   dialog: Boolean
    // }
}
</script>

<style scoped>
.neweventtitle{
  background: rgb(35, 90, 209);
  min-height: 50px;
  color: white;
  padding:10px;
}
.neweventcont {
  position: relative;
}
.neweventclose {
  float: left;
}
.neweventfield {
  transform: scale(0.75);
}
.neweventform {
  display: block;
}
.colorfieldtitle {
  display:inline-flex;
  transform: scale(0.95);
}
.btn {
  transform: scale(0.85);
}
</style>