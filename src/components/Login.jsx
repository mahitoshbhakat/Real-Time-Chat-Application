import {FaSignInAlt} from 'react-icons/fa'
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [userData,setUserData] = useState({email:"", password:""});
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleChangeUserData = (e) => {
        const {name, value} = e.target;

        setUserData((prevState)=>({
            ...prevState,
            [name]:value,
        }));
    };

    const handleAuth = async() => {
        setIsLoading(true);
        try{
            await signInWithEmailAndPassword(auth, userData?.email, userData?.password);
            navigate("/chat")
        }catch(error){
            toast.error("User Authentication Failed");
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <section className="flex  justify-center items-center h-[100vh] background-image">
            <div className="wrapper rounded-xl p-5 h-[27rem] w-[20rem] flex flex-col justify-center items-center ">
                <div className="mb-10">
                    <h1 className="text-center text-[28px] font-bold text-white ">Sign In</h1>
                    <p className="text-center text-gray-300">Welcome back, login to continue</p>
                </div>
                <div className="w-full">
                    <input type="email" name="email" onChange={handleChangeUserData} className="border border-[rgba(255,255,255,.2)] w-full rounded-full p-2 bg-[#547792] text- white mb-3 font-medium outline-none placeholder:text-gray-300" placeholder="E-mail"/>
                    <input type="password" name="password" onChange={handleChangeUserData} className="border border-[rgba(255,255,255,.2)] w-full rounded-full p-2 bg-[#547792] text- white mb-3 font-medium outline-none placeholder:text-gray-300" placeholder="Password"/>
                </div>

                <div className="w-full">
                    <button disabled={isloading} onClick={handleAuth} className="bg-[#261FB3] w-full p-2 font-bold rounded-md mt-2 flex items-center gap-2 justify-center">
                        {isloading?<>Processing...</> : <>Sign In<FaSignInAlt/></>}
                    </button>
                </div>

                <div>              
                    <button onClick={() => navigate('/signup')} className="text-gray-300 text-sm mt-3">
                        Don't have an account yet? Sign Up
                    </button>
                </div>
            </div>
            <ToastContainer position="top-center"/>
        </section>    
    )
}

export default Login;