import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeTitle } from '../../redux/slice/authSlice';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const role = user?.admin;
    const listUsers = useSelector((state) => state.users.users?.listUsers);

    const handleTitleDropDown = (title) => {
        dispatch(changeTitle(title));
    }

    return (
        <main className="home-container">
            {user ?
                <div>
                    <div className="home-title">User List</div>
                    <div className="home-role">Your role: {role ? "Admin" : "User"}</div>
                    <div className="home-userlist">
                        {listUsers && listUsers.map((item) => {
                            return (
                                <div className="user-container" key={item._id}>
                                    <div className="home-user">{item.username}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                <div className="home-content">
                    <strong>
                        <NavLink
                            className="nav-link"
                            onClick={(e) => { handleTitleDropDown("Sign in") }}
                            to="/login"
                        >You are not logged in. Sign in now
                        </NavLink>
                    </strong>
                </div>
            }
        </main>
    )
}
export default Home;
