<template>
 <v-sheet height= "150">
<!-- add event -->
        <v-btn color = "primary" class="mr-4" @click="dialog = true">New Event</v-btn>
 <div class="text-center"> <!-- for the title to be in middle -->
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
</div>

<!-- to pick view of month/week/day -->
 <div class="text-right"> <!-- for view button to be on the right -->
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
 </div>
 </v-sheet>
</template>

<script>
export default {
    
}
</script>