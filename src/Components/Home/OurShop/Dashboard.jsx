import { Helmet } from "react-helmet-async";
import { FaBars, FaBookOpen, FaBookmark, FaCalendar, FaHome, FaMailBulk, FaReadme, FaShoppingBag, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../../../Hooks/UseAdmin";

const Dashboard = () => {

    const [isAdmin] = UseAdmin();

    return (
        <div>
            <Helmet>
                <title>Bristro Boss | Dashboard</title>
            </Helmet>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-10" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">

                    <Outlet></Outlet>

                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side bg-orange-300">
                    <label htmlFor="my-drawer-10" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80">

                        {
                            isAdmin ?
                                <>
                                    <li><NavLink to={'/dashboard/adminhome'}><FaHome></FaHome> Admin Home</NavLink></li>
                                    <li><NavLink to={'/dashboard/additems'}><FaUtensils></FaUtensils> Add Items</NavLink></li>
                                    <li><NavLink to={'/dashboard/manageitems'}> <FaBars></FaBars>  Manage Items</NavLink></li>
                                    <li><NavLink to={'/dashboard/managebooking'}><FaBookOpen></FaBookOpen> Manage Bookings</NavLink></li>
                                    <li><NavLink to={'/dashboard/allusers'}><FaUsers></FaUsers> All Users</NavLink></li>
                                </>
                                :
                                <>
                                    <li><NavLink to={'/dashboard/home'}><FaHome></FaHome> User Home</NavLink></li>
                                    <li><NavLink to={'/dashboard/reservation'}><FaCalendar></FaCalendar> Reservation</NavLink></li>
                                    <li><NavLink to={'/dashboard/payment'}><FaWallet></FaWallet> Payment History</NavLink></li>
                                    <li><NavLink to={'/dashboard/mycart'}><FaShoppingCart></FaShoppingCart> My Cart</NavLink></li>
                                    <li><NavLink to={'/dashboard/review'}><FaReadme></FaReadme> Add Review</NavLink></li>
                                    <li><NavLink to={'/dashboard/booking'}><FaBookmark></FaBookmark> My Booking</NavLink></li>
                                </>
                        }
                        <div className="divider"></div>
                        <li><NavLink to={'/'}
                        ><FaHome></FaHome> Home</NavLink></li>
                        <li><NavLink to={'/ourmenu'}><FaBars></FaBars> Menu</NavLink></li>
                        <li><NavLink to={'/ourshop/salad'}><FaShoppingBag></FaShoppingBag> Shop</NavLink></li>
                        <li><NavLink to={'/contact'}><FaMailBulk></FaMailBulk> Contact</NavLink></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;