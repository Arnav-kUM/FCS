import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";

const images = ['Images/bg.jpg', 'Images/bg.jpg', 'Images/bg.jpg'];
const Home = () => {
    const list = [
        { dept_name: "CSE", dept_admin_name: "Name", total_courses: 10, total_ta_needed: 100, total_ta_alloted: 72, ta_left: 28 },
        { dept_name: "CB", dept_admin_name: "Name", total_courses: 10, total_ta_needed: 100, total_ta_alloted: 72, ta_left: 28 },
        { dept_name: "MAT", dept_admin_name: "Name", total_courses: 10, total_ta_needed: 100, total_ta_alloted: 72, ta_left: 28 },
        { dept_name: "HCD", dept_admin_name: "Name", total_courses: 10, total_ta_needed: 100, total_ta_alloted: 72, ta_left: 28 },
        { dept_name: "ECE", dept_admin_name: "Name", total_courses: 10, total_ta_needed: 100, total_ta_alloted: 72, ta_left: 28 },
        { dept_name: "SSH", dept_admin_name: "Name", total_courses: 10, total_ta_needed: 100, total_ta_alloted: 72, ta_left: 28 },
    ];
    const navigate = useNavigate();
    const handleViewDetails = () => {
        navigate("/details");
    }

    return (
        <div>
            <NavBar />
            <div className='mx-10 mt-2'>
                <div className="relative">
                    <img className="w-screen h-[350px] blur-[4px] rounded-sm" src="Images/bg.jpg" alt="" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-3 rounded-full border border-[#5f41c1] focus:outline-none w-[500px]"
                        />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 p-4 bg-[#9041c1] rounded-full search-button">
                            <AiOutlineSearch />
                        </button>
                    </div>
                </div>
                <h1 className='font-bold text-2xl text-[#9041c1] mx-2 mt-4'>Recommanded:</h1>
                <div className="flex flex-wrap justify-around mt-2">
                    {list.map((item, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-md w-[30%] mb-4 border border-[#9041c1]">
                            <img className='rounded-lg' src="Images/bg.jpg" alt="Failed to Load" />
                            <div className='flex justify-center'>
                                <p>{item.dept_name}</p>
                                <p>{item.dept_admin_name}</p>
                                <p>Total Courses: {item.total_courses}</p>
                                <p>Total TA Needed: {item.total_ta_needed}</p>
                                <p>Total TA Allotted: {item.total_ta_allotted}</p>
                                <p>TA Left: {item.ta_left}</p>
                            </div>
                            <div className='flex justify-center'>
                                <button className="bg-[#9041c1] text-white py-2 px-4 rounded-md mt-2"
                                onClick={handleViewDetails}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
