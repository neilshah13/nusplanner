<template>
    <div>
        <v-toolbar dark color="#36567d" dense>
            <v-toolbar-title class="col-sm-2">DashBoard</v-toolbar-title>
        </v-toolbar>
        <div id="charts">
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
        </div>
    </div>
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
#charts {
    padding: 0.5em 3em 3em;
}
</style>