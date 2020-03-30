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
          }
        }
      }),
      methods: {
        fetchItems: function() {
          var user = firebase.auth().currentUser
          var done = 0
          var undone = 0
          firebase.firestore().collection('users').doc(user.uid)
          .collection('todo').get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
              if (doc.data().done == false) {
                  undone++
                  //console.log(doc.data().done)
                  //console.log(undone)
              } else {
                done++
              }
            })
            var total = done+undone
            this.chartdata.datasets[0].data.push(Math.round(done*100/total))
            this.chartdata.datasets[0].data.push(Math.round(undone*100/total))
            this.options.title.text = Math.round(done*100/total) + '% of Tasks Completed'
            this.renderChart(this.chartdata, this.options)
          })
        }
      },
    created(){
        this.fetchItems();
    }
}