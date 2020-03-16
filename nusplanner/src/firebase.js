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
var database = firebase.firestore();
export default database;