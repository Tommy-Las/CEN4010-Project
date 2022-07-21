import {Link} from 'react-router-dom'
import Logout from './Logout'
import { useNavigate } from 'react-router-dom'

function Navbar(){ 
    const navigate = useNavigate()
    return (
        <header>
            <h1 className='title'>West Boca Make-Believe</h1>
            <nav className='navbar'>
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
                        Logout()
                        navigate("/login")}}>
                        Logout
                    </li>
                </ul>
            </nav>
        </header>)
 }

 export default Navbar