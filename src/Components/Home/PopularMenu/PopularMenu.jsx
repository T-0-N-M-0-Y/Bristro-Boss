import SectionTitle from "../Section/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import PopularMap from "./PopularMap";
import { Link } from "react-router-dom";

const PopularMenu = () => {

    const [menus] = useMenu();
    const popular = menus.filter(item => item.category === 'popular');

    // const [popularMenus, setPopularMenus] = useState([]);

    // useEffect(() => {
    //     fetch("menu.json")
    //         .then(res => res.json())
    //         .then(data => {
    //             const items = data.filter(item => item.category === 'popular');
    //             setPopularMenus(items)
    //         })
    //     // .catch(error => console.log(error))
    // }, [])

    return (
        <section>
            <SectionTitle
                subHeading={"---Check it out---"}
                heading={"FROM OUR MENU"}
            ></SectionTitle>
            <PopularMap
                items={popular}
            ></PopularMap>
            <div className="text-center">
                <Link to={'/ourmenu'}>
                    <button className="btn btn-outline border-0 border-b-4 border-slate-600 hover:bg-slate-600 mt-3">Read More</button>
                </Link>
            </div>
        </section>
    );
};

export default PopularMenu;