import { Parallax } from 'react-parallax';

const Cover = ({ img, title, para }) => {

    return (
        <div>
            <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={img}
                bgImageAlt="None"
                strength={-200}
            >
                <div className="hero h-[600px]" style={{ backgroundImage: `url(${img})` }}>
                    <div className="hero-overlay bg-opacity-40"></div>
                    <div className="hero-content text-center text-neutral-content bg-slate-900 px-64 py-20 bg-opacity-60">
                        <div className="max-w-md text-white">
                            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                            <p className="mb-5">{para}</p>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    );
};

export default Cover;