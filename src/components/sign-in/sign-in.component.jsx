import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import "./sign-in.styles.scss";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            // If sign in with email & password succeed, clear the state
            setEmail("")
            setPassword("");
        } catch(error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const { value, name } = event.target;
        if (name==="email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email" 
                    type="email" 
                    value={email} 
                    handleChange={handleChange}
                    label="email"
                    required 
                    />
                
                <FormInput
                    name="password" 
                    type="password" 
                    value={password} 
                    handleChange={handleChange}
                    label="password"
                    required 
                />

                <div className='buttons'>
                    <CustomButton type="submit"> Sign In </CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        Sign In With Google 
                    </CustomButton>
                </div>
            </form>

        </div>
    )
}

export default SignIn;