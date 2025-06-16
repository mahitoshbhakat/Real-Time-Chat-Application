import {FaUserPlus} from 'react-icons/fa'
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase/firebase'
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    const [userData,setUserData] = useState({fullName:"", email:"", password:""});
    const [isLoading, setIsLoading] = useState(false);
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
            const userCredential = await createUserWithEmailAndPassword(auth, userData?.email, userData?.password);
            const user = userCredential.user;

            const userDocRef = doc(db, "user", user.uid);

            await setDoc(userDocRef,{
                uid:user.uid,
                email:user.email,
                username:user.email?.split("@")[0],
                fullName:userData.fullName,
                image:"",
            });
            navigate('/chat'); 
        }catch{
            console.log("error");
        }finally{
            setIsLoading(false);
        }
    }
    
    return(
        <section className="flex  justify-center items-center h-[100vh] background-image">
            <div className="wrapper rounded-xl p-5 h-[27rem] w-[20rem] flex flex-col justify-center items-center ">
                <div className="mb-10">
                    <h1 className="text-center text-[28px] font-bold text-white ">Sign Up</h1>
                    <p className="text-center text-gray-300">Welcome, create an account to continue</p>
                </div>
                <div className="w-full">
                    <input type="text" name="fullName" onChange={handleChangeUserData} className="border border-[rgba(255,255,255,.2)] w-full rounded-full p-2 bg-[#547792] text- white mb-3 font-medium outline-none placeholder:text-gray-300" placeholder="Full Name"/>
                    <input type="email" name="email" onChange={handleChangeUserData} className="border border-[rgba(255,255,255,.2)] w-full rounded-full p-2 bg-[#547792] text- white mb-3 font-medium outline-none placeholder:text-gray-300" placeholder="E-mail"/>
                    <input type="password" name="password" onChange={handleChangeUserData} className="border border-[rgba(255,255,255,.2)] w-full rounded-full p-2 bg-[#547792] text- white mb-3 font-medium outline-none placeholder:text-gray-300" placeholder="Password"/>
                </div>

                <div className="w-full">
                    <button disabled={isLoading} onClick={handleAuth} className="bg-[#261FB3] w-full p-2 font-bold rounded-md mt-2 flex items-center gap-2 justify-center">
                        {isLoading? <>Processing...</> : <>Register <FaUserPlus/></>}
                    </button>
                </div>

                <div>
                    <button onClick={()=> (navigate('/signin'))} className="text-gray-300 text-sm mt-3">Already have an account? Sign In</button>
                </div>
                
            </div>
        </section>
    )
}

export default Register;