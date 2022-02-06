import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
    apiKey: "AIzaSyBU76mvTuL6rlUB79yW7MZBjax8E7eatEo",
    authDomain: "hara-db.firebaseapp.com",
    projectId: "hara-db",
    storageBucket: "hara-db.appspot.com",
    messagingSenderId: "777136014800",
    appId: "1:777136014800:web:d931c385c78ace61ea25d5",
    measurementId: "G-WLREH0VJN8"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
