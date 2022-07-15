import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import {useEffect, useState } from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import User from './components/User';
import Property from './components/Property';
import AddProperty from './components/AddProperty';
import Login from './components/Login';

function App() {

    let auth = getAuth()
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')

  useEffect(() => { 
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      const stored_email = window.localStorage.getItem('emailForSignIn')
      setEmail(stored_email)

      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        setEmail(window.prompt('Please provide your email for confirmation'));
      }

      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          console.log('User was logged in successfully')
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          let err = error.code
        });
  }
   })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
  }, [])
  

  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {user ? 
        <><Route path='/' element ={<Home />} />
        <Route path='/inventory' element= {<Home />}/>
        <Route path='/user' element= {<User />}/>
        <Route path='/property/:property_id' element= {<Property />}/>
        <Route path='/add' element= {<AddProperty />}/>
        <Route path='*' element={<NotFound />} /> </>
        : <Route path='/' element ={<Login />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
