import SectionTitle from "../Section/SectionTitle";
import image from "../../../assets/home/featured.jpg"
import './Featured.css'

const Featured = () => {

    return (
        <div className="featured-item text-white bg-fixed">
            <div className="bg-slate-900 bg-opacity-40 py-10">
                <SectionTitle
                    subHeading={"Check it out"}
                    heading={"FEATURED"}
                ></SectionTitle>
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row p-20">
                        <img src={image} className="max-w-sm shadow-2xl" />
                        <div className="text-white">
                            <p>March 20, 2023</p>
                            <h1 className="text-xl my-2">WHERE CAN I GET SOME?</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                            <button className="btn btn-outline border-0 border-b-4 border-white hover:bg-slate-600 mt-3 text-white">Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;