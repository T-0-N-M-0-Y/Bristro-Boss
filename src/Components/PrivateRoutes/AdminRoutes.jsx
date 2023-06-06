import { useContext } from "react";
import { AuthContext } from "../../Providers/Authproviders";
import { Navigate, useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import UseAdmin from "../../Hooks/UseAdmin";

const AdminRoutes = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
            return (
                <>
                    <span className="flex justify-center"><FaSpinner className='animate-spin text-4xl my-20'></FaSpinner></span>
                </>
            )
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={'/'} state={{from: location}} replace></Navigate>
};

export default AdminRoutes;