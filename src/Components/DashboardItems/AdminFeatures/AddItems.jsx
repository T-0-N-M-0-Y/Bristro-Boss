import Swal from "sweetalert2";
import AxiosSecure from "../../../Hooks/axiosSecure";
import SectionTitle from "../../Home/Section/SectionTitle";
import { useForm } from 'react-hook-form';

const image_hosting_token = import.meta.env.VITE_IMAGE_TOKEN;

const AddItems = () => {
    const [AXIOS] = AxiosSecure()
    const { register, handleSubmit, reset} = useForm();

    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`

    const onSubmit = data => {

        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                const imgURL = imgResponse.data.display_url;
                const { name, price, category, recipe } = data;
                const newItem = { name, price, category, recipe, image: imgURL }
                console.log(newItem);
                AXIOS.post('/menu', newItem)
                    .then(data => {
                        if (data.data.insertedId) {
                            reset();
                            Swal.fire({
                                title: 'Item Added Success',
                                showClass: {
                                    popup: 'animate__animated animate__fadeInDown'
                                },
                                hideClass: {
                                    popup: 'animate__animated animate__fadeOutUp'
                                }
                            })
                        }
                    })
            })
        console.log(data)
    };

    return (
        <div className="w-full">
            <SectionTitle
                subHeading={'Whats New?'}
                heading={'Add an Item'}
            ></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="ml-10">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text"  {...register("name", { required: true, maxLength: 100 })} placeholder="Recipe Name" className="input input-bordered w-full" />
                </div>

                <div className="mt-2 grid grid-cols-2 gap-3">
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select defaultValue='Select One' {...register("category", { required: true, maxLength: 100 })} className="select select-bordered w-full">
                            <option disabled >Select One</option>
                            <option>Salad</option>
                            <option>Dessert</option>
                            <option>Pizza</option>
                            <option>Soups</option>
                            <option>Drinks</option>
                        </select>
                    </div>
                    <div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Price*</span>
                            </label>
                            <input type="text" {...register("price", { required: true, maxLength: 100 })} placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>

                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details*</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" {...register("recipe", { required: true, maxLength: 400 })} placeholder="Recipe Details"></textarea>

                    <input type="file" {...register("image", { required: true })} className=" file-input file-input-bordered w-96 my-4" />
                </div>

                <input className="bg-orange-300 h-10 w-24 rounded-lg hover:bg-orange-900 text-white" type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItems;