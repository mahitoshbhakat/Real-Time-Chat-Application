import React, { useMemo, useState, useEffect, useRef } from "react";
import avathar from '../../public/assets/default.jpg';
import { IoSend } from "react-icons/io5";
// import messageData from "../data/messageData";
import {formatTimestamp} from "../utils/formatTimeStamp"
import { auth, listenForMessage, sendMessage, setReadStatus } from "../firebase/firebase";
import logo from '../../public/assets/chat.png';
import { listenForUser, updateLastSeen } from "../firebase/firebase";
import { useTheme } from "../utils/ThemeContext";
import EmojiPicker from 'emoji-picker-react';
import { FaSmile } from "react-icons/fa";

const Chatbox = ({selectedUser}) =>{
    const [messages, setMessages] = useState([]);
    const[messageText, sendMessageText] = useState("");
    const [isPickerVisible, setPickerVisible] = useState(false); // Toggle for emoji picker
    const scrollRef = useRef(null);
    const [selectedUserProfile, setSelectedUserProfile] = useState(null);
    const {isDarkMode} = useTheme();

    const chatId = auth?.currentUser.uid < selectedUser?.uid ? `${auth?.currentUser?.uid}-${selectedUser?.uid}` : `${selectedUser?.uid}-${auth?.currentUser?.uid}`;
    const user1 = auth.currentUser;
    const user2 = selectedUser;
    const senderEmail= auth?.currentUser?.email;

    useEffect(() => {
    if (selectedUser?.uid) {
        const unsub = listenForUser(selectedUser.uid, setSelectedUserProfile);
        return unsub;
    }
    }, [selectedUser?.uid]);

    const setMessageHandler = (e)=>{
        e.preventDefault();
        const newMessage ={
            sender:senderEmail,
            timestamp :{
                seconds:Math.floor(Date.now()/1000),
                nanoseconds:0
            },
            text : messageText
        } 
        sendMessage(messageText, chatId, user1?.uid, user2?.uid);
        setMessages((prevMessage)=>([...prevMessage, newMessage]));
        sendMessageText("");
    }

    useEffect(() => {
        if (selectedUser && messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            if (latestMessage.sender !== auth.currentUser.email) {
            setReadStatus(
                chatId, 
                auth.currentUser.uid, 
                latestMessage.timestamp?.seconds || 0
            );
            }
        }
    }, [selectedUser, messages, chatId]);


    useEffect(() => {
        if (auth.currentUser?.uid) {
        updateLastSeen(auth.currentUser.uid);
        }
    }, [selectedUser]);


    useEffect(()=>{
        if(scrollRef.current){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    },[messages]);

    useEffect(()=>{
        listenForMessage(chatId,setMessages)
    },[chatId]);

    const sortedMessages = useMemo(()=>{
        return [...messages].sort((a,b)=>{
            const aTimestamp = a?.timestamp?.seconds + a?.timestamp?.nanoseconds/1e9;
            const bTimestamp = b?.timestamp?.seconds + b?.timestamp?.nanoseconds/1e9;
            return aTimestamp-bTimestamp;
        })
        
    },[messages])

    const onEmojiClick = (emojiData) => {
        sendMessageText((prev) => prev + emojiData.emoji);
    };

    return(
        <>
        {selectedUser? <section className={`flex flex-col items-start justify-start h-screen w-[100%] background-image ${isDarkMode? "": "bg-[#E8F1F5]"}`}>
            <header className={`border-b border-[#898989b9] w-[100%] h-[82px] m:h-fit p-4 ${isDarkMode?"bg-[#273F4F]": "bg-[#3F52E3]"}`}>
                <main className="flex items-center gap-3">
                    <span>
                        <img src={selectedUser?.image || avathar} className="w-11 h-11 object-cover rounded-full" alt=""/>
                    </span>

                    <span>
                        <h3 className="font-semibold text-[#ffff] text-lg">{selectedUser?.fullName || "Convo-user"}</h3>
                        <p className={`font-light text-sm ${isDarkMode?"text-gray-400": "text-gray-300"}`}>@{selectedUser?.username || "convouser"}</p>
                        <p className={`text-xs  ${isDarkMode?"text-gray-400": "text-gray-300"}`}>{selectedUserProfile?.lastSeen? "Last seen " + formatTimestamp(selectedUserProfile.lastSeen): "Online"}</p>

                    </span>
                </main>
            </header>

            <main className=" custom-scrollbar relative h-[100vh] w-[100%] flex flex-col justify-between">
                <section className="px-3 pt-5 b-20 lg:pb-10">
                    <div ref={scrollRef} className="overflow-auto h-[80vh]">
                        {sortedMessages?.map((msg, index)=>(
                            <React.Fragment key={index}  >
                                {msg?.sender === senderEmail? (
                                    <div className="flex flex-col items-end w-full">
                                            <span className="flex gap-3 h-auto ms-10">
                                            <div>
                                                <div className={`flex items-center justify-center p-6 rounded-lg shadow-lg ${isDarkMode?"bg-[#ACDCEE]":"bg-[#A2D5F2]"}`}>
                                                    <h4>{msg?.text}</h4>
                                                </div>
                                                <p className="text-gray-500 text-xs mt-3 text-right">{formatTimestamp(msg?.timestamp)}</p>
                                            </div>
                                        </span>
                                    </div>
                                    ): (<div className="flex flex-col items-start w-full">
                                            <span className="flex gap-3 w-[40%] h-auto ms-10">
                                            <img src={selectedUser?.image || avathar} className="h-11 w-11 object-cover rounded-full" alt=""/>
                                            <div>
                                                <div className="flex items-center justify-center p-6 rounded-lg shadow-lg bg-[#d1dbe4]">
                                                    <h4>{msg?.text}</h4>
                                                </div>
                                                <p className="text-gray-500 text-xs mt-3">{formatTimestamp(msg?.timestamp)}</p>
                                            </div>
                                        </span>
                                    </div>)
                            }   
                            </React.Fragment>
                        ))}
                    </div>
                </section>
                <div className="sticky lg:bottom-0 bottom-[60px] p-3 h-fit w-[100%]">
                    <form onSubmit={setMessageHandler} action="" className={`flex items-center ${isDarkMode?"bg-[#94B4C1]":"bg-[#ffff]"} h-[45px] w-[100%] px-2 rounded-lg relative shadow-lg`}>
                        {isPickerVisible && (
                            <div className="absolute bottom-[55px] right-[50px] z-10">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}                        
                        <input value={messageText} onChange={(e) => sendMessageText(e.target.value)} type="text" className="h-full text-[#000B58] outline-none text-[16px] pl-3 pr-[50px] rounded-lg w-[100%]" placeholder="Write your Message :)"/>                       
                        <FaSmile h-
                            onClick={() => setPickerVisible(prev => !prev)}
                            className="cursor-pointer text-gray-500 text-lg mx-12"
                        />
                        <button type="submit" className="flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#213448] hover:bg-[#070F2B]">
                            <IoSend color="white" />
                        </button>
                    </form>
                </div>
            </main>
        </section> : 
        <section className={`h-screen w-[100%]  background-image ${isDarkMode? "": "bg-[#E8F1F5]"}`}>
            <div className="flex flex-col justify-center items-center h-[100vh]">
                <img src={logo} alt="" className="w-[140px] h-[140px]"/>
                <h1 className="text-[30px] font-bold text-[#818FB4] mt-5">Welcome to Convo</h1>
                <p className="text-sm mt-0 text-gray-400">Bringing closer all the ones you knew</p>
            </div>
        </section>}
        </>        
    )
}

export default Chatbox;