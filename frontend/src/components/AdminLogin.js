import React from 'react'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/userContext';


export default function AdminLogin() {
    const auth = getAuth();

    const {setAdmin} = useUserContext()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setAdmin(true)
            navigate('/admin')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    return (
        <div className="login center">
                <h5>Admin</h5>
                <form onSubmit={handleSubmit}>
                    <label >Email Address:</label>
                    <input type='email' id="loginInput" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label >Password:</label>
                    <input type='password' id="loginInput" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button id="loginButton">Sign In</button>
                </form>
        </div>
  )
}
