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

        return (
        <>
        <Navbar expand="lg" id='navigation-bar'>
            <Container>
                <Navbar.Brand as={Link} to='/' ><img className='logo' src={logo} ></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto nav">
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