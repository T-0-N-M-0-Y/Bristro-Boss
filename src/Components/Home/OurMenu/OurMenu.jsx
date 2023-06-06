import { Helmet } from 'react-helmet-async';
import Cover from '../Section/Cover';
import useMenu from '../../../Hooks/useMenu';
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import SectionTitle from '../Section/SectionTitle';
import MenuCategory from './MenuCategory';

const OurMenu = () => {

    const [menus] = useMenu();


    const dessert = menus.filter(item => item.category === 'dessert');
    const pizza = menus.filter(item => item.category === 'pizza');
    const salad = menus.filter(item => item.category === 'salad');
    const soup = menus.filter(item => item.category === 'soup');
    const offered = menus.filter(item => item.category === 'offered');

    return (
        <div className='text-start'>
            <Helmet>
                <title>Bristro Boss | Our Menu</title>
            </Helmet>
            <Cover
                img={menuImg}
                title='Our menu'
                para='Would you like try a dish??'
            ></Cover>
            <SectionTitle
                subHeading={"Dont Miss"}
                heading={"Todays offer"}
            ></SectionTitle>
            <MenuCategory
                items={offered}
            ></MenuCategory>

            <MenuCategory
                items={dessert}
                coverImg={dessertImg}
                title='dessert'
                para='Would you like try a dish?'
            ></MenuCategory>

            <MenuCategory
                items={pizza}
                coverImg={pizzaImg}
                title='pizza'
                para='Would you like try a dish??'
            ></MenuCategory>

            <MenuCategory
                items={salad}
                coverImg={saladImg}
                title='salad'
                para='Would you like try a dish??'
            ></MenuCategory>

            <MenuCategory
                items={soup}
                coverImg={soupImg}
                title='soup'
                para='Would you like try a dish??'
            ></MenuCategory>

        </div>
    );
};

export default OurMenu;