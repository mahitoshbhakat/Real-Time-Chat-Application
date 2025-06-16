import { CheckCircle2 } from "lucide-react";
import chatImage from '../../../public/assets/chatImage.png'
import {checklistItems} from "../../constants";

const WorkFlow = ()=>{
    return(
        <section id="workflow">
            <div className="mt-2">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide text-[#ffff]">
                    Connect. Collaborate. 
                    <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
                        Create. 
                    </span>
                </h2>
                <div className="flex flex-wrap justify-center">
                    <div className="p-2 w-full lg:w-1/2">
                        <img src={chatImage} alt="ChatImage"/>
                    </div>
                    <div className="lg:pt-18 sm:pt-1 w-full lg:w-1/2">
                        {checklistItems.map((items,index)=>(
                            <div key={index} className="flex mb-12">
                                <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                                    <CheckCircle2/>
                                </div>
                                <div>
                                    <h5 className="mt-1 mb-2 text-xl text-[#ffff]">{items.title}</h5>
                                    <p className="text-md text-neutral-400">{items.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WorkFlow;