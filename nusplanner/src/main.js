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
/*
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
        next({
          path: "/",
        })
      } else {
        next()
      }
    })

  } else {
    next()
  }

})
*/

Vue.use(VueTextareaAutosize);

Vue.config.productionTip = false

import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDYr2wvDJ7h9JAaM0Z350Ux_4SNEhZaiUo",
    authDomain: "nusplanner-74bbd.firebaseapp.com",
    databaseURL: "https://nusplanner-74bbd.firebaseio.com",
    projectId: "nusplanner-74bbd",
    storageBucket: "nusplanner-74bbd.appspot.com",
    messagingSenderId: "613681838416",
    appId: "1:613681838416:web:72116564d894d2690d1455",
    measurementId: "G-Q7RHBW61B0"
};


firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
database.settings({ timestampsInSnapshots: true });
export default database;

new Vue({
    vuetify,
    render: h => h(App),
    router: router
}).$mount('#app')