import { Helmet } from "react-helmet-async";
import GoGiFa from "../../GoGiFa/GoGiFa";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/Authproviders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);
 
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const navigate = useNavigate()

    const onSubmit = data => {
        console.log(data);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photo)
                    .then(() => {

                        const saveUser = { name: data.name, email: data.email }
                        console.log(saveUser);

                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        title: 'Wellcome To Bristro Boss!!!',
                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        }
                                    })
                                }
                            })
                        navigate('/')
                    })
                    .catch(error => console.log(error))
            })
    }

    return (
        <div className='login-form h-screen'>
            <Helmet>
                <title>Bristro Boss | Sign up</title>
            </Helmet>
            <div className='py-20 w-1/2 h-screen mx-auto border-2 shadow-2xl'>
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
                        <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20 })} placeholder="password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-500">password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500">password must be 6 characters</p>}
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn bg-yellow-600 text-white hover:bg-green-700 border-none" type="submit" value="Sign Up" />
                    </div>
                </form>
                <GoGiFa></GoGiFa>
            </div>
        </div>
    );
};

export default Signup;