import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PayButton from './PayButton';

const Home = () => {
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecommendedProperties();
  }, []);

  const getRecommendedProperties = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/property/fetchavailablelistings`);
      console.log(response.data)
      setRecommendedProperties(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/user/details/${propertyId}`);
  }

  return (
    <div>
      <NavBar />
      <div className='mx-10 mt-2'>
        <div className="relative">
          <img className="w-screen h-[350px] blur-[4px] rounded-sm" src="/Images/bg.jpg" alt="" />
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
        <PayButton/>
        <h1 className='font-bold text-2xl text-[#9041c1] mx-2 mt-4'>Recommended:</h1>
        <div className="flex flex-wrap justify-around mt-2">
          {recommendedProperties.map((property, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-md w-[30%] mb-4 border border-[#9041c1]">
              <img className='rounded-lg' src='/Images/bg.jpg' alt="Failed to Load" />
              <div className='flex justify-center'>
                <p className='mx-1 font-bold'>{property.title}</p>
                <p>|</p>
                <p className='mx-1 font-bold'>{property.location}</p>
                <p>|</p>
                <p className='mx-1 font-bold'>Price: ${property.price}</p>
                <p>|</p>
                <p className='mx-1 font-bold'>Listing Type: {property.listing_type}</p>
                {/* You can add more property details here */}
              </div>
              <div className='flex justify-center'>
                <button className="bg-[#9041c1] text-white py-2 px-4 rounded-md mt-2" onClick={() => handleViewDetails(property._id)}>
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
