import { useContext } from "react";
import { AuthContext } from "../Providers/Authproviders";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const AxiosSecure = () => {

    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const AXIOS = axios.create({
        baseURL: 'http://localhost:5000'
    })

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

    }, [logOut, navigate, AXIOS]);

    return ([AXIOS])
};

export default AxiosSecure;