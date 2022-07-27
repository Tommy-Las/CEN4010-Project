import {Link} from 'react-router-dom'
import logout from '../functions/logout'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/userContext'
import logo from './logo-cut.png'

function Navbar(){ 
    const { user, admin, setAdmin} = useUserContext();

    const navigate = useNavigate()
    return (
        <header>
            <Link to='/'><img className='logo' src={logo} ></img></Link>
            <nav className='navbar'>
                {user && !admin ?
                <ul className='nav'>
                <li >
                    <Link className='nav-button' to='/inventory'>Inventory</Link>
                </li>
                <li>
                    <Link className='nav-button' to='/add'>Add Property</Link>
                </li>
                <li >
                    <Link className='nav-button' to='/user'>Update User</Link>
                </li>
                <li className= 'logout nav-button' onClick={() => {
                    logout()
                    navigate("/login")}}>
                    Logout
                </li>
                </ul>
            : user && admin ? 
            <ul className='nav'>
            <li className= 'logout nav-button' onClick={() => {
                logout()
                navigate("/login")
                setAdmin(false)
                }}>
                Logout
            </li>
            </ul>
            : <ul className='nav'>
                <li>
                    <Link className='nav-button' to='/admin-login'>Admin</Link>
                </li>
            </ul>}
            </nav>
        </header>)
 }

 export default Navbar