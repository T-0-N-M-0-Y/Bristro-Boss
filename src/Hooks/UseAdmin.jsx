import { useContext } from "react";
import { AuthContext } from "../Providers/Authproviders";
import AxiosSecure from "./axiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseAdmin = () => {

    const {user, loading} = useContext(AuthContext);

    const [AXIOS] = AxiosSecure()

    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await AXIOS.get(`/users/admin/${user.email}`);
            return res.data.admin;
        }
    })

    return ([isAdmin, isAdminLoading]);
};

export default UseAdmin;