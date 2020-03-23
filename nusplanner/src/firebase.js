import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA2JU6nZgq7jB0euQ0wPi_NdEB5-yv0noc",
    authDomain: "nusplanner-b0b3c.firebaseapp.com",
    databaseURL: "https://nusplanner-b0b3c.firebaseio.com",
    projectId: "nusplanner-b0b3c",
    storageBucket: "nusplanner-b0b3c.appspot.com",
    messagingSenderId: "394834114598",
    appId: "1:394834114598:web:0de502d998702ae3becee7",
    measurementId: "G-2Q511XR20F"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
database.settings({ timestampsInSnapshots: true });
export default database;