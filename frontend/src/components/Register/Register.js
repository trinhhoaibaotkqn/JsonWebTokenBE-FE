import "./Register.scss";
import { useState } from "react";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeTitle } from "../../redux/slice/authSlice";
const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            alert("Invalid confirm password");
            return;
        }
        if (password === passwordConfirm) {
            if (!email || !username || !password) {
                alert("Some fields are empty")
            }
            if (email && username && password) {
                const newUser = { email, username, password };
                registerUser(newUser, dispatch, navigate);
                dispatch(changeTitle("Sign in"));
            }
        }
    }
    return (
        <div className="register-container">
            <div className="register-title">Sign up</div>
            <form onSubmit={handleRegister}>
                <label><strong>EMAIL</strong></label><br />
                <input
                    type="text"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
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
                <label ><strong>CONFIRM PASSWORD</strong></label><br />
                <input
                    type="password"
                    placeholder="Confirm your password"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                /><br />
                <button className="btn-register" type="submit">Create account</button>
            </form>
        </div>
    )
}
export default Register;
