import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import CallUs from "./Call/CallUs";
import Featured from "./Featured/Featured";
import PopularMenu from "./PopularMenu/PopularMenu";
import Boss from "./Section/Boss";
import Swiiper from "./Swiper/Swiiper";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bristro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Swiiper></Swiiper>
            <Boss></Boss>
            <PopularMenu></PopularMenu>
            <CallUs></CallUs>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;