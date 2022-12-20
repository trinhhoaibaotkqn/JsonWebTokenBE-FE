import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
function Header() {
    let user = null;
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/admin">Admin</NavLink>
                    </Nav>
                    {user ?
                        <Nav>
                            <NavDropdown title={"Hello " + user} id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" to="/">Sign out</NavLink>
                            </NavDropdown>
                        </Nav>
                        :
                        <Nav>
                            <NavDropdown title="Sign in" id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" to="/login">Sign in</NavLink>
                                <NavLink className="dropdown-item" to="register">Sign up</NavLink>
                            </NavDropdown>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;