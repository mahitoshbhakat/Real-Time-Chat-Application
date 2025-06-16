import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import avathar from '../../public/assets/default.jpg'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useTheme } from "../utils/ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SearchModal = ({startChat}) => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const { isDarkMode } = useTheme();
    
    const openModel = ()=>  setIsModelOpen(true);
    const closeModel = ()=> setIsModelOpen(false);

    const handleSearch = async()=>{
        if(!searchTerm.trim()){
            toast.warning("Kindly enter the user's name.");
            return;
        }

        try {
            const normalizedSearchTerm = searchTerm.toLowerCase();
            const q = query(collection(db,"user"), where("username" , ">=", normalizedSearchTerm), where("username" , "<=", normalizedSearchTerm +"\uf8ff"));
            const querySnapshot = await getDocs(q);
            const foundUsers = [];
            querySnapshot.forEach((doc)=>{
                foundUsers.push(doc.data());
            });

            setUsers(foundUsers);
            if(foundUsers.length === 0){
                toast.error("No user Found")
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={openModel} className={`w-[35px] p-2 flex items-center justify-center rounded-lg ${isDarkMode?"bg-[#94B4C1]":"bg-[#3F52E3]"}`}>
                <RiSearch2Line color="#ffff" className="w-[18px] h-[18px]"/>
            </button>
            {isModelOpen && (<div className="fixed inset-0 z-[100] flex justify-center items-center bg-[#033c648c]" onClick={closeModel}>
                <div className="relative p-4 w-full max-w-md max-h-full" onClick={(e)=> e.stopPropagation()}>
                    <div className={`relative w-[100%] rounded-md shadow-lg ${isDarkMode?"bg-[#070F2B]":"bg-[#3F52E3]"}`}>
                        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-500">
                            <h3 className="text-xl font-semibold text-gray-100">Search Chat</h3>
                            <button onClick={closeModel} className="text-gray-300 bg-transparent hover:bg-[#ffff] hover:text-[#070F2B] rounded-md text-sm w-8 h-8 inline-flex justify-center items-center">
                                <FaXmark size={20}/>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input onChange={(e)=> setSearchTerm(e.target.value)} type="text" className="bg-gray-200 border-gray-800 text-gray-900 text-sm rounded-lg outline-none w-full p-2.5"/>
                                    <button onClick={handleSearch} className="text-gray-200 px-3 py-2 hover:bg-[#ffff] hover:text-[#070F2B] hover:rounded-lg">
                                        <FaSearch/> 
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                {users?.map((user) =>(
                                        <div key={user?.id} onClick={()=>{
                                            console.log(user);
                                            startChat(user);
                                            closeModel();
                                        }} className={`flex items-start gap-3  p-2 mb-3 rounded-lg cursor-pointer border border-[#ffffff20] shadow-lg ${isDarkMode?"bg-[#547792]":"bg-[#B9D7EA]"} `}>
                                            <img src= {user?.image || avathar} className= "h-[40px] w-[40px] object-cover rounded-full" alt="" />
                                            <span>
                                                <h2 className="p-0 font-semibold text-white text-[18px]">{user?.fullName}</h2>
                                                <p className="text-[13px] text-white">{user?.username}</p>
                                            </span>
                                        </div>
                                )                                    
                                )}                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
            <ToastContainer position="top-center"/>
        </div>
    )
}
export default SearchModal;