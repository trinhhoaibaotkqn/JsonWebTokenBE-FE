import './Login.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/apiRequest';
import { changeTitle } from '../../redux/slice/authSlice';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = { username, password };
        loginUser(newUser, dispatch, navigate);
    }

    const handleTitleDropDown = (title) => {
        dispatch(changeTitle(title));
    }

    return (
        <div className="login-container">
            <div className="login-title">Sign in</div>
            <form onSubmit={handleLogin}>
                <label ><strong>USERNAME</strong></label><br />
                <input
                    type="text"
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <label ><strong>PASSWORD</strong></label><br />
                <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button className="btn-login" type="submit">Continue</button>
            </form>
            <div className="create-new-acc">If you haven't account</div>
            <strong><NavLink onClick={(e) => { handleTitleDropDown("Sign up") }} className="nav-link" to="/register">Register one for free</NavLink></strong>
        </div>
    )
}
export default Login;
