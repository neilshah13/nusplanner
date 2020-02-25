<template>
  <v-app>
    <v-content>
      <week></week>
      <!-- <Tasks></Tasks> -->
    </v-content>
  </v-app>
</template>

<script>
import Weekly from './components/Weekly';
//import Tasks from './components/Tasks';

export default {
  name: 'App',

  components: {
    'week': Weekly,
//    Tasks,
  },

  data: () => ({
    //
  }),
};
</script>
