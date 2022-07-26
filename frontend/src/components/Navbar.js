import {Link} from 'react-router-dom'
import logout from '../functions/logout'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/userContext'
import { useAdminContext } from '../context/adminContext'

function Navbar(){ 
    const { user, admin, setAdmin} = useUserContext();

    const navigate = useNavigate()
    return (
        <header>
            <h1 id='navbarTitle'>West Boca Make-Believe</h1>
            <nav className='navbar'>
                {user && !admin ?
                <ul className='nav'>
                <li>
                    <Link to='/inventory'>Inventory</Link>
                </li>
                <li>
                    <Link to='/add'>Add Property</Link>
                </li>
                <li>
                    <Link to='/user'>Update User</Link>
                </li>
                <li className= 'logout' onClick={() => {
                    logout()
                    navigate("/login")}}>
                    Logout
                </li>
                </ul>
            : user && admin ? 
            <ul className='nav'>
            <li className= 'logout' onClick={() => {
                logout()
                navigate("/login")
                setAdmin(false)
                }}>
                Logout
            </li>
            </ul>
            : <ul className='nav'>
                <li>
                    <Link to='/admin-login'>Admin</Link>
                </li>
            </ul>}
            </nav>
        </header>)
 }

 export default Navbar