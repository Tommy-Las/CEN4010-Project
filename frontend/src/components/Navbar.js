import {Link} from 'react-router-dom'

function Navbar(){ 
    return (
        <header>
            <h1 className='title'>West Boca Make-Believe</h1>
            <nav className='navbar'>
                <ul className='nav'>
                    <li>
                        <Link to='/'>Inventory</Link>
                    </li>
                    <li>
                        <Link to='/user'>Update User Information</Link>
                    </li>
                    <li className= 'logout' onClick={() => {console.log("test")}}>
                        Logout
                    </li>
                </ul>
            </nav>
        </header>)
 }

 export default Navbar