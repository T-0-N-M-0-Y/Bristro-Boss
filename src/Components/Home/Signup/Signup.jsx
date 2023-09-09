import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/Authproviders";
import GoGiFa from "../../GoGiFa/GoGiFa";

const SignUp = () => {

    const { createUserForEmailPassLogin, updateUserProfile, logOut } = useContext(AuthContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const navigate = useNavigate()

    const onSubmit = data => {
        console.log(data);

        createUserForEmailPassLogin(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photo)
                    .then(() => {

                        const userSaved = { name: data.name, email: data.email }

                        fetch('https://assignment-12-sports-academies-server-site-t-0-n-m-0-y.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(userSaved)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                }
                            })
                        logOut()
                            .then(() => { })
                            .catch(error => console.log(error))
                        navigate('/login')
                    })
                    .catch(error => console.log(error))
            })
    }

    return (
        <div className='login-form h-screen'>
            <Helmet>
                <title>Bristro Boss | Sign up</title>
            </Helmet>
            <div className='py-24 md:w-1/2 h-screen mx-auto border-2 shadow-2xl'>
                <h1 className='text-2xl font-bold text-center'>Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-500">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-500">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" {...register("photo")} placeholder="Your Photo" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*\d]+$/ })} placeholder="password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-500">password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500">password must be 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-500">password must have a Capital letter & a Special Charecter</p>}
                    </div>
                    <div className="form-control mt-6">
                            <input className="btn bg-orange-800 text-white hover:bg-orange-500 border-none w-full" type="submit" value="Sign Up" />
                    </div>
                </form>
                <GoGiFa></GoGiFa>
            </div>
        </div>
    );
};

export default SignUp;