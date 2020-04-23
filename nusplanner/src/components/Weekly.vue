<template>
  <v-container>
    <v-row justify="center" no gutters>
      <v-col>
       <!-- filter bar -->
        <div class = "filterbar">
          <v-container>
          <v-row justify="space-around">
            <div class="fbt"><strong>Filter By Type</strong></div>
            <v-checkbox class="checkbox" value="2" v-model="selectedType" label="Assignment" color="rgb(42, 68, 99)"></v-checkbox>
            <v-checkbox class="checkbox" value="4" v-model="selectedType" label="Exam" color="rgb(42, 68, 99)"></v-checkbox>
            <v-checkbox class="checkbox" value="3" v-model="selectedType" label="Meeting" color="rgb(42, 68, 99)"></v-checkbox>
            <v-checkbox class="checkbox" value="1" v-model="selectedType" label="Events" color="rgb(42, 68, 99)"></v-checkbox>
            <v-checkbox class="checkbox" v-model="personal" label="Personal" color="rgb(42, 68, 99)"></v-checkbox>
          </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>

      <v-row justify="center" no-gutters class="month">
       
      <v-col> 
<!-- add event -->
         <v-btn color="primary" dark @click.stop="dialog = true">
            New Event
          </v-btn>
      </v-col>

      <v-col md="auto" class="arrows">
<!-- prev week -->
        <v-btn fab text medium color="grey darken-2" @click="prev">
            <v-icon text medium>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="maintitle">
<!-- title -->{{ title }}
        </span>
<!-- next week -->
        <v-btn fab text medium color="grey darken-2" @click="next"> <!-- class mr-4 means to have a margin-->
            <v-icon medium>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>

       <v-col>
        <v-btn outlined class="mr-4" color="grey darken-2" @click="viewDay">
            Today
          </v-btn>

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

<!-- add GroupMembers dialog -->
<!-- <v-dialog v-model="groupMembers" max-width="550">
<creategroup @update-grp='updateGrp' @update-grpsnack='updateSnackGrp' @update-grpsnack-nouserfalse='updategroupnouser' @update-grpsnack-notfilled='updateSnackGrpnotfilled'></creategroup>
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
  >
    Please make sure all fields are filled!
    <v-btn
      color="error"
      text
      @click="grpsnacknotfilled = false"
    >
      Close
    </v-btn>
  </v-snackbar> -->

<!-- add event dialog -->
<v-dialog v-model="dialog" max-width="550">
  <createvent @update-dialog='updateDialog'
              @update-eventsnack='updateSnackEvent'
              @getEventsfromDatabase ='getEvents'>
  </createvent>
</v-dialog>

<!-- For Successful Event/Assignment/GroupMeeting -->
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
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-container></v-container>
<!-- popup after clicking on event -->
<!-- If selecting a global event -->
        <v-menu v-if = "selectedEvent.global === true"
          class="menu"
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement">

          <v-card color="grey lighten-4" flat>
            <v-toolbar class="menu" :color="selectedEvent.color" dark>
              <div align = "left" class='txtarea'>
                {{selectedEvent.name}}
              <!-- So that users cant change name directly from the popup -->
              <!-- <textarea
                v-model= "selectedEvent.name"
                class='txtarea'
                type="text"
                placeholder="Add a title">
                </textarea> -->
                </div>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <div align = "LEFT">
                <b> <u> {{selectedEvent.module_id}} </u> </b>
                <br>
                Details: {{ selectedEvent.details }}
                </div>
              </v-form>
              <br>
              <br>
              <font size="1"> **This is set by your module coordinator and cannot be changed! </font>
            </v-card-text>

            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false, currentlyEditing= null">Close</v-btn>
            </v-card-actions>
          </v-card>
         </v-menu>

<!-- If NOT selecting a global event -->
        <v-menu v-else
        class="menu"
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement">
          <v-card color="grey lighten-4" flat>
            <v-toolbar class="menu" :color="selectedEvent.color" dark>
              <div class = 'txtarea'>
                {{selectedEvent.name}}
              </div>
              <!-- So that users cant change name directly from the popup -->
              <!-- <textarea
                v-model= "selectedEvent.name"
                class='txtarea'
                type="text"
                placeholder="Add a title">
                </textarea> -->
              <v-row justify = "end">
              <v-btn icon max-width = 27 v-if="currentlyEditing !== selectedEvent.id"
                @click.prevent="editEvent(selectedEvent)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn text v-else @click="onClickSave(selectedEvent)">Save</v-btn>
              <v-btn icon max-width = 28 @click="deletepopup = true">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              </v-row>
              <v-dialog v-model="deletepopup" max-width="300">
                <v-card min-height='120'>
                <v-toolbar-title class='deletetitle'>
                    Confirm delete?
                </v-toolbar-title>
                <v-btn color='primary' class= 'mr-4' @click="deleteEvent(selectedEvent)"> Confirm </v-btn>
                <v-btn @click='deletepopup = false'> Cancel </v-btn>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-card-text>
              <v-form v-if = "selectedEvent.global == true"> {{ selectedEvent.details }} </v-form>
              <v-form v-else-if="currentlyEditing !== selectedEvent.id && selectedEvent.global === false">

                <div align = "LEFT" v-if="selectedEvent.module_id !== 'Select Module' && selectedEvent.module_id !== true && selectedEvent.type === 1" >
                  <b> <u> {{selectedEvent.module_id}} Event </u> </b>
                  <br>
                  Details: {{ selectedEvent.details }}
                </div>

                <div align = "LEFT" v-else-if="selectedEvent.module_id !== 'Select Module' && selectedEvent.module_id !== true && selectedEvent.type === 2" >
                  <b> <u> {{selectedEvent.module_id}} Assignment </u> </b>
                  <br>
                  Details: {{ selectedEvent.details }}
                </div>                

                <div align = "LEFT" v-else-if="selectedEvent.module_id !== 'Select Module' && selectedEvent.module_id !== true && selectedEvent.type === 3" >
                  <b> <u> {{selectedEvent.module_id}} Group Meeting </u> </b>
                  <br>
                  Details: {{ selectedEvent.details }}
                </div>

                <div align = "LEFT" v-else-if = "selectedEvent.type === 1">
                  <b> <u> Personal Event </u> </b> <br> Details: {{ selectedEvent.details }}
                </div>
                
                <div align = "LEFT" v-else-if = "selectedEvent.type === 2">
                  <b> <u> Personal Assignment </u> </b> <br> Details: {{ selectedEvent.details }}
                </div>

                <div align = "LEFT" v-else>
                  <b> <u> Personal </u> </b> <br> Details: {{ selectedEvent.details }}
                </div>                
              

                </v-form>
              <v-form ref="form" class="neweventform" v-else-if="currentlyEditing === selectedEvent.id && selectedEvent.type === 1">
                <v-text-field outlined class= 'neweventfield' prepend-icon="insert_emoticon" v-model="selectedEvent.name" type="text" label="Name"></v-text-field>
                <v-text-field outlined class= 'neweventfield' prepend-icon="insert_emoticon" v-model="selectedEvent.details" type="text" label="Details (e.g. Meet at Jurong East MRT)"></v-text-field>
                <!-- <v-text-field class= 'neweventfield' v-model="selectedEvent.startdate" type="date" label="Start Date"></v-text-field>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.enddate" type="date" label="End Date"></v-text-field>
                <v-text-field class= 'neweventfield'  v-model="selectedEvent.starttime" type="time" label="(Optional) Start Time [hh:mm AM/PM] "></v-text-field>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.endtime" type="time" label="(Optional) End Time [hh:mm AM/PM] "></v-text-field> -->

                  <v-menu
                  v-model="selectedEvent.fromStartDateMenu"
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
                      :value="selectedEvent.startdate"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="en-in"
                    v-model="selectedEvent.startdate"
                    @input="selectedEvent.fromStartDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              
              <v-menu
                  v-model="selectedEvent.fromEndDateMenu"
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
                      :value="selectedEvent.enddate"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="en-in"
                    v-model="selectedEvent.enddate"
                    @input="selectedEvent.fromEndDateMenu = false"
                  ></v-date-picker>
                </v-menu>

                <v-menu
                  v-model="selectedEvent.fromStartTimeMenu"
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
                      :value="selectedEvent.starttime"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    ampm-in-title=true
                    v-model="selectedEvent.starttime"
                    full-width
                  ></v-time-picker>
                </v-menu>

                <v-menu
                  v-model="selectedEvent.fromEndTimeMenu"
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
                      :value="selectedEvent.endtime"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    ampm-in-title=true
                    v-model="selectedEvent.endtime"
                    full-width
                  ></v-time-picker>
                </v-menu>

                <div class='colorfieldtitle'>
                  <div class="mr-4">
                  Please choose a color:
                  </div>
                    <v-btn
                      v-bind:color="selectedEvent.color"
                      dark
                      @click.stop="colorpickerdialog = true"
                    >
                      Color
                    </v-btn>

                    <v-dialog
                      v-model="colorpickerdialog"
                      max-width="300"
                    >
                    <ColorPicker v-model = "selectedEvent.color"> </ColorPicker>

                          <v-btn
                            v-bind:color="selectedEvent.color"
                            dark
                            @click="colorpickerdialog = false"
                          >
                            Choose
                          </v-btn>
                    </v-dialog>
                    </div>

                 <!-- (old one) <textarea-autosize
                  v-model="selectedEvent.details"
                  class = "txtarea"
                  type="text"
                  placeholder="Add some notes"
                ></textarea-autosize> -->
              </v-form>


<v-form ref="form" class="neweventform" v-else-if="currentlyEditing === selectedEvent.id && selectedEvent.type === 2">
                <v-text-field outlined class= 'neweventfield' prepend-icon="insert_emoticon" v-model="selectedEvent.name" type="text" label="Name"></v-text-field>
                <v-text-field outlined class= 'neweventfield' prepend-icon="insert_emoticon" v-model="selectedEvent.details" type="text" label="Details (e.g. Meet at Jurong East MRT)"></v-text-field>
                <!-- <v-text-field class= 'neweventfield' v-model="selectedEvent.enddate" type="date" label="End Date"></v-text-field> -->
              
              <v-menu
                  v-model="selectedEvent.fromEndDateMenu"
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
                      :value="selectedEvent.enddate"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="en-in"
                    v-model="selectedEvent.enddate"
                    @input="selectedEvent.fromEndDateMenu = false"
                  ></v-date-picker>
                </v-menu>

                <div class='colorfieldtitle'>
                  <div class="mr-4">
                  Please choose a color:
                  </div>
                    <v-btn
                      v-bind:color="selectedEvent.color"
                      dark
                      @click.stop="colorpickerdialog = true"
                    >
                      Color
                    </v-btn>

                    <v-dialog
                      v-model="colorpickerdialog"
                      max-width="300"
                    >
                    <ColorPicker v-model = "selectedEvent.color"> </ColorPicker>

                          <v-btn
                            v-bind:color="selectedEvent.color"
                            dark
                            @click="colorpickerdialog = false"
                          >
                            Choose
                          </v-btn>
                    </v-dialog>
                    </div>

                 <!-- (old one) <textarea-autosize
                  v-model="selectedEvent.details"
                  class = "txtarea"
                  type="text"
                  placeholder="Add some notes"
                ></textarea-autosize> -->
              </v-form>

<v-form ref="form" class="neweventform" v-else-if="currentlyEditing === selectedEvent.id && selectedEvent.type === 3">
                <v-text-field outlined class= 'neweventfield' prepend-icon="insert_emoticon" v-model="selectedEvent.name" type="text" label="Name"></v-text-field>
                <v-text-field outlined class= 'neweventfield' prepend-icon="insert_emoticon" v-model="selectedEvent.details" type="text" label="Details (e.g. Meet at Jurong East MRT)"></v-text-field>
                <!-- <v-text-field class= 'neweventfield' v-model="selectedEvent.startdate" type="date" label="Start Date"></v-text-field>
                <v-text-field class= 'neweventfield'  v-model="selectedEvent.starttime" type="time" label="(Optional) Start Time [hh:mm AM/PM] "></v-text-field>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.endtime" type="time" label="(Optional) End Time [hh:mm AM/PM] "></v-text-field> -->

                  <v-menu
                  v-model="selectedEvent.fromStartDateMenu"
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
                      :value="selectedEvent.startdate"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="en-in"
                    v-model="selectedEvent.startdate"
                    @input="selectedEvent.fromStartDateMenu = false"
                  ></v-date-picker>
                </v-menu>
            
                <v-menu
                  v-model="selectedEvent.fromStartTimeMenu"
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
                      :value="selectedEvent.starttime"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    ampm-in-title=true
                    v-model="selectedEvent.starttime"
                    full-width
                  ></v-time-picker>
                </v-menu>

                <v-menu
                  v-model="selectedEvent.fromEndTimeMenu"
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
                      :value="selectedEvent.endtime"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    ampm-in-title=true
                    v-model="selectedEvent.endtime"
                    full-width
                  ></v-time-picker>
                </v-menu>

                <div class='colorfieldtitle'>
                  <div class="mr-4">
                  Please choose a color:
                  </div>
                    <v-btn
                      v-bind:color="selectedEvent.color"
                      dark
                      @click.stop="colorpickerdialog = true"
                    >
                      Color
                    </v-btn>

                    <v-dialog
                      v-model="colorpickerdialog"
                      max-width="300"
                    >
                    <ColorPicker v-model = "selectedEvent.color"> </ColorPicker>

                          <v-btn
                            v-bind:color="selectedEvent.color"
                            dark
                            @click="colorpickerdialog = false"
                          >
                            Choose
                          </v-btn>
                    </v-dialog>
                    </div>

                 <!-- (old one) <textarea-autosize
                  v-model="selectedEvent.details"
                  class = "txtarea"
                  type="text"
                  placeholder="Add some notes"
                ></textarea-autosize> -->
              </v-form>


<v-form ref="form" class="neweventform" v-else>
                <v-text-field outlined class= 'neweventfield' prepend-icon="insert_emoticon" v-model="selectedEvent.name" type="text" label="Name"></v-text-field>
                <v-text-field outlined class= 'neweventfield' prepend-icon="insert_emoticon" v-model="selectedEvent.details" type="text" label="Details (e.g. Meet at Jurong East MRT)"></v-text-field>
                <!-- <v-text-field class= 'neweventfield' v-model="selectedEvent.startdate" type="date" label="Start Date"></v-text-field>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.enddate" type="date" label="End Date"></v-text-field>
                <v-text-field class= 'neweventfield'  v-model="selectedEvent.starttime" type="time" label="(Optional) Start Time [hh:mm AM/PM] "></v-text-field>
                <v-text-field class= 'neweventfield' v-model="selectedEvent.endtime" type="time" label="(Optional) End Time [hh:mm AM/PM] "></v-text-field> -->

                  <v-menu
                  v-model="selectedEvent.fromStartDateMenu"
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
                      :value="selectedEvent.startdate"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="en-in"
                    v-model="selectedEvent.startdate"
                    @input="selectedEvent.fromStartDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              
              <v-menu
                  v-model="selectedEvent.fromEndDateMenu"
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
                      :value="selectedEvent.enddate"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="en-in"
                    v-model="selectedEvent.enddate"
                    @input="selectedEvent.fromEndDateMenu = false"
                  ></v-date-picker>
                </v-menu>

                <v-menu
                  v-model="selectedEvent.fromStartTimeMenu"
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
                      label="Start Time"
                      prepend-icon="access_time"
                      readonly
                      :value="selectedEvent.starttime"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    ampm-in-title=true
                    v-model="selectedEvent.starttime"
                    full-width
                  ></v-time-picker>
                </v-menu>

                <v-menu
                  v-model="selectedEvent.fromEndTimeMenu"
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
                      label="End Time"
                      prepend-icon="access_time"
                      readonly
                      :value="selectedEvent.endtime"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    ampm-in-title=true
                    v-model="selectedEvent.endtime"
                    full-width
                  ></v-time-picker>
                </v-menu>

                <div class='colorfieldtitle'>
                  <div class="mr-4">
                  Please choose a color:
                  </div>
                    <v-btn
                      v-bind:color="selectedEvent.color"
                      dark
                      @click.stop="colorpickerdialog = true"
                    >
                      Color
                    </v-btn>

                    <v-dialog
                      v-model="colorpickerdialog"
                      max-width="300"
                    >
                    <ColorPicker v-model = "selectedEvent.color"> </ColorPicker>

                          <v-btn
                            v-bind:color="selectedEvent.color"
                            dark
                            @click="colorpickerdialog = false"
                          >
                            Choose
                          </v-btn>
                    </v-dialog>
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
// import CreateGroup from "./CreateGroup.vue"
import ColorPicker from 'vue-color-picker-wheel';
export default {
        components:{
        createvent: CreateEvent,
        // creategroup: CreateGroup,
        ColorPicker,
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
      colorpickerdialog: false,
      groupMembers: false, // for adding groups
      eventsnack: false, // snackbar for added events
      eventfalse: false,
      assignmentfalse: false,
      grpmeetingfalse: false,
      deleteconfirm: false,
      deletepopup: false,
      FromStartTimeMenu: false,
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
      allEvents: [],
      selectedType: ["1", "2", "3", "4"],
      selectedModules: [],
      personal: true
    }),
    mounted() {
      this.getEvents()
      this.$root.$on('filter-module', data => {
        this.filterByModule(data)
      })
    },
    watch: {
      selectedType() {
        this.filterEvents()
      },
      selectedModules() {
        this.filterEvents()
      },
      personal() {
        this.filterEvents()
      }
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
        setTimeout(function(){ this.eventsnack = this.eventsnack.replace(true, false); }, 3000)
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
      },
      onClickSave(ev) {
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
      filterByModule(arr) {
        this.selectedModules = arr;
        this.filterEvents();
      },
      filterEvents() {
        let events = []
        this.allEvents.forEach(eventData => {
          if (this.selectedType.length == 0 && eventData.module_id == "Select Module" && this.personal) {
            events.push(eventData)
          }
          else if (this.selectedType.includes(eventData.type.toString()) && this.selectedModules.includes(eventData.module_id)) {
            events.push(eventData)
          } 
          else if (this.selectedType.includes(eventData.type.toString()) && eventData.module_id == "Select Module" && this.personal) {
            events.push(eventData)
          }
        })
        this.events = events
      },
      async getEvents () {
      let snapshot = await firebase.firestore().collection('event').get()
      let events = []
      var user = firebase.auth().currentUser;
      snapshot.forEach(doc => {
        let eventData = doc.data()
        if (eventData.uid == user.uid || eventData.global == true) {
          eventData.id = doc.id
          events.push(eventData)
        }
      })
      this.allEvents = events
      this.filterEvents();
      },
      /* addEvent() function moved to CreateEvent.vue */
        async updateEvent (ev) {
            if (ev.starttime != ''){ //If there is time input, then we input both date and time into database
              var startinput = ev.startdate.concat(" ".concat(ev.starttime))
              var endinput = ev.enddate.concat(" ".concat(ev.endtime))
            } else { //if no time input, we just input date into database
              if(ev.type==2){startinput = ev.enddate}
              else{startinput = ev.startdate}
              endinput = ev.enddate
            }
            await firebase.firestore().collection('event').doc(ev.id).update({
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
            this.getEvents()
          }
        ,
        async deleteEvent (ev) {
          this.deletepopup = false;
          var user = firebase.auth().currentUser;
          var eventlist;
          await firebase.firestore().collection('event').doc(ev.id).delete();
          firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
            eventlist = doc.data().event_list
            var index = eventlist.indexOf(ev.id);
            if (index !== -1) eventlist.splice(index, 1); //removing event from users' event_list
            eventlist = eventlist.filter(item => item)
            firebase.firestore().collection('users').doc(user.uid).update({event_list:eventlist})
          })
          this.selectedOpen = false
          this.getEvents()
        },
      },
    }
</script>

<style scoped>
#calendar {
  /* margin: auto; */
  max-height: 600px;
  max-width: 1000px;
  position: relative;
  background-color: rgb(48, 57, 105);
  transform: scale(0.75);
  min-width: 500px;
  float: center;
/*  flex-direction: row;*/
}
.txtarea {
  font-size: 15px;
  /* margin: auto; */
  /* padding:12px; */
  padding-right: 70px;
}
.txt{
  font-size: 13px;
}
.menu {
  font-size: 15px;
}
.filterbar {
  background-color:aliceblue;
  max-width: 2000px;
  max-height: 50px;
  color:rgb(42, 68, 99);
  margin-top: -10px;
  margin-bottom: 8px;
}
.fbt {
  text-align: left;
  margin-left: 5px;
}
.checkbox {
  display: inline-flex;
  margin-top: -5px;
}
.arrows {
  margin-top: -5px;
  margin-bottom: 5px;
}
.neweventform {
  display: block;
}
/* .neweventfield {
  transform: scale(0.75);
} */
.deletetitle {
  padding: 12px;
}
.maintitle {
  font-size: 20px;
  padding: 30px;
}
.month {
  margin-top: -10px;
  margin-bottom: -10px;
}
</style>
