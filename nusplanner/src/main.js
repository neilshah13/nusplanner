import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Routes from './routes';
import VueTextareaAutosize from 'vue-textarea-autosize'


Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.auth)) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                next()
            } else {
                next({
                    path: "/login",
                })
            }
        })
    } else if (to.matched.some(record => record.meta.guest)) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                next()
            } else {
                next()
            }
        })

    } else {
        next()
    }

})


Vue.use(VueTextareaAutosize);

Vue.config.productionTip = false

import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCNITTk9s0rFYy4gSE960qlap1flcMzNnQ",
    authDomain: "nusplannerfinal.firebaseapp.com",
    databaseURL: "https://nusplannerfinal.firebaseio.com",
    projectId: "nusplannerfinal",
    storageBucket: "nusplannerfinal.appspot.com",
    messagingSenderId: "95015250506",
    appId: "1:95015250506:web:bd29c273acadf5b9c694b3",
    measurementId: "G-0MFYG8Q9R5"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
// database.settings({ timestampsInSnapshots: true });
export default database;

new Vue({
    vuetify,
    render: h => h(App),
    router: router
}).$mount('#app')