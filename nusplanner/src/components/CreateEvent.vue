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

      <v-form v-if="eventType == 'event'" @submit.prevent="addEvent" ref="form" class="neweventform">
        <v-text-field outlined class= 'neweventfield' v-model="name" type="text" label="Event Name"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="details" type="text" label="Details (e.g. Meet at Jurong East MRT)"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="startdate" type="date" label="Start Date"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="enddate" type="date" label="End Date"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="starttime" type="time" label="Start Time (Optional)"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="endtime" type="time" label="End Time (Optional)"></v-text-field>
                <div class='colorfieldtitle'>
          <div class="mr-4">
          Please choose a color:
          </div>
                <swatches
                v-model="color"

                :colors="colors"

                row-length="6"
                shapes="circles"
                show-border
                popover-to="left"
              ></swatches>
            </div>
      </v-form>
      <v-form v-else-if="eventType == 'assignment'" @submit.prevent="addEvent" ref="form" class="neweventform">
        <v-text-field outlined class= 'neweventfield' v-model="name" type="text" label="Assignment Name"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="details" type="text" label="Details (e.g. Due 2359, submit in PDF format)"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="start" type="date" label="Due Date"></v-text-field>
                <div class='colorfieldtitle'>
          <div class="mr-4">
          Please choose a color:
          </div>
                <swatches
                v-model="color"

                :colors="colors"

                row-length="6"
                shapes="circles"
                show-border
                popover-to="left"
              ></swatches>
            </div>
      </v-form>
      <v-form v-else-if="eventType== 'groupMeeting'" @submit.prevent="addEvent" ref="form" class="neweventform">
        <v-card-text class='menu'> Saved Group Name:
        <v-menu>
        <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="btn">
          <span>{{ groups[group] }}</span>
           <v-icon bottom>mdi-menu-down</v-icon>
          </v-btn>
          </template>
            <v-list>
              <v-list-item @click="group='teamwork'">
                <v-list-item-title>Team Work (BT3103)</v-list-item-title>
              </v-list-item>
              <v-list-item @click="group='teamhustle'">
                <v-list-item-title>Team Hustle (IS3103)</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-card-text class='txt'>Haven't saved a group name? Add it <a href='https://google.com'>here</a>!</v-card-text>
          </v-card-text>
        <v-text-field outlined class= 'neweventfield' v-model="details" type="text" label="Details (e.g. Meet at Computing)"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="start" type="date" label="Date"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="start" type="time" label="Start Time"></v-text-field>
        <v-text-field outlined class= 'neweventfield' v-model="end" type="time" label="End Time"></v-text-field>
        <div class='colorfieldtitle'>
          <div class="mr-4">
          Please choose a color:
          </div>
                <swatches
                v-model="color"

                :colors="colors"

                row-length="6"
                shapes="circles"
                show-border
                popover-to="left"
              ></swatches>
            </div>
      </v-form>
    <br>
    <v-btn type="submit" color="primary" class="mr-4" @click.stop="submittedEvent">Create Event</v-btn>
    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-container>
  </v-card>
</template>

<script>
import firebase from "firebase";
import Swatches from 'vue-swatches'
export default {
    components:{
        Swatches,
    },
    data: () => ({
      today: new Date().toISOString().substr(0, 10),
      focus: '',
      color: '#1976D2', // default event color
      colors: ['#1976D2', 'red', 'pink', 'cyan', 'orange', 'indigo', 'purple'],
      startdate: null,
      enddate: null,
      starttime: '',
      endtime: '',
      snackbar: false,
      details: '',
      name: '',
      eventType: 'event', //default
      group: 'teamwork',

      eventTypes: {
        assignment: 'Assignment',
        event: 'Event',
        groupMeeting: 'Group Meeting',
      },
      groups: {
        teamwork: 'Team Work (BT3103)',
        teamhustle: 'Team Hustle (IS3103)',
      },
    }),
    methods: {
      closeDialog() {
        this.$emit('update-dialog')
      },
      reset() {
        this.$refs.form.reset();
      },
      submittedEvent() {
        this.$emit('update-eventsnack')
        this.$emit('update-dialog')
        this.addEvent()
        this.$emit('getEventsfromDatabase') //calls the getEvent from Weekly.vue to update the calendar
      },
       async addEvent () {
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
            group_id: "fofcnxjlqwf", //change this
            module_id: "jowfnflasdf", //change this
            type: 1, //change this(?)
            uid: user.uid, //change this
          })
          console.log("before adding into user eventlist")
          var eventlist;
          firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
              eventlist = doc.data().event_list
              eventlist.push(eventAdded.id)
              //eventlist = eventlist.filter(item => item)
              console.log(eventlist)
              firebase.firestore().collection('users').doc(user.uid).update({event_list:eventlist})
          }) //.update({event_list:eventAdded.id})
          console.log("after adding into user eventlist")
          this.name = '',
          this.details = '',
          this.startdate = '',
          this.enddate = '',
          this.starttime = '',
          this.endtime = ''
        } else {
          alert('You must enter event name, start, and end time')
        }
        },
    },
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
  transform: scale(0.80);
}
.btn {
  transform: scale(0.75);
}
</style>