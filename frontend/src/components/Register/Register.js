import "./Register.scss";

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-title">Sign up</div>
            <form>
                <label><strong>EMAIL</strong></label><br />
                <input type="text" placeholder="Enter your email" /><br />
                <label ><strong>USERNAME</strong></label><br />
                <input type="text" placeholder="Enter your username" /><br />
                <label ><strong>PASSWORD</strong></label><br />
                <input type="text" placeholder="Enter your password" /><br />
                <label ><strong>CONFIRM PASSWORD</strong></label><br />
                <input type="text" placeholder="Confirm your password" /><br />
                <button className="btn-register" type="submit">Create account</button>
            </form>
        </div>
    )
}
export default Register;
