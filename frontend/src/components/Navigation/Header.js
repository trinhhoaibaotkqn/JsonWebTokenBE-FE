import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/apiRequest';
import { changeTitle } from '../../redux/slice/authSlice';
function Header() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const admin = useSelector((state) => state.auth.login.currentUser?.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const titleDropDown = useSelector((state) => state.auth.title);
    const handleTitleDropDown = (title) => {
        dispatch(changeTitle(title));
    }

    const handleLogout = () => {
        if (user?.accessToken)
            logout(user, user._id, dispatch, navigate)
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        {admin ?
                            <NavLink className="nav-link" to="/admin">Admin</NavLink>
                            :
                            <div></div>
                        }
                    </Nav>
                    {user ?
                        <Nav>
                            <NavDropdown title={"Hello <" + user.username + ">"} id="basic-nav-dropdown">
                                <NavLink
                                    className="dropdown-item"
                                    to="/"
                                    onClick={() => handleLogout()}>
                                    Sign out
                                </NavLink>
                            </NavDropdown>
                        </Nav>
                        :
                        <Nav>
                            <NavDropdown title={titleDropDown} id="basic-nav-dropdown">
                                <NavLink onClick={(e) => handleTitleDropDown("Sign in")} className="dropdown-item" to="/login">Sign in</NavLink>
                                <NavLink onClick={(e) => handleTitleDropDown("Sign up")} className="dropdown-item" to="/register">Sign up</NavLink>
                            </NavDropdown>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;