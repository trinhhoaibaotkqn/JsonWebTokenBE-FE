import axios from "axios";
import jwtDecode from "jwt-decode";
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    refreshToken,
    logoutStart,
    logoutSuccess,
    logoutFailed
} from "./slice/authSlice";
import {
    getUserFail,
    getUserStart,
    getUserSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFail,
    clearListUsers
} from "./slice/userSlice";

//SIGN UP
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("http://localhost:8080/auth/register", user);
        if (res.data.errCode === 0) {
            dispatch(registerSuccess(res.data));
            alert(res.data.message);
            navigate("/login");
        }
    }
    catch (err) {
        dispatch(registerFailed());
        alert(err.response.data.message);
    }
};

//SIGN IN
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8080/auth/login", user,
            {
                "withCredentials": true
            }
        );
        if (res.data.errCode === 0) {
            dispatch(loginSuccess(res.data.user));
            alert(res.data.message);
            getListUsers(res.data.user.accessToken, dispatch);
            navigate("/");
        }
    }
    catch (err) {
        alert(err.response.data.message);
        dispatch(loginFailed());
    }
};

const getListUsers = async (accessToken, dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get("http://localhost:8080/user/list-users", {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getUserSuccess(res.data.listUsers));
    } catch (err) {
        dispatch(getUserFail());
        alert(err.response.data.message);
    }
};

export const deleteUser = async (user, userDelete, listUsers, dispatch) => {
    dispatch(deleteUserStart());
    let axiosJWT = createAxiosJWT(user, dispatch);
    try {
        const res = await axiosJWT.delete(`http://localhost:8080/user/delete/${userDelete._id}`, {
            headers: {
                token: `Bearer ${user.accessToken}`
            }
        });
        listUsers = listUsers.filter((item) => item !== userDelete);
        dispatch(deleteUserSuccess(listUsers));
        alert(res.data.message);
    } catch (err) {
        dispatch(deleteUserFail());
    }
};

export const logout = async (user, id, dispatch, navigate) => {
    dispatch(logoutStart());
    let axiosJWT = createAxiosJWT(user, dispatch);
    try {
        await axiosJWT.post("http://localhost:8080/auth/logout", id, {
            headers: { token: `Bearer ${user.accessToken}` },
            "withCredentials": true,
        });
        dispatch(logoutSuccess());
        dispatch(clearListUsers());
        navigate("/login");
    } catch (err) {
        dispatch(logoutFailed());
    }
};


const createAxiosJWT = (user, dispatch) => {
    const newInstance = axios.create();
    //interceptor chặn các response or request trc khi nó gọi api
    newInstance.interceptors.request.use(
        async (config) => {
            const date = new Date();
            const tokenDecoded = jwtDecode(user?.accessToken);

            if (tokenDecoded.exp < date.getTime() / 1000) {
                try {
                    const res = await axios.post("http://localhost:8080/auth/refresh", 1, { withCredentials: true });
                    var dataToken = res.data;
                } catch (err) {
                    console.log(err);
                }
                const refreshUser = { ...user, accessToken: dataToken.accessToken };
                dispatch(refreshToken(refreshUser));
                config.headers["token"] = "Bearer " + dataToken.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
}

export const getToken = async () => {

}