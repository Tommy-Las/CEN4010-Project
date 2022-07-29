import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserContext } from './context/userContext';
import Inventory from './components/Inventory'
import NavigationBar from './components/NavigationBar'
import NotFound from './components/NotFound'
import User from './components/User';
import AddProperty from './components/AddProperty';
import Login from './components/Login';
import ConfirmInformation from './components/ConfirmInformation';
import PerformLogin from './components/PerformLogin';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AdminRoute from './components/AdminRoute'
import AdminLogin from './components/AdminLogin';
import leftHouseImage from "./rose.webp"
import rightHouseImage from "./rose.webp"
import AdminPanel from './components/AdminPanel'

function App() {

    let auth = getAuth()
    const {setUser, setAdmin } = useUserContext();

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        if(firebaseUser.uid === 'QTNabZEzZaYKsDpHIgBI1xwDXAI3'){
          setAdmin(true)
        }
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
  
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path='/' element ={<Navigate to='/inventory'/>} />
        <Route path='/confirm' element ={<PrivateRoute><ConfirmInformation/></PrivateRoute>} />
        <Route path='/inventory' element= {<PrivateRoute><Inventory leftImage={leftHouseImage} rightImage={rightHouseImage}/></PrivateRoute>}/>
        <Route path='/user' element= {<PrivateRoute><User leftImage={leftHouseImage} rightImage={rightHouseImage}/></PrivateRoute>}/>
        <Route path='/add' element= {<PrivateRoute><AddProperty leftImage={leftHouseImage} rightImage={rightHouseImage}/></PrivateRoute>}/>
        <Route path='*' element={<NotFound/>} />
        <Route path='/login' element ={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/verify' element={<PublicRoute><PerformLogin /></PublicRoute>} />
        <Route path='/admin-login' element ={<PublicRoute><AdminLogin /></PublicRoute>} />
        <Route path='/admin' element ={<AdminRoute><AdminPanel /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
