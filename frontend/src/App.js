import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserContext } from './context/userContext';
import Inventory from './components/Inventory'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import User from './components/User';
import Property from './components/Property';
import AddProperty from './components/AddProperty';
import DeleteProperty from './components/deleteProperty';
import Login from './components/Login';
import PerformLogin from './components/PerformLogin';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {

    let auth = getAuth()
    const { setUser } = useUserContext();

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        console.log('user is logged in')  
      } else {
        setUser(null);
      }
    });
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element ={<Navigate to='/inventory' />} />
        <Route path='/inventory' element= {<PrivateRoute><Inventory /></PrivateRoute>}/>
        <Route path='/user' element= {<PrivateRoute><User /></PrivateRoute>}/>
        <Route path='/property/:property_id' element= {<PrivateRoute><Property /></PrivateRoute>}/>
        <Route path='/add' element= {<PrivateRoute><AddProperty /></PrivateRoute>}/>
        <Route path='/delete' element={<PrivateRoute><DeleteProperty/></PrivateRoute>}/>
        <Route path='*' element={<PrivateRoute><NotFound/></PrivateRoute>} />
        <Route path='/login' element ={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/verify' element={<PublicRoute><PerformLogin /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
