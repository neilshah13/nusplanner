<template>
  <div id="app">
    <app-header></app-header>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {
    //Registering with a name
    'app-header':Header,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
/* For the headers to look good, be sure to reset the margin and padding of the body */
body {
	margin:0;
	padding:0;
}
</style>
