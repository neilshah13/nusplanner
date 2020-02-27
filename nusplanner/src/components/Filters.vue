<template>
    <div class="container" id="selected">
      <b>Filter By:</b>
      <label><input type="radio" v-model="selectedCategory" value="Overview" /> Overview</label>
      <label><input type="radio" v-model="selectedCategory" value="Assignment" /> Assignment</label>
      <label><input type="radio" v-model="selectedCategory" value="Quiz" /> Quiz</label>
      <label><input type="radio" v-model="selectedCategory" value="Exam" /> Exam</label>
      <label><input type="radio" v-model="selectedCategory" value="Others" /> Others</label>
    </div>
    <!-- Testing Filter Results (without style)
    <ul class="event-list">
      <li v-bind:key="event" v-for="event in filteredEvents">{{ event.name }}</li>
    </ul>  -->
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
      selectedCategory: "Overview" //default 
    }
  },
  computed: {
    filteredEvents: function() {
      var vm = this;
      var category = vm.selectedCategory;
      
      if(category === "Overview") {
        return vm.events;
      } else {
        return vm.events.filter(function(selected) {
          return selected.category === category;
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 206.31px;
  height: 245px;
}

label {
  display: block;
  line-height: 1.5em;
}
</style>