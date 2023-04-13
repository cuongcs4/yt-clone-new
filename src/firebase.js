import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_YOUTUBE_API_KEY,
  authDomain: "clone-319704.firebaseapp.com",
  projectId: "youtube-clone-319704",
  storageBucket: "youtube-clone-319704.appspot.com",
  messagingSenderId: "46351442474",
  appId: "1:46351442474:web:4a0edf88f8256d0e529953",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
