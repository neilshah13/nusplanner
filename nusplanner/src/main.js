import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Routes from './routes';

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
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueTextareaAutosize);

Vue.config.productionTip = false

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCQH24CqWz0_5DuieM4Nbk8yPBeqlbNELw",
  authDomain: "fir-tutorial-e4242.firebaseapp.com",
  databaseURL: "https://fir-tutorial-e4242.firebaseio.com",
  projectId: "fir-tutorial-e4242",
  storageBucket: "fir-tutorial-e4242.appspot.com",
  messagingSenderId: "794243145358",
  appId: "1:794243145358:web:5c52364fa0e1b55646b3df",
  measurementId: "G-RC7R98T96M"
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