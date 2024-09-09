import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import { IconMoon } from '@tabler/icons-react';
import { Button } from 'react-bootstrap';
import {  useState } from 'react';

export function Header({logout}){

    const html = document.querySelector('html')
    const [variant, setVariant] = useState(html.dataset.bsTheme)
   
    function changeTheme(){
        
        if(html.dataset.bsTheme==="dark"){
           
            html.dataset.bsTheme="light"
            setVariant("light")
        }
        else if(html.dataset.bsTheme==="light"){
           
             html.dataset.bsTheme="dark"
             setVariant("dark")
        }
    }


    return(
        <div >
    <Navbar expand="lg" className="navbar">
        <Container className='navbar-container'>
        <Navbar.Brand className='navbar-brand'>Vivero La Jardineta</Navbar.Brand>
        
        <Navbar className='navbar-collapse'>
          <Nav>
            <Nav.Link className='link' href="/">Home</Nav.Link>
           
            <Nav.Link className='link' href="/addproduct">Add product</Nav.Link>
           </Nav>
        </Navbar>
        <Button onClick={logout}>Logout</Button>
        <Button variant={variant} onClick={changeTheme}><IconMoon></IconMoon></Button>
        </Container>
    </Navbar>
        </div>
    )
}