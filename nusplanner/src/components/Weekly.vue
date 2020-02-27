<template>
  <v-row>
    <v-col>
      <v-sheet height="150" min-width="400">
<!-- add event -->
        <v-btn color = "primary" class="mr-4" @click="dialog = true">New Event</v-btn>
<!-- <div class="text-center">  for the title to be in middle -->
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
<!-- to pick view of month/week/day -->
<!-- <div class="text-right"> for view button to be on the right -->
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
          <v-btn outlined color="grey darken-2" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon bottom>mdi-menu-down</v-icon>
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
            </v-list>
        </v-menu>
      </v-sheet>
<!-- add event dialog -->
<v-dialog v-model="dialog" max-width='550'>
  <v-card>
    <v-container>
      <v-toolbar-title class="cont">
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

      <v-form v-if="eventType == 'event'">
        <v-text-field class= 'field' v-model="name" type="text" label="Event Name"></v-text-field>
        <v-text-field class= 'field' v-model="details" type="text" label="Details (e.g. Meet at Jurong East MRT)"></v-text-field>
        <v-text-field class= 'field' v-model="start" type="date" label="Start Date"></v-text-field>
        <v-text-field class= 'field' v-model="end" type="date" label="End Date"></v-text-field>
        <v-text-field class= 'field' v-model="start" type="time" label="Start Time"></v-text-field>
        <v-text-field class= 'field' v-model="end" type="time" label="End Time"></v-text-field>
        <v-text-field class= 'field' v-model="color" type="color" label="Color (Click to open color menu)"></v-text-field>
      </v-form>
      <v-form v-else-if="eventType == 'assignment'" @submit.prevent="addEvent">
        <v-text-field class= 'field' v-model="name" type="text" label="Assignment Name"></v-text-field>
        <v-text-field class= 'field' v-model="details" type="text" label="Details (e.g. Due 2359, submit in PDF format)"></v-text-field>
        <v-text-field class= 'field' v-model="start" type="date" label="Due Date"></v-text-field>
        <v-text-field class= 'field' v-model="color" type="color" label="Color (Click to open color menu)"></v-text-field>
      </v-form>
      <v-form v-else-if="eventType== 'groupMeeting'" @submit.prevent="addEvent">
        <v-card-text class='menu'> Saved Group Name: 
        <v-menu>
        <template v-slot:activator="{ on }">
        <v-btn outlined color='grey darken-2' v-on="on" class="btn">
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
    </v-container>
  </v-card>
</v-dialog>

      <v-sheet height="600">
<!-- calendar -->
        <v-calendar
          ref="calendar"
          color="primary"
          class="calendar"
          v-model="today"
          :now="today"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:date="viewDay"
          @click:event="showEvent"
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
              <form><textarea v-model= "selectedEvent.name" class='txtarea' type="text" placeholder="Add a title"></textarea></form>
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
                <textarea
                  v-model="selectedEvent.details"
                  class = "txtarea"
                  type="text"
                  placeholder="Add some notes"
                ></textarea>
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
export default {
    data: () => ({
      type: 'month', //default
      eventType: 'event', //default
      start: null,
      end: null,
      today: new Date().toISOString().substr(0, 10),
      focus: '',
      selectedEvent: {},
      group: 'teamwork',
      currentlyEditing: null,
      dialog: false, // for adding event
      selectedOpen: false,
      selectedElement: null,
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
      groups: {
        teamwork: 'Team Work (BT3103)',
        teamhustle: 'Team Hustle (IS3103)',
      },
      events: [
        {
          name: 'BT3103 Meeting',
          details: 'At tembu',
          start: '2020-02-25 09:00',
          end: '2020-02-25 15:00',
          color: 'orange',
        },
        {
          name: 'BT4222 Midterms',
          details: 'At computing',
          start: '2020-02-29 10:00',
          end: '2020-02-29 12:00',
          color: 'purple',
        },
        {
          name: 'Tommy\'s Birthday',
          details: 'Bring his present',
          start: '2020-02-24',
          color: 'cyan',
        },
        {
          name: 'DAO Assignment',
          details: 'Due 1800, submit .csv file',
          start: '2020-02-28',
          color: 'indigo',
        },
        {
          name: 'IS3103 Essay due',
          details: 'Submit in pdf format, word count 1000',
          start: '2020-02-24',
          color: 'pink',
        }
      ],
    }),
    mounted() { // for calendar page to be at 8am
//      this.$refs.calendar.scrollToTime('08:00')
      this.$refs.calendar.checkChange();
    },
    methods: {
      viewDay({ date }) {
        this.focus = date;
        this.type = "day"; // by default is month
      },
      showEvent( {nativeEvent, event} ) {
        const open = () => {
          this.selectedEvent = event;
          this.selectedElement = nativeEvent.target;
          this.selectedOpen = true;
        }
        if (this.selectedOpen) {
          this.selectedOpen = false;
        } else {
          open();
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
      },
    },
  }
</script>

<style scoped>
.calendar {
  background-color: rgb(48, 57, 105);
  transform: scale(0.75);
  min-width: 500px;
  float: center;
/*  flex-direction: row;*/
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
}
.txt{ 
  font-size: 10px;
}
.menu {
  margin: auto;
  font-size: 13px;
}
.btn {
  transform: scale(0.75);
}

</style>
