import { Line } from 'vue-chartjs'
import firebase from "firebase"

export default {
    extends: Line,
    data: () => ({
        chartdata: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ["rgba(140,45,205,0.2)"],
                borderColor: new Array(7).fill("rgba(140,45,205,1)"),
                fill: true,
                label: "Number of Event/Assignment deadlines"
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Check your deadlines for the week'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            },
            animation: {
                duration: 1
            },
            elements: {
                line: {
                    tension: 0.3
                }
            }
        }
    }),
    methods: {
        fetchItems: function() {
            let curr = new Date
            let week = []

            for (let i = 1; i <= 7; i++) {
                let first = curr.getDate() - curr.getDay() + i
                let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
                week.push(day)
                this.chartdata.labels.push(day)
            }

            /*for (let i = 1; i <= 7; i++) {
                console.log(week[i - 1])
            }*/

            let count = new Array(7).fill(0);

            var self = this;
            firebase.auth().onAuthStateChanged(async function(user) {
                if (user) {
                    await firebase.firestore().collection('users').doc(user.uid).get().then(async function(doc) {
                        var events = doc.data().event_list;
                        if (events.length <= 1) {
                            self.chartdata.datasets[0].data = count
                            self.renderChart(self.chartdata, self.options)
                        }
                        for (let i in events) {
                            var e = events[i];
                            if (e != "") {
                                await firebase.firestore().collection('event').doc(e).get().then(function(doc) {
                                    let deadline = doc.data().enddate
                                    if (week.includes(deadline)) {
                                        if (deadline == week[0]) {
                                            count[0]++
                                        }
                                        else if (deadline == week[1]) {
                                            count[1]++
                                        }
                                        else if (deadline == week[2]) {
                                            count[2]++
                                        }
                                        else if (deadline == week[3]) {
                                            count[3]++
                                        }
                                        else if (deadline == week[4]) {
                                            count[4]++
                                        }
                                        else if (deadline == week[5]) {
                                            count[5]++
                                        }
                                        else if (deadline == week[6]) {
                                            count[6]++
                                        }
                                    }
                                })
                                self.chartdata.datasets[0].data = count
                                self.renderChart(self.chartdata, self.options)
                            }
                        }
                    })
                }
            })
            /*firebase.firestore().collection('event').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    let deadline = doc.data().enddate
                    if (deadline == week[0]) {
                        count[0]++
                    }
                    if (deadline == week[1]) {
                        count[1]++
                    }
                    if (deadline == week[2]) {
                        count[2]++
                    }
                    if (deadline == week[3]) {
                        count[3]++
                    }
                    if (deadline == week[4]) {
                        count[4]++
                    }
                    if (deadline == week[5]) {
                        count[5]++
                    }
                    if (deadline == week[6]) {
                        count[6]++
                    }
                })
                this.chartdata.datasets[0].data = count
                this.renderChart(this.chartdata, this.options)
            })*/
        }
    },
    created() {
        this.fetchItems();
    }
}