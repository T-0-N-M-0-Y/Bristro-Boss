import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../Home/Section/SectionTitle';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AxiosSecure from '../../../Hooks/axiosSecure';

const ManageItems = () => {

    const [menus, , refetch] = useMenu();
    const [AXIOS] = AxiosSecure();

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
                AXIOS.delete(`/menu/${item._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
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
        <div className='w-full mx-10'>
            <SectionTitle
                subHeading={'Hurry Up'}
                heading={'Manage All Items'}
            ></SectionTitle>

            <div className="flex justify-evenly items-center mb-5">
                <h1 className="text-xl font-semibold">Total Items: {menus.length}</h1>
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
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                menus.map((item, index) =>
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
                                            <button className="btn bg-orange-300 text-white border-none"><FaEdit></FaEdit></button>
                                        </th>
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

export default ManageItems;