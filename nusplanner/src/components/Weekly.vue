<template>
  <v-row no-gutters>
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <!-- add groupMembers -->
          <v-btn color="primary" dark @click.stop="groupMembers = true">
            Add Group Members
          </v-btn>
          <!-- add event -->
          <v-btn color="primary" dark @click.stop="dialog = true">
            New Event
          </v-btn>
<!-- prev week -->
        <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon text small>mdi-chevron-left</v-icon>
        </v-btn>
<!-- title -->{{ title }}
<!-- next week -->
        <v-btn fab text small color="grey darken-2" @click="next"> <!-- class mr-4 means to have a margin-->
            <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn outlined class="mr-4" color="grey darken-2" @click="viewDay">
            Today
          </v-btn>
<!-- to pick the month/week/day view -->
          <div class="flex-grow-1"></div>
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
        </v-toolbar>
      </v-sheet>

<!-- add GroupMembers dialog -->
<v-dialog v-model="groupMembers" fullscreen max-width="550">

  <v-card>
    <v-card-title primary-title class="justify-center"> 
      <v-row align = "left">
      <v-btn icon dark @click="groupMembers = false" color="warning" outlined> <!-- closing button -->
        <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-card-title>

    <v-card-text class='menu'> Choose Module :
      <v-menu>
        <template v-slot:activator="{ on }">
        <v-btn outlined color='grey darken-2' v-on="on" class="btn">
          <span>{{ modules[module] }}</span>
           <v-icon bottom>mdi-menu-down</v-icon>
          </v-btn>
          </template>
            <v-list>
              <v-list-item @click="module='module1'">
                <v-list-item-title>BT1101</v-list-item-title>
              </v-list-item>
              <v-list-item @click="module='module2'">
                <v-list-item-title>BT2101</v-list-item-title>
              </v-list-item>
              <v-list-item @click="module='module3'">
                <v-list-item-title>BT2102</v-list-item-title>
              </v-list-item>
              <v-list-item @click="module='module4'">
                <v-list-item-title>BT3102</v-list-item-title>
              </v-list-item>
              <v-list-item @click="module='module5'">
                <v-list-item-title>BT3103</v-list-item-title>
              </v-list-item>
              <v-list-item @click="module='module6'">
                <v-list-item-title>IS3103</v-list-item-title>
              </v-list-item>
            </v-list>
      </v-menu>
    </v-card-text>
    <Form></Form>
    </v-card>
</v-dialog>

<!-- add event dialog -->
<v-dialog v-model="dialog" max-width="550">
  <v-card>
    <v-container>
      <v-toolbar-title class="cont">
        <v-btn icon dark @click="dialog = false" color="white" x-small outlined> <!-- closing button -->
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

      <v-form v-if="eventType == 'event'" @submit.prevent="addEvent" ref="form">
        <v-text-field class= 'field' v-model="name" type="text" label="Event Name"></v-text-field>
        <v-text-field class= 'field' v-model="details" type="text" label="Details (e.g. Meet at Jurong East MRT)"></v-text-field>
        <v-text-field class= 'field' v-model="start" type="date" label="Start Date"></v-text-field>
        <v-text-field class= 'field' v-model="end" type="date" label="End Date"></v-text-field>
        <v-text-field class= 'field' v-model="start" type="time" label="Start Time"></v-text-field>
        <v-text-field class= 'field' v-model="end" type="time" label="End Time"></v-text-field>
        <v-text-field class= 'field' v-model="color" type="color" label="Color (Click to open color menu)"></v-text-field>
      </v-form>
      <v-form v-else-if="eventType == 'assignment'" @submit.prevent="addEvent" ref="form">
        <v-text-field class= 'field' v-model="name" type="text" label="Assignment Name"></v-text-field>
        <v-text-field class= 'field' v-model="details" type="text" label="Details (e.g. Due 2359, submit in PDF format)"></v-text-field>
        <v-text-field class= 'field' v-model="start" type="date" label="Due Date"></v-text-field>
        <v-text-field class= 'field' v-model="color" type="color" label="Color (Click to open color menu)"></v-text-field>
      </v-form>
      <v-form v-else-if="eventType== 'groupMeeting'" @submit.prevent="addEvent" ref="form">
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
        <v-text-field class= 'field' v-model="details" type="text" label="Details (e.g. Meet at Computing)"></v-text-field>
        <v-text-field class= 'field' v-model="start" type="date" label="Date"></v-text-field>
        <v-text-field class= 'field' v-model="start" type="time" label="Start Time"></v-text-field>
        <v-text-field class= 'field' v-model="end" type="time" label="End Time"></v-text-field>
        <v-text-field class= 'field' v-model="color" type="color" label="Color (Click to open color menu)"></v-text-field>
      </v-form>
    <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog=false">Create Event</v-btn>
    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-container>
  </v-card>
</v-dialog>

<!-- calendar -->
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
              <v-btn text v-else @click="selectedOpen= false, currentlyEditing= null">Save</v-btn>
              <v-btn icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id"> {{ selectedEvent.details }} </form>
              <form v-else>
                <textarea-autosize
                  v-model="selectedEvent.details"
                  class = "txtarea"
                  type="text"
                  placeholder="Add some notes"
                ></textarea-autosize>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false, currentlyEditing= null">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import Form from "./Form.vue"
export default {
        components:{
        Form,
      },
    data: () => ({
      today: new Date().toISOString().substr(0, 10),
      focus: '',
      type: 'month', //default
      eventType: 'event', //default
      color: '#1976D2', // default event color
      start: null,
      end: null,
      currentlyEditing: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      dialog: false, // for adding event
      groupMembers: false,
      group: 'teamwork',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
      },
      modules: {
        module1: 'BT1101',
        module2: 'BT2101',
        module3: 'BT2102',
        module4: 'BT3102',
        module5: 'BT3103',
        module6: 'IS3103'
      },
      eventTypes: {
        assignment: 'Assignment',
        event: 'Event',
        groupMeeting: 'Group Meeting',
      },
      groups: {
        teamwork: 'Team Work (BT3103)',
        teamhustle: 'Team Hustle (IS3103)',
      },
      events: [
        {
          name: 'IS4241 Meeting',
          details: 'At tembu',
          start: '2020-02-25 09:00',
          end: '2020-02-25 15:00',
          color: 'orange',
        },
        {
          name: 'Computing Career Fair',
          details: 'Outside SR1',
          start: '2020-02-24 12:00',
          end: '2020-02-24 17:00',
          color: 'cyan',
        },
        {
          name: 'IS3103 Essay due',
          details: 'Submit in pdf format, word count 1000',
          start: '2020-02-24',
          color: 'pink',
        },
        {
          name: 'BT3103 Prototype Due',
          details: 'A+?? :)',
          start: '2020-03-02',
          color: 'red',
        },
        {
          name: 'BT3103 Group Meeting',
          details: 'Just do work',
          start: '2020-02-26 12:00',
          end: '2020-02-26 17:00',
          color: 'pink',
        },
        {
          name: 'CS1231 Midterms',
          details: 'At computing SR1',
          start: '2020-02-29 10:00',
          end: '2020-02-29 12:00',
          color: 'purple',
        },
        {
          name: 'BT3102 Midterms',
          details: 'Due 1800, submit .csv file',
          start: '2020-02-28',
          color: 'indigo',
        },
      ],
    }),
    mounted () {
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
      /*async getEvents () {
      let snapshot = await db.collection('calEvent').get()
      const events = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        events.push(appData)
      })
      this.events = events
      },*/
      /*
      async addEvent () {
        if (this.name && this.start && this.end) {
          await db.collection('calEvent').add({
            name: this.name,
            details: this.details,
            start: this.start,
            end: this.end,
            color: this.color
          })
          this.getEvents()
          this.name = '',
          this.details = '',
          this.start = '',
          this.end = '',
          this.color = ''
        } else {
          alert('You must enter event name, start, and end time')
        }
        },*/
        /*
        async updateEvent (ev) {
          await db.collection('calEvent').doc(this.currentlyEditing).update({
            details: ev.details
          })
          this.selectedOpen = false
          this.currentlyEditing = null
          this.getEvents()
        },
        async deleteEvent (ev) {
          await db.collection('calEvent').doc(ev).delete()
          this.selectedOpen = false
          this.getEvents()
        },*/
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
.toolbar {
  margin: auto;
}
.cont{
  background: rgb(35, 90, 209);
  min-height: 50px;
  color: white;
  padding:10px;
}

.field {
  min-width:500px;
  margin:auto;
  transform: scale(0.75);
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
.btn {
  transform: scale(0.75);
}

</style>
