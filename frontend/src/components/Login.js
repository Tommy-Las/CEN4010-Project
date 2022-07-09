import { useState, useEffect } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import firebaseConfig from './firebase_credentials.json'

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:3000',
    // This must be true.
    handleCodeInApp: true,
  }



// Initialize Firebase
const app = initializeApp(firebaseConfig);


function Login(){
    //email from the user
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const sendEmail = (e) => {
        e.preventDefault()
        const auth = getAuth();

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                setMessage('Email succesfully sent, check your email to login')
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
                console.log(error.message)
            });
        console.log('email sent')
        setEmail('')
    }

    

    return <div>
        <form onSubmit={sendEmail}>
            <label>Email Address:</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <button>Send Credentials</button>
            <p>{email}</p>
            <p>{message}</p>
        </form>
    </div>
}

export default Login