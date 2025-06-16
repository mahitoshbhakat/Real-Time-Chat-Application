import { features } from "../../constants";

const FeatureSection = ()=>{
    return(
        <section id="features">
            <div className="relative mt-20 border-b border-neutral-900 min-h-[500px]">
                <div className="text-center">
                    <span className="bg-[#213448] text-blue-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
                        feature
                    </span>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide text-[#ffff]">Easily communicate
                        <span className="bg-gradient-to-r from-blue-300 to-blue-800 text-transparent bg-clip-text">{" "}with your friend</span>
                    </h2>
                </div>

                <div className="flex flex-wrap mt-10 lg:mt-20">
                    {features.map((items,index)=>(
                        <div key={index} className="w-full sm:1/2 lg:w-1/3 px-15">
                            <div className="flex">
                                <div className="flex mx-6 h-10 w-10 p-2 bg-[#213448] text-blue-200 justify-center items-center rounded-full">
                                    {items.icon}
                                </div>
                                <div>
                                    <h5 className="mt-1 mb-6 text-xl text-[#ffff]">{items.text}</h5>
                                    <p className="text-md p-2 mb-20 text-neutral-400">{items.description}</p>
                                </div>
                            </div>
                        </div>

                    ))} 
                </div>

            </div>
        </section>
    )
}

export default FeatureSection;