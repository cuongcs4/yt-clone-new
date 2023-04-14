import firebase from "firebase/app";
import "firebase/auth";

// const firebaseConfig = {
//   apiKey: 'AIzaSyB68NteY8z7quAqpjqo4J3gGTPJLa8bRV8',
//   authDomain: "clone-319704.firebaseapp.com",
//   projectId: "youtube-clone-319704",
//   storageBucket: "youtube-clone-319704.appspot.com",
//   messagingSenderId: "46351442474",
//   appId: "1:46351442474:web:4a0edf88f8256d0e529953",
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCl4LVAIB745l0YSuIGYrZYLW0Wr6Bo8dg",
//   authDomain: "yt-clone-cs4.firebaseapp.com",
//   projectId: "yt-clone-cs4",
//   storageBucket: "yt-clone-cs4.appspot.com",
//   messagingSenderId: "784406897672",
//   appId: "1:784406897672:web:4fb91c978c0688abb81dbd",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAyl4isy19yF6edDkWreG60M39qq2oMDR4",
  authDomain: "yt-clone-2-8c852.firebaseapp.com",
  projectId: "yt-clone-2-8c852",
  storageBucket: "yt-clone-2-8c852.appspot.com",
  messagingSenderId: "215570836708",
  appId: "1:215570836708:web:ef3639c7ce8721e2bc10f1",
  measurementId: "G-K9LN37V9E7"
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
