import { Link } from "react-router-dom";
import MenuItems from "../MenuItems/MenuItems";
import Cover from "../Section/Cover";

const MenuCategory = ({ items, title, coverImg, para }) => {

    return (
        <div>
            {title && <Cover img={coverImg} title={title} para={para}></Cover>}
            <div className="grid grid-cols-2 gap-2 my-10">
                {
                    items.map(item => <MenuItems
                        key={item._id}
                        item={item}
                    ></MenuItems>)
                }
            </div>
            <Link to={`/ourshop/${title}`}>
                <div className="text-center">
                    <button className=" btn btn-outline border-0 border-b-4 border-slate-600 hover:bg-slate-600 mb-20">ORDER YOUR FAVOURITE FOOD</button>
                </div>
            </Link>
        </div>
    );
};

export default MenuCategory;