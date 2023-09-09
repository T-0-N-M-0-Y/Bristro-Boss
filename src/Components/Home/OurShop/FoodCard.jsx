import { useContext } from "react";
import { AuthContext } from "../../../Providers/Authproviders";
import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";

const FoodCard = ({ item }) => {

    const { _id, image, name, price, recipe } = item;
    const { user } = useContext(AuthContext);
    const [ , refetch] = useCart();

    const handleAddToCart = item => {
        console.log(item);
        if (user && user.email) {
            const oderItem = { menuItemId: _id, name, image, price, email: user.email }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(oderItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch(); //refetch to update the number of items to the cart
                        Swal.fire({
                            title: 'Added To Cart',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    }
                })
        }
    }

    return (
        <div>
            <div className="card w-96 h-full bg-slate-100 hover:shadow-lg transform hover:scale-105 transition duration-300">
                <figure>
                    <img src={image} alt="Shoes" className="" />
                </figure>
                <p className="absolute right-0 m-3 p-2 bg-black text-white">${price}</p>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions">
                        <button onClick={() => handleAddToCart(item)} className="btn btn-primary border-1  bg-slate-300 border-b-4 border-yellow-600 text-yellow-600">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;