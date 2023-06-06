import { useContext } from "react";
import { AuthContext } from "../../Providers/Authproviders";
import { Navigate, useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const PrivateRoutes = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        if (loading)
            return (
                <>
                    <span className="flex justify-center"><FaSpinner className='animate-spin text-4xl my-20'></FaSpinner></span>
                </>
            )
    }
    if (user) {
        return children;
    }
    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
};

export default PrivateRoutes;