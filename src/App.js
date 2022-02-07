import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component';

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

const App = () => {
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
      console.log("Im subscribing....")
      // Oberver for changes to the user's authentication state, when sign in / sign out
      const unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
        if (userAuth) { // user sign in
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapShot => {
            console.log("here")
            console.log(snapShot);
            console.log(snapShot.data());
            setCurrUser({
              id: snapShot.id,
              ...snapShot.data()
            });
            
            })
            console.log("APP COMPONENT DID MOUNT", currUser);
          } else { // user sign out
            console.log("APP COMPONENT DID MOUNT", currUser);
            setCurrUser(userAuth);
          }
      })
      return () => {
          console.log("Im unsubscribing....")
          unsubscribeFromAuth();
      }

  }, []);


  return (
    <div>
      <Header currUser={currUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
