<template>
  <div class = "filterbar">
    <v-container class="container">
    <v-row justify="space-around">
      <strong> Filter By: </strong>
      <v-checkbox value=2 v-model="selectedType" label="Assignment" color="rgb(42, 68, 99)"></v-checkbox>
      <v-checkbox value=3 v-model="selectedType" label="Meeting" color="rgb(42, 68, 99)"></v-checkbox>
      <v-checkbox value=4 v-model="selectedType" label="Exam" color="rgb(42, 68, 99)"></v-checkbox>
      <v-checkbox value=1 v-model="selectedType" label="Others" color="rgb(42, 68, 99)"></v-checkbox>
    </v-row>
    </v-container>
    <!--<v-container class="container" id="selected" fluid>
      <h1>
        <strong>Filter By:</strong>
      </h1>
      <p></p>
      <v-card>
          <h2>
            <v-checkbox value=2 v-model="selectedType" label="Assignment"></v-checkbox>
            <v-checkbox value=3 v-model="selectedType" label="Meeting"></v-checkbox>
            <v-checkbox value=4 v-model="selectedType" label="Exam"></v-checkbox>
            <v-checkbox value=1 v-model="selectedType" label="Others"></v-checkbox>
          </h2>
      </v-card>
    </v-container> -->
    <!--{{userEvents}}
    {{selectedEvents}}-->
  </div>
</template>

<script>
import database from '../main.js';
//import firebase from "firebase";
//import calendar from '../components/Weekly.vue'

export default {  
  props: {
    userEvents: Array
  },
  data: function(){
    return {
      //currUser: null,
      //userEvents: [],
      event: {
        colour: "",
        title: "",
        type: "",
        show: true
      },
      selectedType: ["1","2","3","4"], //default 
      selectedEvents: []
    }
  },
  methods: {
    updateEvents() {
      this.selectedEvents = []
      var self = this;
      self.$props.userEvents.forEach(evID => {  
        let ev = database.collection('event').doc(evID)
        
        ev.get().then(doc => {
          if(self.selectedType.includes(doc.data().type.toString())) {
            if (!self.selectedEvents.includes(evID)) {
              self.selectedEvents.push(doc.data())
              console.log(doc.data().name, "pushed")
            }
          } else {
            console.log(doc.data().name, "removed")
          }
        })
      })
    }
  }, 
  mounted() {
    this.updateEvents()
  },

  watch: {
    selectedType: function() {
    this.updateEvents()
    this.$emit('update-filtered-events', this.selectedEvents)
    }
  }
};
</script>

<style scoped>

.container {
  background-color:aliceblue;
  max-width: 2000px;
  max-height: 70px;
  color:rgb(42, 68, 99);
  display: inline-block;
}

/*
h1 {
  font-size: 20px;
  margin: 5px;
  color: white;
  font-size: 24px;
}

h2 {
  color: rgb(42, 68, 99);
  background: white;
  max-width: 500px;
  font-size: 20px;
  margin-left: 35px;
  transform: scale(0.9);
  text-align:left;
}

.container{
  margin: 0;
  font-size: 25px;
} */


</style>