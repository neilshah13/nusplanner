<template>
    <div>
        <div id="chart">
            <doughnut></doughnut>
        </div>
        <div id="chart">
            <radar></radar>
        </div>
        <div id="chart">
            <linechart></linechart>
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