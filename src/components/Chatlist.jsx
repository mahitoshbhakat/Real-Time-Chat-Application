import React, { useEffect, useMemo } from "react";
import SearchModal from './SearchModal'; 
import { RiMore2Fill } from "react-icons/ri";
import avathar from '../../public/assets/default.jpg'
import { useState } from "react";
// import chatData from '../data/chat'
import { formatTimestamp } from "../utils/formatTimeStamp";
import { auth, db, listenForChats } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { uploadToCloudinary, updateProfileImage } from '../firebase/firebase';
import ProfileModal from "./profileModal";
import { setReadStatus } from '../firebase/firebase';
import { hasUnreadMessages } from '../utils/chatUtils';
import { useTheme } from "../utils/ThemeContext";


const Chatlist = ({setSelectedUser, chats, setChats}) =>{

    const [user, setUser] = useState(null);
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const { isDarkMode } = useTheme();
    const [viewProfileUser, setViewProfileUser] = useState(null);

    useEffect(()=> {
        const userDocRef = doc(db, "user", auth?.currentUser?.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc)=>{
            setUser(doc.data());
        });
        return unsubscribe;
    },[])

    useEffect(()=>{
        const unsubscribe = listenForChats(setChats);
        return ()=>{
            unsubscribe();
        }
    },[setChats])

    const handleImageUpload = async (file) => {
  const imageUrl = await uploadToCloudinary(file);
  await updateProfileImage(auth.currentUser.uid, imageUrl);
  // update local state or UI accordingly
};


    const sortedChats = useMemo(()=>{
        return [...chats].sort((a,b)=>{
            const aTimestamp = a?.lastMessageTimestamp?.seconds + a?.lastMessageTimestamp?.nanoseconds/1e9;
            const bTimestamp = b?.lastMessageTimestamp?.seconds + b?.lastMessageTimestamp?.nanoseconds/1e9;
            return bTimestamp - aTimestamp;
        });
    },[chats])

    const startChat = (user)=>{
        setSelectedUser(user);
    }

    const handleChatClick = async (chat) => {
        setSelectedUser(chat.users.find((u) => u.email !== auth.currentUser.email));
        const lastMsgTime =
            (chat?.lastMessageTimestamp?.seconds || 0) +
            (chat?.lastMessageTimestamp?.nanoseconds || 0) / 1e9;
        await setReadStatus(chat.id, auth.currentUser.uid, lastMsgTime);
    };

    return(
        <>  
            {viewProfileUser && (<ProfileModal user={viewProfileUser} onClose={() => setViewProfileUser(null)} isReadOnly={true} />)}
            <section className={`relative hidden lg:flex flex-col item-start justify-start ${isDarkMode?"bg-[#273F4F]":"bg-[#FFFFFF]"} h-[100vh] w-[100%] md: w-[600px]`}>
                
                <header className="flex items-center justify-between w-[100%] lg:border-b border-b-1 border-[#898989b9] p-4 sticky md:static top-0 z-[100]">
                    <main className="flex items-center gap-3">
                        <div className="relative cursor-pointer" onClick={() => setProfileModalOpen(true)}>
                            <img
                                src={user?.image || avathar}
                                className="w-[44px] h-[44px] object-cover rounded-full"
                                alt="User Profile"
                            />
                        </div>
                        <span>
                            <h3 className={`p-0 font-semibold text-[] md:text-[17px] ${isDarkMode?"text-[#EFEEEA]":"text-[#1B1B1B]"}`}>{user?.fullName|| "convo user"}</h3>
                            <p className={`p-0 font-light text-gray-400 text-[15px] ${isDarkMode?"text-gray-400":"text-gray-500"}`}>@{user?.username || "convo"}</p>
                        </span>
                    </main>
                    <button className={`w-[35px] p-2 flex items-center justify-center rounded-lg ${isDarkMode?"bg-[#94B4C1]":"bg-[#3F52E3]"}`}>
                        <RiMore2Fill color={isDarkMode?"#ffff":"#ffffff"}  className="w-[28px] h-[28px]"/>
                    </button>
                </header>

                <div className="w-[100%] mt-[10px] px-5">
                    <header className="flex items-center justify-between">
                        <h3 className={`text-[16px] text-gray-200 ${isDarkMode?"text-gray-200":"text-gray-600"}`}>Message ({chats?.length || 0})</h3>
                        <SearchModal startChat={startChat}/>
                    </header>
                </div>

                <main className="flex flex-col items-start mt-[1.5rem] pb-3">
                    {sortedChats?.map((chat)=>{
                        const otherUser = chat?.users?.find((u) => u.uid !== auth.currentUser.uid);
                        const unread = hasUnreadMessages(chat, auth.currentUser.uid);
                        return(
                        <React.Fragment key={chat?.uid || chat?.id || Math.random()}>
                            <button key={chat?.uid}  className="flex  items-start justify-between w-[100%] border-b border-gray-600 px-5 pb-3 pt-3" onClick={() => handleChatClick(chat)}>                   
                            {chat?.users?.filter((user)=>(user?.email !== auth.currentUser.email))
                            .map((user)=>(
                                <React.Fragment key={user?.email || user?.uid || Math.random() }>
                                    <div  className="flex items-start gap-3" onClick={()=> startChat(user)}>
                                        <div className="relative">
                                            <img src={user?.image || avathar} className="h-[40px] w-[40px] rounded-full object-cover" alt="" onClick={(e) => {e.stopPropagation(); setViewProfileUser(user);}}  />
                                            {unread && (<span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>)}
                                        </div>
                                        <span>
                                            <h2 className={`p-0 font-semibold text-left text-[17px] ${isDarkMode?"text-[#ffff]":"text-[#1B1B1B]"}`}>{user?.fullName || "Convo-User"}</h2>
                                            <p className={`p-0 font-light text-gray-400 text-left text-[17px] ${isDarkMode?"text-gray-400":"text-gray-500"}`}>{chat?.lastMessage || "convo"}</p>
                                        </span>
                                    </div>
                                    <p className="p-0 font-semibold text-gray-400 text-left text-[12px]">{formatTimestamp(chat?.lastMessageTimestamp)}</p>
                                </React.Fragment>
                            ))}
                            </button>
                        </React.Fragment>
                    )})}
                </main>
                {isProfileModalOpen && (
                    <ProfileModal
                        user={user}
                        onClose={() => setProfileModalOpen(false)}
                        onImageUpload={handleImageUpload}
                    />
                )}
            </section>
        </>
    )
}

export default Chatlist;