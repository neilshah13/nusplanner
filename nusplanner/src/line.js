import {Bar} from 'vue-chartjs'
import firebase from "firebase"

export default{
    extends:Bar,
    data: () => ({
        chartdata: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: ["rgba(140,45,205,0.2)"],
              borderColor: ["rgba(140,45,205,1)"],
              borderWidth: 2
            }
          ]
          
        },
        options: {
          title:{
            display: true,
            text: 'Number of deadlines today'
          }
        }
      }),
      methods: {
        fetchItems: function() {
            var today = new Date().toISOString().substr(0, 10)
            var numOfEvents = 0
          firebase.firestore().collection('event').get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
                if (doc.data().enddate == today) {
                    numOfEvents++
                }
            })
            this.chartdata.labels.push('Event')
            this.chartdata.datasets[0].data.push(numOfEvents)
            this.renderChart(this.chartdata, this.options)
          })
        }
      },
    created(){
        this.fetchItems();
    }
}