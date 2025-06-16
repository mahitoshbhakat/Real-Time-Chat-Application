import { useState } from 'react';
import logo from '../../../public/assets/chat.png'
import {navItems} from '../../constants';
import { Menu,X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';


const Navbar = ()=>{
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleNavbar = ()=>{
        setMobileDrawerOpen(!mobileDrawerOpen);
    }

    return(
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <a href='#heroSection'>
                            <img className='h-10 w-10 mr-2' src={logo} alt="logo" />
                            <span className='text-xl tracking-tight text-blue-600 font-semibold'>Convo</span>
                        </a>
                    </div>
                    <ul className='hidden lg:flex ml-14 space-x-12'>
                        {navItems.map((Items, index) =>(
                            <li key={index}>
                                <a href={Items.href} className='text-gray-200'>{Items.label}</a>
                            </li>
                        ))}
                    
                    </ul>

                    <div className='hidden lg:flex justify-center space-x-12 items-center'>
                        <button onClick={() => navigate('/signin')} className='cursor-pointer py-2 px-3 border rounded-md text-[#ffff]'>
                            Sign In
                        </button>
                        <button onClick={() => navigate('/signup')} className='cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 py-2 px-3 rounded-md text-[#ffff]'>
                            Create an Account
                        </button>
                    </div>  
                    <div className='lg:hidden md: flex flex-col justify-end'>
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen? <X color='#ffff'/>: <Menu color='#ffff'/>}
                        </button>
                    </div>

                </div>
                {mobileDrawerOpen && (
                    <div className='lg:hidden fixed right-0 z-20 bg-[#213448] w-full p-12 flex flex-col justify-center items-center'>
                        <ul>
                            {navItems.map((Items, index)=>(
                                <li key={index} className='py-4 text-gray-100'>
                                    <a href={Items.href}>
                                        {Items.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className='flex space-x-6'>
                            <a onClick={()=>navigate('/signin')} className='cursor-pointer py-2 px-3 border rounded-md text-[#ffff] '>Sign In</a>
                            <a onClick={()=>navigate('/signup')} className='cursor-pointer py-2 px-3 border rounded-md bg-gradient-to-r from-blue-500 to-blue-800 text-[#ffff]'>Create an account</a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
export default Navbar;