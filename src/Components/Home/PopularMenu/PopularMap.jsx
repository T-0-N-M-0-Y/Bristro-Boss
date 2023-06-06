import ShowPopular from "./ShowPopular";

const PopularMap = ({ items }) => {
    return (
        <div>
                {
                    items.map(item => <ShowPopular
                        key={item._id}
                        item={item}
                    ></ShowPopular>)
                }
        </div>
    );
};

export default PopularMap;