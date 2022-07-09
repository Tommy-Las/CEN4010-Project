import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import User from './components/User';
import Property from './components/Property';
import AddProperty from './components/AddProperty';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element ={<Login />} />
        <Route path='/inventory' element= {<Home />}/>
        <Route path='/user' element= {<User />}/>
        <Route path='/property/:property_id' element= {<Property />}/>
        <Route path='/add' element= {<AddProperty />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
