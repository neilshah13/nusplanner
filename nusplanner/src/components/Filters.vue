<template>
  <div class = "filterbar">
    <v-container class="container">
    <v-row justify="space-around">
      <strong> Filter By: </strong>
      <v-checkbox value=2 v-model="selectedType" label="Assignment" color="rgb(42, 68, 99)"></v-checkbox>
      <v-checkbox value=4 v-model="selectedType" label="Exam" color="rgb(42, 68, 99)"></v-checkbox>
      <v-checkbox value=3 v-model="selectedType" label="Meeting" color="rgb(42, 68, 99)"></v-checkbox>
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
import firebase from "firebase";

export default {  
  props: {
    userEvents: Array
  },
  data: function(){
    return {
      selectedType: ["1","2","3","4"], //default 
      selectedEvents: [],
    }
  },
  methods: {
    updateEvents() {
      var selectedEvents = []
      this.$props.userEvents.forEach(event => {  
        let ev = firebase.firestore().collection('event').doc(event.id)
        ev.get().then(doc => {
          let eventData = doc.data()
          if(this.selectedType.includes(eventData.type.toString())) {
            if (!selectedEvents.includes(event)) {
              eventData.id = doc.id
              selectedEvents.push(eventData)
            }
          } 
        })
      })
      this.selectedEvents = selectedEvents
    }
  },
  mounted() {
    this.updateEvents()
  },

  watch: {
    selectedType() {
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