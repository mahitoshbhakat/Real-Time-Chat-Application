import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navlinks from './components/Navlinks';
import Chatbox from './components/Chatbox';
import Chatlist from './components/Chatlist';
import Register from './components/Register';
import Login from './components/Login';
import { auth } from './firebase/firebase';
import { getUnreadChatCount } from './utils/chatUnreadUtils';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Landing page components
import Navbar from './components/landingPage/Navbar';
import HeroSection from './components/landingPage/heroSection';
import FeatureSection from './components/landingPage/FeatureSection';
import WorkFlow from './components/landingPage/WorkFlow';
import Testinomials from './components/landingPage/Testinomials';
import Footer from './components/landingPage/Footer';

const LandingPage = () => (
  <>
    <Navbar />
    <HeroSection />
    <FeatureSection />
    <WorkFlow />
    <Testinomials />
    <Footer />
  </>
);

const ChatApp = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUsers(currentUser);
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsers(user);
    });
    return () => unsubscribe();
  }, []);

  const unreadCount = users ? getUnreadChatCount(chats, users.uid) : 0;

  return users ? (
    <div className='flex lg:flex-row flex-col items-start w-[100%]'>
      <Navlinks unreadCount={unreadCount} />
      <Chatlist setSelectedUser={setSelectedUser} chats={chats} setChats={setChats} />
      <Chatbox selectedUser={selectedUser} />
    </div>
  ) : (
    <div >
           {isLogIn? <Login isLogIn={isLogIn} setIsLogIn={setIsLogIn}/> : <Register isLogIn = {isLogIn} setIsLogIn={setIsLogIn}/> }
    </div>
  );
};

const App = () => (
  <Router>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Login isLogIn={true} setIsLogIn={() => {}} />} />
      <Route path="/signup" element={<Register isLogIn={false} setIsLogIn={() => {}} />} />
      <Route path="/chat" element={<ChatApp />} />
    </Routes>
  </Router>
);

export default App;
