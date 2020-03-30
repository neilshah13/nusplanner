import {Radar} from 'vue-chartjs'
import firebase from "firebase"

export default{
    extends:Radar,
    data: () => ({
        chartdata: {
          labels: [],
          datasets: [
            {
              label: "Number of Events per Module",
              fill: true,
              backgroundColor: "rgba(45,148,205,0.2)",
              borderColor: "rgba(45,148,205,1)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(45,148,205,1)",
              data: [],
            }
          ]
          
        },
        options: {
          title:{
            display: true,
            text: 'Check how much time you spend on each Module'
          }          
        }
      }),
      methods: {
        fetchItems: function() {
          firebase.firestore().collection('module').get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
              this.chartdata.labels.push(doc.data().module_id)
              //console.log(doc.data().module_id)
              this.chartdata.datasets[0].data.push(doc.data().event_list.length)
              //console.log(doc.data().event_list.length)
            })
            this.renderChart(this.chartdata, this.options)
          })
        }
      },
      created() {
        this.fetchItems()
      }
}