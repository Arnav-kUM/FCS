import React from 'react';

const DetailedView = () => {

    const list = [
        {dept_name : "CSE",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
        {dept_name : "CB",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
        {dept_name : "MATHS",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
        {dept_name : "HCD",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
        {dept_name : "ECE",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
        {dept_name : "SSH",dept_admin_name:"Name",total_courses: 10,total_ta_needed: 100,total_ta_alloted: 72,ta_lef:28},
    
    ]

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
            <div className='mt-3'>
                <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Recommanded:</h1>
                <div className="grid lg:grid-cols-3 md:grid-cols-1 p-8 gap-6">
                    {list.map((item, index)=>(
                        <div key={index} className="w-[270px] h-[270px] border border-gray-300 hover:shadow-lg transition-transform transform hover:scale-105 rounded-lg flex flex-col">
                            <div className="h-[100px] w-full bg-[#3dafaa] text-white p-4 flex-4 rounded-t-lg">
                                <h1 className="py-1 block mt-1 leading-tight font-semibold text-xl text-white hover:underline">{item.dept_name} Deparment</h1>
                                <h3 className="py-3 block mt-1 text-xs text-white font-normal hover:underline">{item.dept_admin_name}</h3>
                            </div>
                            
                            <div className="p-3 py-4 flex-6 text-sm">
                                <p className='mt-2 text-gray-700'>Number of Courses: {item.total_courses}</p>
                                <p className='mt-2 text-gray-700'>Total TAs Needed: {item.total_ta_needed}</p>
                                <p className='mt-2 text-gray-700'>Total TAs Alloted: {item.total_ta_alloted}</p>
                                <p className='mt-2 text-gray-700'>TAs Left: {item.ta_lef}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailedView;
