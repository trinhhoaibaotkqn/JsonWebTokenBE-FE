import './Admin.scss';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../redux/apiRequest';

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const role = user?.admin;
    const listUsers = useSelector((state) => state.users.users?.listUsers);

    useEffect(() => {
        if (!role)
            navigate("/");
    })

    const handleDeleteUser = (userDelete) => {
        if (user?.accessToken) {
            deleteUser(user, userDelete, listUsers, dispatch)
        }
    }

    return (
        <main className="admin-container">
            <div>
                <div className="admin-title">User List</div>
                <div className="admin-role">Your role: {role ? "Admin" : "User"}</div>
                <div className="admin-userlist">
                    {listUsers && listUsers.map((item) => {
                        return (
                            <div className="user-container" key={item._id}>
                                <div className="admin-user">{item.username}</div>
                                <div
                                    className="delete-user"
                                    onClick={() => handleDeleteUser(item)}>
                                    Delete
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
export default Admin;
