const SectionTitle = ({heading, subHeading}) => {
    
    return (
        <div className="text-center my-10 w-3/12 mx-auto">
            <p className="text-yellow-400">---{subHeading}---</p>
            <h3 className="text-2xl font-bold border-slate-400 border-y-4 py-2 uppercase">{heading}</h3>
        </div>
    );
};

export default SectionTitle;