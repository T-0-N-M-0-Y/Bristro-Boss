import { useContext } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/Authproviders";
import { useLocation, useNavigate } from "react-router-dom";


const GoGiFa = () => {

    const { googleSignIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location?.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;

                const saveUser = { name: loggedUser.displayName, email: loggedUser.email }
                console.log(saveUser);

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(redirectTo, { replace: true });
                    })
            })
    }

    return (
        <div>
            <h1 className="my-3 text-center">Or Login With</h1>
            <div className="flex justify-center">
                <FaGoogle onClick={handleGoogleSignIn} className="text-xl"></FaGoogle>
                <FaFacebook className="mx-5 text-xl"></FaFacebook>
                <FaGithub className="text-xl"></FaGithub>
            </div>
        </div>
    );
};

export default GoGiFa;