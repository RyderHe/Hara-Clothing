import React, { useState, useEffect } from 'react';

import "./signin-and-signup.styles.scss";

import SignIn from "../../components/sign-in/sign-in.component";
import { auth } from "../../firebase/firebase.utils";

const SignInAndSignUpPage = () => {
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
        <div className="sign-in-and-sign-up">
            <SignIn />
        </div>
    );
}

export default SignInAndSignUpPage;