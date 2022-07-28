import {Link} from 'react-router-dom'
import logout from '../functions/logout'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/userContext'
import logo from './logo-cut.png'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar(){ 
    const { user, admin, setAdmin} = useUserContext();

    const navigate = useNavigate()
    
    // return (
    //     <header>
    //         <Link to='/'><img className='logo' src={logo} ></img></Link>
    //         <nav className='navbar'>
    //             {user && !admin ?
    //             <ul className='nav'>
    //             <li >
    //                 <Link className='nav-button' to='/inventory'>Inventory</Link>
    //             </li>
    //             <li>
    //                 <Link className='nav-button' to='/add'>Add Property</Link>
    //             </li>
    //             <li >
    //                 <Link className='nav-button' to='/user'>Update User</Link>
    //             </li>
    //             <li className= 'logout nav-button' onClick={() => {
    //                 logout()
    //                 navigate("/login")}}>
    //                 Logout
    //             </li>
    //             </ul>
    //         : user && admin ? 
    //         <ul className='nav'>
    //         <li className= 'logout nav-button' onClick={() => {
    //             logout()
    //             navigate("/login")
    //             setAdmin(false)
    //             }}>
    //             Logout
    //         </li>
    //         </ul>
    //         : <ul className='nav'>
    //             <li>
    //                 <Link className='nav-button' to='/admin-login'>Admin</Link>
    //             </li>
    //         </ul>}
    //         </nav>
    //     </header>)

        return (
        <>
        <Navbar expand="lg" id='navigation-bar'>
            <Container>
                <Navbar.Brand as={Link} to='/' ><img className='logo' src={logo} ></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto nav">
                    {user && !admin ? 
                    <>
                    <Nav.Link className='nav-button' as={Link} to='/inventory'>Inventory</Nav.Link>
                    <Nav.Link className='nav-button' as={Link} to='/add'>Add Property</Nav.Link>
                    <Nav.Link className='nav-button' as={Link} to='/user'>User</Nav.Link>
                    <Nav.Link className='nav-button' onClick={()=>{
                        logout()
                        navigate("/login")
                        setAdmin(false)
                    }}>Logout</Nav.Link>
                    </>
                    : user && admin ? 
                    <>
                    <Nav.Link className='nav-button' onClick={()=>{
                        logout()
                        navigate("/login")
                        setAdmin(false)
                    }}>Logout</Nav.Link>
                    </>
                    :
                    <>
                    <Nav.Link className='nav-button' as={Link} to='/admin-login'>Admin</Nav.Link>
                    </>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>)
 }

 export default NavigationBar