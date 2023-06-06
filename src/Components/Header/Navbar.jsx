import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/Authproviders";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../Hooks/useCart";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const [cart] = useCart();

    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <Link to={'/'}><li className="hover:underline mr-5">HOME</li></Link>
        <Link><li className="hover:underline mr-5">CONTACT US</li></Link>
        <Link to={'/dashboard'}><li className="hover:underline mr-5">DASHBOARD</li></Link>
        <Link to={'/ourmenu'}><li className="hover:underline mr-5">OUR MENU</li></Link>
        <Link to={'/ourshop/salad'}><li className="hover:underline">OUR SHOP</li></Link>
    </>

    return (
        <div>
            <div className="navbar fixed z-10 bg-black bg-opacity-60 max-w-screen-xl mx-auto text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-yellow-500 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <p className="font-bold">BISTRO BOSS <br /> <span className="font-normal">Restaurant</span></p>
                </div>
                <div className="navbar-center  hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className=" flex items-center gap-2">
                        <Link to={'/dashboard/mycart'}><FaShoppingCart></FaShoppingCart></Link>
                        <div className="mr-3">{cart?.length || ''}</div>
                    </button>
                    {
                        user ? <Link className="mr-2 bg-base-800 p-2 lg:p-3 font-bold text-white rounded-lg hover:bg-red-600"> <button onClick={handleSignOut}>Log out</button></Link>
                            :
                            <Link className="mr-2 bg-base-800 p-2 lg:p-3 font-bold text-white rounded-lg hover:bg-yellow-500" to={"/login"}> <button>Login</button></Link>
                    }

                    {
                        user ? <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                            <img className="w-10 h-10 lg:h-14 lg:w-14 rounded-full" src={user.photoURL} referrerPolicy="no-referrer" />
                        </div>
                            :
                            <Link className="mr-2 bg-base-800 p-2 lg:p-3 font-bold text-white rounded-lg hover:bg-red-600" to={"/signup"}> <button>Sign Up</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;