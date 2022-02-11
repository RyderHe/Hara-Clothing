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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log("Inside createUserProfileDocument:   ")
    console.log("userAuth: ", userAuth);
    if (!userAuth) {
        return;
    }
    
    // QueryReference object does not have the actual data of the collection/document
    //   It tells the details / method to get the Snapshot object
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    console.log("userRef: ", userRef)
    // Snapshot object gived the actual data
    const snapshot = await userRef.get();
    console.log("snapshot: ", snapshot)

    // If current user does not exists in datastore, add it.
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const cretaedAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                cretaedAt,
                ...additionalData
            })

        } catch (error) {
            console.log("error creating user", error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth(); // authentication
export const firestore = firebase.firestore(); // datastore

// authentication with Google Provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
