import { useContext } from "react";
import { AuthContext } from "../Providers/Authproviders";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const AXIOS = axios.create({
    baseURL: 'http://localhost:5000'
})

const AxiosSecure = () => {

    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        AXIOS.interceptors.request.use((request) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        });

        AXIOS.interceptors.response.use((response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOut()
                    navigate('/login')
                }
                return Promise.reject(error);
            }
        )

    }, [logOut, navigate]);

    return ([AXIOS])
};

export default AxiosSecure;