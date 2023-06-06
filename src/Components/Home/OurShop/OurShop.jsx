import Cover from "../Section/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import img from '../../../assets/shop/banner2.jpg'
import { useState } from "react";
import useMenu from "../../../Hooks/useMenu";
import Map from "./Map";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const OurShop = () => {

    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const {category} = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menus] = useMenu();

    const desserts = menus.filter(item => item.category === 'dessert');
    const pizzas = menus.filter(item => item.category === 'pizza');
    const salads = menus.filter(item => item.category === 'salad');
    const soups = menus.filter(item => item.category === 'soup');
    const drinks = menus.filter(item => item.category === 'drinks');

    return (
        <div>
            <Helmet>
                <title>Bristro Boss | Our Shop</title>
            </Helmet>
            <Cover
                img={img}
                title="Our  Shop"
                para='Would you like try a dish??'
            ></Cover>
            <div className="my-20 text-center">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>

                    <TabList>
                        <Tab>SALAD</Tab>
                        <Tab>PIZZA</Tab>
                        <Tab>SOUPS</Tab>
                        <Tab>DESSERTS</Tab>
                        <Tab>DRINKS</Tab>
                    </TabList>

                    <TabPanel>
                        <Map
                            items={salads}
                        ></Map>
                    </TabPanel>

                    <TabPanel>
                        <Map
                            items={pizzas}
                        ></Map>
                    </TabPanel>

                    <TabPanel>
                        <Map
                            items={soups}
                        ></Map>
                    </TabPanel>

                    <TabPanel>
                        <Map
                            items={desserts}
                        ></Map>
                    </TabPanel>

                    <TabPanel>
                        <Map
                            items={drinks}
                        ></Map>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default OurShop;