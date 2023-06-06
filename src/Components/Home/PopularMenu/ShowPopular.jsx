
const ShowPopular = ({ item }) => {

    const { image, name, price, recipe } = item;

    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={image} className="max-w-sm shadow-2xl w-20 rounded-sb-none rounded-e-3xl rounded-b-3xl h-20" />
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl uppercase">{name}----------------------</h1>
                            <p className="">$ {price}</p>
                        </div>
                        <p className="">{recipe}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowPopular;