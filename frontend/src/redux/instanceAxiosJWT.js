import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshToken } from "./slice/authSlice";

const apiRefreshToken = async () => {
    try {
        const res = await axios.post("http://localhost:8080/auth/refresh", {
            withCredentials: true// truyền cookies với axios
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const createAxios = () => {
    const newInstance = axios.create(user, dispatch);
    //interceptor chặn các response or request trc khi nó gọi api
    newInstance.interceptors.request.use(
        async (config) => {
            console.log(config);
            const date = new Date();
            const tokenDecoded = jwtDecode(user?.accessToken);
            if (tokenDecoded.exp < date.getTime() / 1000) {
                dataToken = apiRefreshToken();
                const refreshUser = { ...user, accessToken: dataToken.accessToken };
                dispatch(refreshToken(refreshUser));
                config.headers["token"] = "Bearer " + dataToken.accessToken;
            }
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
}