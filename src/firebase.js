import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyBXfzkz2oKbQ-1LqOjDYrmdIuSj5KblEnY",
    authDomain: "slack-clone-923c6.firebaseapp.com",
    databaseURL: "https://slack-clone-923c6.firebaseio.com",
    projectId: "slack-clone-923c6",
    storageBucket: "slack-clone-923c6.appspot.com",
    messagingSenderId: "1037263554432",
    appId: "1:1037263554432:web:696fb0a8510c5333"
  };

  firebase.initializeApp(config);


  export default firebase;