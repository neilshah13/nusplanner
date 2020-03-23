import {Doughnut} from 'vue-chartjs'
export default{
    extends:Doughnut,
    data: () => ({
        chartdata: {
          labels: ['Done', 'Undone'],
          datasets: [
            {
              label: 'Sales',
              data: [0.3, 0.7],
              backgroundColor:['green', 'red'],
              borderWidth:0.5,
            }
          ]
          
        },
        options: {
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }

                }]
            },
            layout:{
              padding:{
                  left: 5,
                  right: 0,
                  top: 0,
                  bottom: 10
              }
          }
          
        }
      }),
    mounted(){
        this.renderChart(this.chartdata,this.options)
    }
}