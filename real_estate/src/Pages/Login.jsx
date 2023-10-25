import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        if(email !== "" && password !== ""){
            navigate("/home");
        }
        else{
            alert("Please enter emailID and password")
        }
    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-white border-2 border-[#9041c1] shadow-sm px-4 py-2 rounded-lg'>
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-center'>
                        <img className="h-10 inline mr-2 rounded-full" src="/Images/real_estate.webp" alt="Failed to load" />
                    </div>
                    <div className='flex justify-center'>
                    <h1 className='text-2xl font-bold text-[#9041c1] mt-2'>SIGN IN</h1>
                    </div>
                    <div className="flex flex-col text-black py-2">
                        <label className="text-[#9041c1]">Email Id</label>
                        <input
                            className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-[#9041c1]0 focus:bg-gray-200 focus:outline-none"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col text-black py-2">
                        <label className="text-[#9041c1]">Password</label>
                        <input
                            className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-[#9041c1] focus:bg-gray-200 focus:outline-none"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex-auto mt-1">
                        <button
                            type="submit"
                            className="w-full my-5 py-2 bg-[#9041c1] shadow-lg shadow-[#9041c1]/50 hover:shadow-[#9041c1]/40 text-white font-semibold rounded-lg"
                        >
                            SIGN IN
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Login;