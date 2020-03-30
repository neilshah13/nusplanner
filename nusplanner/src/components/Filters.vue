<template>
  <div>
    <v-container class="container" id="selected" fluid>
      <h1>
        <strong>Filter By:</strong>
      </h1>
      <p></p>
      <v-card>
          <h2>
            <v-checkbox value="1" v-model="selectedType" label="Assignment" dense="False"></v-checkbox>
            <v-checkbox value="2" v-model="selectedType" label="Meeting" dense="False"></v-checkbox>
            <v-checkbox value="3" v-model="selectedType" label="Exam" dense="False"></v-checkbox>
            <v-checkbox value="4" v-model="selectedType" label="Others" dense="False"></v-checkbox>
          </h2>
      </v-card>
    </v-container>
    <!--{{selectedEvents}} -->
  </div>
</template>

<script>
import database from '../main.js'
export default {  

  data: function(){
    return {
      event: {
        colour: "",
        title: "",
        type: "",
        show: true
      },
      selectedType: ["1", "2", "3", "4"], //default 
      selectedEvents: []
    }
  },
  methods: {
    /*filterEvents: function() {
      let ev={};
      database.collection('project-events').get().then((querySnapShot)=>{
        querySnapShot.forEach(doc=>{
            ev=doc.data()
            ev.show = false
            if (this.selectedType.includes(ev.type)) {
              ev.show = true
            }
        })
      })   
    }, */
  },
  watch: {
    selectedType: function() {
      let ev = {};
      this.selectedEvents = [];
      database.collection('project-events').get().then((querySnapShot)=>{
        //this.filterEvents();
        querySnapShot.forEach(doc=>{
            ev=doc.data()
            if (this.selectedType.includes(ev.type)) {
              ev.show = true
              this.selectedEvents.push(ev.title)
            } else {
              ev.show = false
            }
            //console.log(ev.show)
            //console.log(this.selectedType)
        }
      )}
    )}
  }
};
</script>

<style scoped>

.container {
  background-color:rgb(42, 68, 99);
  max-width: 250px;
}

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
  transform: scale(0.7);
  margin: 0;
  font-size: 25px;
}
</style>