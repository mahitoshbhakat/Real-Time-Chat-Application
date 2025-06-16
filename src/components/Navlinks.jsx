import chat from '../../public/assets/chat.png';
import { RiNotificationLine, RiArrowDownSLine} from "react-icons/ri";
import { PiSignOutFill } from "react-icons/pi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../utils/ThemeContext";
import { RiFolderUserLine } from "react-icons/ri";


const Navlinks = ({unreadCount})=>{
    const { isDarkMode, toggleTheme } = useTheme();
    
    const handleLogout = async()=>{
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <section className={`sticky lg:static top-0 flex items-center lg:items-start lg: justify-start h-[7vh] lg:h-[100vh] w-[100%] lg:w-[150px] py-8 lg:py-0 ${isDarkMode?"bg-[#070F2B]": "bg-[#3F52E3]"}`}>
            <main className="flex lg:flex-col items-center lg:gap-10 justify-between lg:px-0 w-[100%]">
                <div className="flex items-start justify-center lg: border-b border-b-1 border-[#ffffffb9] lg:w-[100%] p-4">
                    <span className="flex item-center justify-center">
                        <img src={chat} className="w-[56px] h-[52px] object-contain bg-white rounded-lg p-2" alt=""/>
                    </span>
                </div>
                
                <ul className="flex lg:flex-col flex-row items-center gap-7 md:gap-10 px-2 md:px-0">

                    <li>
                        <button className="lg:text-[28px] text-[22px] cursor-pointer">
                            <div className="flex justify-center">
                                <RiNotificationLine color="#fff"/>
                                <p className="text-gray-300 text-sm">{`(${unreadCount})`}</p>
                            </div>
                        </button>
                    </li>

                    <li>
                        <button onClick={toggleTheme} className="lg:text-[28px] text-[22px] cursor-pointer">
                            <MdOutlineLightMode color="#fff"/>
                        </button>
                    </li>

                    <li>
                        <button onClick={handleLogout} className="lg:text-[28px] text-[22px] cursor-pointer">
                            <PiSignOutFill color="#fff"/>
                        </button>
                    </li>
                    
                </ul>

                <button className="block lg:hidden lg:text-[28px] text-[22px] cursor-pointer">
                    <RiArrowDownSLine color="#fff"/>
                </button>
            </main>
        </section>
    )
}

export default Navlinks;