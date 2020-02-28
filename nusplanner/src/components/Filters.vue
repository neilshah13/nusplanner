<template>
  <div>
    <v-container class="container" id="selected" fluid>
      <h1>
        <strong>Filter By:</strong>
      </h1>
      <p></p>
      <v-card>
          <h2>
            <v-checkbox value="Assignment" v-model="selectedCategories" label="Assignment" dense="False"></v-checkbox>
            <v-checkbox value="Quiz" v-model="selectedCategories" label="Quiz" dense="False"></v-checkbox>
            <v-checkbox value="Exam" v-model="selectedCategories" label="Exam" dense="False"></v-checkbox>
            <v-checkbox value="Others" v-model="selectedCategories" label="Others" dense="False"></v-checkbox>
          </h2>
      </v-card>
    </v-container>
  </div>
</template>

<script>

export default {  
  data: function(){
    return {
      events: [
        { name: "BT3103 Project", category: "Assignment" },
        { name: "Hackathon", category: "Others" },
        { name: "BT3103 Quiz", category: "Quiz" },
      ],
      selectedCategories: ["Assignment", "Quiz", "Exam", "Others"] //default 
    }
  },
  computed: {
    filteredEvents: function() {
      return this.events.filter((ev) => { return this.selectedCategories.includes(ev.category) });
    } 
  } 
};
</script>

<style scoped>

.container {
  background-color:rgb(42, 68, 99);
  max-width: 220px;
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
</style>