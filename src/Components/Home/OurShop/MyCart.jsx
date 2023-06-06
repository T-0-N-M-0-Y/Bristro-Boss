import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const MyCart = () => {

    const [cart, refetch] = useCart()
    console.log(cart);

    const total = cart.reduce((sum, item) => item.price + sum, 0);
    const totalPrice = parseFloat(total.toFixed(2));

    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full h-full mt-10 mx-10">
            <Helmet>
                <title>Bristro Boss | My Cart</title>
            </Helmet>
            <div className="flex justify-evenly items-center mb-5">
                <h1 className="text-xl font-semibold">Total Orders: {cart.length}</h1>
                <h1 className="text-xl font-semibold">Total Price: $ {totalPrice}</h1>
                <Link to={'/dashboard/reservation'}><button className="btn bg-orange-300 w-14 h-10 text-black hover:text-white border-none">Pay</button></Link>
            </div>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                cart.map((item, index) =>
                                    <tr key={item._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">{item.name}</div>
                                        </td>
                                        <td>$ {item.price}</td>
                                        <th>
                                            <button onClick={() => handleDelete(item)} className="btn bg-red-600 text-white border-none"><FaTrashAlt></FaTrashAlt></button>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;