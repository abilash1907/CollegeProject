import  firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyDpETxYXZAzaY6pDd155VCd8j8TiaKokmY",
  authDomain: "slacks-1008c.firebaseapp.com",
  databaseURL: "https://slacks-1008c.firebaseio.com",
  projectId: "slacks-1008c",
  storageBucket: "slacks-1008c.appspot.com",
  messagingSenderId: "751029666662",
  appId: "1:751029666662:web:59138e1d7d9eacc0e2fea7",
  measurementId: "G-DPQPQ0ZYM5"
};


const firebaseApp=firebase.initializeApp(firebaseConfig);



export default firebaseApp;