import './Login.scss'
import { NavLink } from 'react-router-dom';
const Login = () => {
    return (
        <div className="login-container">
            <div className="login-title">Sign up</div>
            <form>
                <label ><strong>USERNAME</strong></label><br />
                <input type="text" placeholder="Enter your username" /><br />
                <label ><strong>PASSWORD</strong></label><br />
                <input type="text" placeholder="Enter your password" /><br />
                <button className="btn-login" type="submit">Continue</button>
            </form>
            <div className="create-new-acc">If you haven't account</div>
            <strong><NavLink className="nav-link" to="/register">Register one for free</NavLink></strong>
        </div>
    )
}
export default Login;
