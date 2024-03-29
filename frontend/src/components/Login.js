import { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import sendEmail from "../functions/sendEmail";

// Your web app's Firebase configuration
import firebaseConfig from './firebase_credentials.json'

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function Login(){

    document.getElementById("body").setAttribute("class", "loginBackground"); //Colors the body tag

    //email from the user
    const [email, setEmail] = useState('')
    //message displayed on screen
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        //prevent default submission
        e.preventDefault()
        const message = await sendEmail(email)
        setEmail('')
        setMessage(message)
    }

    

    return (
        <div id='login-container'>
            <div className="login center">
            <h5 id='login-title'>Sign In</h5>
            <form onSubmit={handleSubmit}>
                <label >Email Address:</label>
                <input type='email' id="login-input" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <button className="loginButton">Send Credentials</button>
                <p>{message}</p>
            </form>
            </div>
        </div>
    )
}

export default Login