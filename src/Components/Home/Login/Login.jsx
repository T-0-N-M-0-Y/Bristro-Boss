import './Login.css'
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../Providers/Authproviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoGiFa from '../../GoGiFa/GoGiFa';
import Swal from 'sweetalert2'


const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location?.state?.from?.pathname || "/";

    const { signIn } = useContext(AuthContext);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Login Success',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate(redirectTo, { replace: true });
            })
    }

    return (
        <div className='login-form h-screen'>
            <Helmet>
                <title>Bristro Boss | Login</title>
            </Helmet>
            <div className='py-20 w-1/2 mx-auto border-2 shadow-2xl'>
                <form onSubmit={handleLogin} className="card-body">
                    <h1 className='text-2xl font-bold text-center'>Login</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>

                        <input type="text" name='password' placeholder="password" className="input input-bordered" />

                    </div>
                    <div className="form-control mt-6">
                        <input className="btn bg-yellow-600 text-white hover:bg-green-700 border-none" type="submit" value="Login" />
                    </div>
                </form>
                <Link to={'/signup'}><p className='text-yellow-500 text-center'>New here?? Create an Account</p></Link>
                <GoGiFa></GoGiFa>
            </div>
        </div>
    );
};

export default Login;