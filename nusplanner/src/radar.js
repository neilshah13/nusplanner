import {Radar} from 'vue-chartjs'
import firebase from "firebase"

export default{
    extends:Radar,
    data: () => ({
        chartdata: {
          labels: [],
          datasets: [
            {
              label: "Number of Global Events per Module",
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
          },
          scale:{
            ticks:{
              beginAtZero: true,
              stepSize: 1
            }
          }          
        },
        animation: {
          duration: 5000
        }
      }),
      methods: {
        fetchItems: function() {
          var self = this;
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              firebase.firestore().collection('users').doc(user.uid).get().then(async function(doc) {
                var mods = doc.data().module_list;
                for (let i in mods) {
                  var mod = mods[i];
                  if (mod != "") {
                    await firebase.firestore().collection('module').doc(mod).get().then(function(doc) {
                      self.chartdata.labels.push(doc.data().module_code);
                      //console.log(doc.data().module_code)
                      self.chartdata.datasets[0].data.push(doc.data().event_list.length)
                      //console.log(doc.data().event_list.length)
                    })
                  }
                }
                self.renderChart(self.chartdata, self.options)
              })
            }
          })
          // firebase.firestore().collection('module').get().then(querySnapShot => {
          //   querySnapShot.forEach(doc => {
          //     this.chartdata.labels.push(doc.data().module_code)
          //     //console.log(doc.data().module_code)
          //     this.chartdata.datasets[0].data.push(doc.data().event_list.length)
          //     //console.log(doc.data().event_list.length)
          //   })
          //   this.renderChart(this.chartdata, this.options)
          // })
        }
      },
      created() {
        this.fetchItems()
      }
}