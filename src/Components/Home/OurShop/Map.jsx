import FoodCard from "./FoodCard";

const Map = ({ items }) => {

    return (
        <div className="grid grid-cols-3 gap-5 mx-14">
            {
                items.map(item => <FoodCard
                    key={item._id}
                    item={item}
                ></FoodCard>)
            }
        </div>
    );
};

export default Map;