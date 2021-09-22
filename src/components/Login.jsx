import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookMessenger } from "react-icons/fa";
import { signInWithGoogle, signInWithFacebook } from "../firebase";


const Login = () => (
    <div className="login-page">
        <div className="login-box">
            <h2 className="login-title" >Welcome To HeloChat</h2>
            <div className="login-btns">
                <button className="btn google" onClick={signInWithGoogle} ><FcGoogle className="login-icon" /> Login with Google</button>
                <button className="btn facebook" onClick={signInWithFacebook} ><FaFacebookMessenger className="login-icon" /> Login with Facebook</button>
            </div>
        </div>
    </div>
);

export default Login;