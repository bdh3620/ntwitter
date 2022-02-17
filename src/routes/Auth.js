import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import { getAuth } from "firebase/auth";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,GithubAuthProvider,GoogleAuthProvider,signInWithPopup} from "firebase/auth";


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value)
        } else if (name ==="password") { 
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault(); //기본 행위가 실행되는것을 막는것,내가 하고싶은데로 하겠다고. ex.새로 고침같은거 못하게?  
        try {
            let data;
            if(newAccount) {
                const data = await createUserWithEmailAndPassword(authService, email, password);
                } else {
                const data = await signInWithEmailAndPassword(authService, email, password);
                }
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {
        target: { name },
        } = event;
        let provider;
        if (name === "google") {
        provider = new GoogleAuthProvider();
        } else if (name === "github") {
        provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
        };
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "Create Account" :  "Sign In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>
            {newAccount ? "Sign In":"Create Account"}
        </span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
    </div>
    )
}
export default Auth;
