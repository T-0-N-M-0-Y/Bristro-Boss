import { useContext } from "react";
import { AuthContext } from "../../../Providers/Authproviders";
import { Helmet } from "react-helmet-async";
import AxiosSecure from "../../../Hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCarSide, FaProductHunt, FaUsers, FaWallet } from "react-icons/fa";

const AdminHome = () => {

    const { user } = useContext(AuthContext);

    const [AXIOS] = AxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await AXIOS.get('/admin-stats')
            return res.data;
        }
    })

    return (
        <div className="w-full mx-20">
            <Helmet>
                <title>Bristro Boss | Admin Home</title>
            </Helmet>
            <h1 className="text-3xl my-10">Welcome Back, {user.displayName}</h1>

            <div className="stats shadow">

                <div className="stat">
                    <div className="stat-value">${stats.totalRevenue}</div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-figure text-secondary">
                        <FaWallet className="text-3xl"></FaWallet>
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-value">{stats.users}</div>
                    <div className="stat-title">Customers</div>
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-value">{stats.products}</div>
                    <div className="stat-title">Products</div>
                    <div className="stat-figure text-secondary">
                        <FaProductHunt className="text-3xl"></FaProductHunt>
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-figure text-secondary">
                        <FaCarSide className="text-3xl"></FaCarSide>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;