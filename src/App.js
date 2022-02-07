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
  // console.log("currUser", currUser);

  // const unsubscribeFromAuth = useRef(null);
  // let unsubscribeFromAuth = null;

  // componentDidMount
  useEffect(() => {
      let unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
        // createUserProfileDocument(user)
        if (userAuth) {
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
            console.log("APP COMPONENT DID MPUNT", currUser);
          } else {
            setCurrUser(userAuth);
          }


          return unsubscribeFromAuth();
      })

  });
  // componentWillUnmount
  // useEffect(() => {
  //   console.log("APP COMPONENTWILLUNMPUNT");
  // }, [])

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
