<template>
    <v-container>
            <v-app-bar dark>
                <v-toolbar-title>DashBoard</v-toolbar-title>
            </v-app-bar>
        <v-container>
            <v-row no-gutters>
                <v-col md= "4">
                    <doughnut></doughnut>
                </v-col>
                <v-col md= "4">
                    <radar></radar>
                </v-col>
                <v-col md= "4">
                    <linechart></linechart>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import radar from '../radar.js'
import doughnut from '../doughnut.js'
import linechart from '../line.js'
export default {
    components: {
        radar, doughnut, linechart
    }
}
</script>

<style scoped>
#chart{
  height:400px;
  width:400px;
  border-style: solid;
  border-color:rgb(109, 109, 109);
  border-width: 1px;
  padding:30px;
  float:left;
}
</style>