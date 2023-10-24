import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const DetailedView = () => {

    const list = [
        {dept_name : "CSE",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
        {dept_name : "CB",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
        {dept_name : "MAT",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
        {dept_name : "HCD",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
        {dept_name : "ECE",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
        {dept_name : "SSH",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
    
    ]

    const navigate = useNavigate();
    const handleViewDetails = () => {
        navigate("/details");
    }

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the component loads
    }, []);

    return (
        <div className='my-2'>
            <div className='flex justify-center'>
                <h1 className='font-bold text-3xl text-[#9041c1] my-2'>Detailed View</h1>
            </div>
            <div className="flex p-4 border border-black shadow-xl">
                <div className="w-1/2 pr-4">
                    <img src="Images/bg.jpg" alt="Fail to Load" className="max-w-full h-auto rounded-lg" />
                </div>
                <div className='border-l border-black'></div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className=''>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Seller:</h1>
                            <h1 className='text-2xl'>Mohit Bansal</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Location:</h1>
                            <h1 className='text-2xl'>Delhi</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Price:</h1>
                            <h1 className='text-2xl'>&#8377; 5cr</h1>
                        </div>
                        <div className='flex mt-8'>
                            <button className='rounded-lg bg-[#9041c1] py-2 px-4 text-white mr-3'>
                                Buy
                            </button>
                            <button className='rounded-lg bg-[#9041c1] py-2 px-4 text-white'>
                                Report Seller
                            </button>
                        </div>
                    </div>
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
    );
}

export default DetailedView;
