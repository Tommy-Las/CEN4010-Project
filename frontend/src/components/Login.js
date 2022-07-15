import { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

import sendEmail from "./functions/sendEmail";

// Your web app's Firebase configuration
import firebaseConfig from './firebase_credentials.json'

const actionCodeSettings = {
    url: 'http://localhost:3000',
    handleCodeInApp: true,
  }



// Initialize Firebase
const app = initializeApp(firebaseConfig);


function Login(){
    //email from the user
    const [email, setEmail] = useState('')
    //message displayed on screen
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        //prevent default submission
        e.preventDefault()
        sendEmail(email)
    }

    

    return <div>
        <form onSubmit={handleSubmit}>
            <label>Email Address:</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <button>Send Credentials</button>
            <p>{message}</p>
        </form>
    </div>
}

export default Login