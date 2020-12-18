import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDc4qkWCb_73_VqUdJU7iLsH0mpXeUovGc",
  authDomain: "tfg-ivan-almeida.firebaseapp.com",
  databaseURL: "https://tfg-ivan-almeida.firebaseio.com",
  projectId: "tfg-ivan-almeida",
  storageBucket: "tfg-ivan-almeida.appspot.com",
  messagingSenderId: "1096393223498",
  appId: "1:1096393223498:web:9ac8600684a6400b7fa5b3"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth=firebase.auth()
  const db = firebase.firestore();
  const storage = firebase.storage();
  export{auth,firebase,db,storage}