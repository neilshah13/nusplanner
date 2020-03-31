<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
          <!-- add groupMembers -->
          <v-btn color="primary" dark @click.stop="groupMembers = true" class="mr-4">
            Add Group Members
          </v-btn>
      </v-col>
      <v-col>
          <!-- add event -->
          <v-btn color="primary" dark @click.stop="dialog = true">
            New Event
          </v-btn>
      </v-col>
      <v-col>
        <v-btn outlined class="mr-4" color="grey darken-2" @click="viewDay">
            Today
          </v-btn>
      </v-col>
      <v-col>
<!-- to pick the month/week/day view -->
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <!--
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
              -->
            </v-list>
          </v-menu>
      </v-col>
  </v-row>

      <v-row justify="center" no-gutters>
      <v-col md="auto">
<!-- prev week -->
        <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon text small>mdi-chevron-left</v-icon>
        </v-btn>
<!-- title -->{{ title }}
<!-- next week -->
        <v-btn fab text small color="grey darken-2" @click="next"> <!-- class mr-4 means to have a margin-->
            <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

<!-- add GroupMembers dialog -->
<v-dialog v-model="groupMembers" max-width="550">
<creategroup @update-grp='updateGrp' @update-grpsnack='updateSnackGrp'></creategroup>
</v-dialog>
  <v-snackbar
    v-model="grpsnack"
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

<!-- add event dialog -->
<v-dialog v-model="dialog" max-width="550">
  <createvent @update-dialog='updateDialog' @update-eventsnack='updateSnackEvent'  @getEventsfromDatabase ='getEvents'></createvent>
</v-dialog>
  <v-snackbar
    v-model="eventsnack"
  >
    Event successfully created! 
    <v-btn
      color="error"
      text
      @click="eventsnack = false"
    >
      Close
    </v-btn>
  </v-snackbar>

<!-- calendar -->
<v-row no-gutters>
  <v-col>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          dark: true
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-container></v-container>
<!-- popup after clicking on event -->
        <v-menu
        class="menu"
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement">
          <v-card color="grey lighten-4" flat>
            <v-toolbar class="menu" :color="selectedEvent.color" dark>
              <textarea
                v-model= "selectedEvent.name"
                class='txtarea'
                type="text"
                placeholder="Add a title">
                </textarea>
              <v-btn icon v-if="currentlyEditing !== selectedEvent.id"
                @click.prevent="editEvent(selectedEvent)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn text v-else @click="onClickSave(selectedEvent)">Save</v-btn>
              <v-btn icon @click="deleteEvent(selectedEvent)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-form v-if="currentlyEditing !== selectedEvent.id"> {{ selectedEvent.details }}</v-form>
              <v-form v-else>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.name" type="text" label="name"></v-text-field>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.details" type="text" label="Details (e.g. Meet at Jurong East MRT)"></v-text-field>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.startdate" type="date" label="Start Date"></v-text-field>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.enddate" type="date" label="End Date"></v-text-field>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.starttime" type="time" label="Start Time (Optional)"></v-text-field>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.endtime" type="time" label="End Time (Optional)"></v-text-field>
                <div class='colorfieldtitle'>
                <div class="mr-4">
                Please choose a color:
                </div>
                      <swatches
                      v-model="selectedEvent.color"
                      :colors="colors"
                      row-length="6"
                      shapes="circles"
                      show-border
                      popover-to="left"
                    ></swatches>
                  </div>
                 <!-- (old one) <textarea-autosize
                  v-model="selectedEvent.details"
                  class = "txtarea"
                  type="text"
                  placeholder="Add some notes"
                ></textarea-autosize> -->
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false, currentlyEditing= null">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import firebase from "firebase";
import CreateEvent from "./CreateEvent.vue"
import CreateGroup from "./CreateGroup.vue"
import Swatches from 'vue-swatches'

export default {
        components:{
        createvent: CreateEvent,
        creategroup: CreateGroup,
        swatches: Swatches
      },
    data: () => ({
      today: new Date().toISOString().substr(0, 10),
      focus: '',
      type: 'month', //default
      eventType: 'event', //default
      color: '#1976D2', // default event color
      colors: ['red', 'pink', 'cyan', 'orange', 'indigo', 'purple'],
      start: null,
      end: null,
      currentlyEditing: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      dialog: false, // for adding event
      groupMembers: false, // for adding groups
      eventsnack: false, // snackbar for added events
      grpsnack: false, // snackbar for added groups
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
      },
      eventTypes: {
        assignment: 'Assignment',
        event: 'Event',
        groupMeeting: 'Group Meeting',
      },
      events: [],
    }),
    mounted () {
      this.getEvents()
    },
    created() {
      this.getEvents()
    },
    computed: {
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }
        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth
        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear
        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)
        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return ` ${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      }
    },
    methods: {
      updateDialog() {
        this.dialog = false;
      },
      updateGrp() {
        this.groupMembers = false;
      },
      updateSnackEvent() {
        this.eventsnack = true;
      },
      updateSnackGrp() {
        this.grpsnack = true;
      },
      viewDay({ date }) {
        this.focus = date;
        this.type = "day"; // by default is month
      },
      reset() {
        this.$refs.form.reset();
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }
        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      }, onClickSave(ev) {
        this.updateEvent(ev)
        this.selectedOpen = false
        this.currentlyEditing= null
      },
      editEvent(ev) {
        this.currentlyEditing = ev.id;
      },
      getEventColor(event) {
        return event.color;
      },
      next() {
        this.$refs.calendar.next();
      },
      prev() {
        this.$refs.calendar.prev();
      },
      nth(d) {
      //so you can show 1st, 2nd, 3rd, 4th
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
      },
      updateRange ({ start, end }) {
        this.start = start
        this.end = end
      },
      formatDate (a, withTime) {
        return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
      },

      async getEvents () {
      let snapshot = await firebase.firestore().collection('event').get()
      let events = []
      snapshot.forEach(doc => {
        //console.log(doc.data())
        let appData = doc.data()
        appData.id = doc.id
        events.push(appData)
      })
      this.events = events
      },
      
      /* addEvent() function moved to CreatEvent.vue */

        
        async updateEvent (ev) {
          console.log("just after event called")
          if (ev.starttime != ''){ //If there is time input, then we input both date and time into database
            var startinput = ev.startdate.concat(" ".concat(ev.starttime))
            var endinput = ev.enddate.concat(" ".concat(ev.endtime))
          } else { //if no time input, we just input date into database
            startinput = ev.startdate
            endinput = ev.enddate
          }
          await firebase.firestore().collection('event').doc(this.currentlyEditing).update({
            name: ev.name,
            details: ev.details,
            startdate: ev.startdate,
            enddate: ev.enddate,
            starttime: ev.starttime,
            endtime: ev.endtime,
            start: startinput,
            end: endinput,
            color: ev.color

          })
          this.selectedOpen = false
          this.currentlyEditing = null
          console.log("before this.getEvents()")
          this.getEvents()
        },
        
        async deleteEvent (ev) {
          var user = firebase.auth().currentUser;
          var eventlist;
          await firebase.firestore().collection('event').doc(ev.id).delete();
          firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
          eventlist = doc.data().event_list
          var index = eventlist.indexOf(ev.id);
          if (index !== -1) eventlist.splice(index, 1); //removing event from users' event_list
          eventlist = eventlist.filter(item => item)
          console.log(eventlist)
          firebase.firestore().collection('users').doc(user.uid).update({event_list:eventlist})
      }) 
          this.selectedOpen = false
          this.getEvents()
        },
      },
    }
</script>

<style scoped>
.calendar {
  margin: auto;
  max-height: 600px;
  max-width: 900px;
  position: relative;
  background-color: rgb(48, 57, 105);
  transform: scale(0.75);
  min-width: 500px;
  float: center;
/*  flex-direction: row;*/
}
.txtarea {
  font-size: 13px;
  margin: auto;
  padding:12px;
}
.txt{
  font-size: 13px;
}
.menu {
  font-size: 15px;
}
</style>