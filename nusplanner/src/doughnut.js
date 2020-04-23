import {Doughnut} from 'vue-chartjs'
import firebase from "firebase"

export default{
    extends:Doughnut,
    data: () => ({
        chartdata: {
          labels: ['Done', 'Undone'],
          datasets: [
            {
              data: [],
              backgroundColor: ["rgba(35,164,89,0.2)","rgba(222,63,63,0.2)"],
              borderColor: ["rgba(35,164,89,1)","rgba(222,63,63,1)"]
            }
          ]
          
        },
        options: {
          title:{
            display: true,
            text: ''
          },
          animation: {
            duration: 5000
          }
        }
      }),
      methods: {
        fetchItems: function() {
          var self = this
          var done = 0
          var undone = 0
          firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
              await firebase.firestore().collection('users').doc(user.uid)
              .collection('todo').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                  if (doc.data().done == false) {
                      undone++
                  } else {
                   done++
                  }
                })
              var total = done+undone
              self.chartdata.datasets[0].data.push(Math.round(done*100/total))
              self.chartdata.datasets[0].data.push(Math.round(undone*100/total))
              self.options.title.text = Math.round(done*100/total) + '% of Tasks Completed'
              self.renderChart(self.chartdata, self.options)
              })
            }
          })
        }
      },
    created(){
        this.fetchItems();
    }
}