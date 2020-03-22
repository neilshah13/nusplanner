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
    apiKey: "AIzaSyD3bNy1P9h1SikDscok9ZAxBQazXxi5Xtk",
    authDomain: "nusplanner-46ec3.firebaseapp.com",
    databaseURL: "https://nusplanner-46ec3.firebaseio.com",
    projectId: "nusplanner-46ec3",
    storageBucket: "nusplanner-46ec3.appspot.com",
    messagingSenderId: "189430397202",
    appId: "1:189430397202:web:cbed662fc2367e55bcdbcb",
    measurementId: "G-1C1YVZJBZ5"
};
  
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
