import video1 from '../../assets/video1.mp4';
import video2 from '../../assets/video2.mp4'
import { useNavigate } from "react-router-dom";

const HeroSection = ()=>{
    const navigate = useNavigate();
    return(
        <section id='heroSection'>
            <div className="flex flex-col items-center mt-6 lg:mt-20">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide text-[#ffff]">Bringing closer all the <br/>
                    <span className="bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text">
                    {" "}  ones you knew
                    </span>
                </h1>
                <p className="mt-10 text-lg text-center text-gray-500 max-w-4xl">"Connect instantly with our real-time chat app – seamless conversations, secure messaging, and a user-friendly interface built for modern communication."</p>
                <div className="flex justify-center my-10">
                    <a onClick={() => navigate('/signin')} className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md text-[#ffff]">Start to Chat</a>
                </div>

                <div className="flex mt-10 justify-center">
                    <video autoPlay loop muted className="rounded-lg w-1/3 border border-blue-700 shadow-blue-400 mx-2 my-4">
                        <source src={video1} type="video/mp4"/>
                        Your browser does not support video tag
                    </video>
                    <video autoPlay loop muted className="rounded-lg w-1/3 border border-blue-700 shadow-blue-400 mx-2 my-4">
                        <source src={video2} type="video/mp4"/>
                        Your browser does not support video tag
                    </video>

                </div>
            </div>
        </section>
    )
}

export default HeroSection;