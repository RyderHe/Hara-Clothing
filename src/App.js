import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component';

import { auth } from "./firebase/firebase.utils";

const App = () => {
  const [currUser, setCurrUser] = useState(null);
  console.log("currUser", currUser);

  let unsubscribeFromAuth = null;

  // componentDidMount
  useEffect(() => {
      unsubscribeFromAuth = auth.onAuthStateChanged( user => {
          setCurrUser(user);
          console.log(user);
      })

  });
  // componentWillUnmount
  useEffect(() => {
      return unsubscribeFromAuth();
  }, [])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
