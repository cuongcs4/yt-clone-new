import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyB68NteY8z7quAqpjqo4J3gGTPJLa8bRV8',
  authDomain: "clone-319704.firebaseapp.com",
  projectId: "youtube-clone-319704",
  storageBucket: "youtube-clone-319704.appspot.com",
  messagingSenderId: "46351442474",
  appId: "1:46351442474:web:4a0edf88f8256d0e529953",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
