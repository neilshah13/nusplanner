<template>
  <v-row>
    <v-col>
      <v-sheet height="150">
<!-- add event -->
        <v-btn color = "primary" class="mr-4" @click="dialog = true">New Event</v-btn>
<!-- <div class="text-center"> <!-- for the title to be in middle -->
<!-- prev week -->
        <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon text small>mdi-chevron-left</v-icon>
        </v-btn>
<!-- title -->
        <!-- <v-toolbar-title>{{ title }}</v-toolbar-title> -->
Title
<!-- next week -->
        <v-btn fab text small color="grey darken-2" @click="next"> <!-- class mr-4 means to have a margin-->
            <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>

<!-- to pick view of month/week/day -->
<!-- <div class="text-right"> <!-- for view button to be on the right -->
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
<v-dialog v-model="dialog" max-width="500">
  <v-card>
    <v-container>
      <v-form @submit.prevent="addEvent">
        <v-text-field v-model="name" type="text" label="Event Name"></v-text-field>
        <v-text-field v-model="details" type="text" label="Detail"></v-text-field>
        <v-text-field v-model="start" type="date" label="Start Date"></v-text-field>
        <v-text-field v-model="end" type="date" label="End Date"></v-text-field>
        <v-text-field v-model="color" type="color" label="Color (Click to open color menu)"></v-text-field>
      <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog=false">Create Event</v-btn>
      </v-form>
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
          event-margin-bottom="10px"
        ></v-calendar> <!-- @click:event="showEvent" -->
<!-- after clicking on event -->
          <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id">{{selectedEvent.details}}</form>
              <form v="else">
                <textarea
                  v-model="selectedEvent.details"
                  type="text"
                  style="width: 100%"
                  :min-height="100"
                  placeholder="add note"
                ></textarea>
              </form>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      selectedEvent: {},
      type: "week", // default
      dialog: false, // for adding event
      selectedOpen: false,
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
      },
      events: [
        {
          name: 'BT3103 Meeting',
          start: '2020-02-24 09:00',
          end: '2020-02-24 10:00',
          color: 'orange',
        },
        {
          name: 'BT4222 Meeting',
          start: '2020-02-26 08:30',
          end: '2020-02-26 10:00',
          color: 'purple',
        },
        {
          name: 'Thomas\' Birthday',
          start: '2020-02-24',
          color: 'cyan',
        },
        {
          name: 'Hackathon',
          start: '2020-02-28 08:30',
          end: '2020-02-29 18:30',
          color: 'indigo',
        },
        {
          name: 'Assignment due',
          start: '2020-02-24',
          color: 'cyan',
        }
      ],
    }),
    mounted() { // for calendar page to be at 8am
      this.$refs.calendar.scrollToTime('08:00')
//      this.$refs.calendar.checkChange();
    },
    methods: {
      viewDay({ date }) {
        this.focus = date;
        this.type = "day"; // by default is month
      },
      open() {
        this.selectedEvent = event
      },
      showEvent() {
        if (this.selectedOpen) {
          this.selectedOpen = false;
        } else {
          open();
        }
      },
/*
      addEvent() {
        events.name= this.name
        event.details= this.
        
      },
      */
      getEventColor(event) {
        return event.color;
      },
      next() {
        this.$refs.calendar.next();
      },
      prev() {
        this.$refs.calendar.prev();
      },
      computed: {
        monthFormatter() {
          return this.$refs.calendar.getFormatter({
            timeZone: "UTC",
            month: "long"
      });
    }
      }
    }
  }
</script>

<style scoped>
.calendar {
  height: 600px;
  width: 900px;
  margin: auto;
  orientation: landscape;
  background-color: rgb(48, 57, 105);
  transform: scale(0.75);
}
</style>
