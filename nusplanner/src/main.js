import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Routes from './routes';

require('dotenv').config();

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
console.log("Ran this in main.js")
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
console.log(process.env.API_KEY)  
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
