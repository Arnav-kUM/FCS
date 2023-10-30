import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailedView = () => {

    const { propertyId } = useParams();
    const [owner, setOwner] = useState();
    const [propertyDetails, setPropertyDetails] = useState([]);
    const [recommendedProperties, setRecommendedProperties] = useState([]);

    const navigate = useNavigate();
    const handleViewDetails = (propertyId) => {
        navigate(`/details/${propertyId}`);
    }
    const fetchPropertyDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/property/fetchproperty/${propertyId}`);
          setPropertyDetails(response.data);
        } catch (error) {
          console.error(error);
        }
    };
    const getRecommendedProperties = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/property/fetchavailablelistings?type=sell`);
          setRecommendedProperties(response.data);
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        window.scrollTo(0, 0); getRecommendedProperties();
        if (propertyId) {
            fetchPropertyDetails();
        }
    }, [propertyId]);

    useEffect(() => {
        if (propertyDetails.owner) {
            const ownerName = axios.get(`http://localhost:3000/api/auth/getuser/${propertyDetails.owner}`);
            ownerName.then((response) => {
                setOwner(response.data);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [propertyDetails.owner]);

    return (
        <div className='my-2'>
            <div className='flex justify-center'>
                <h1 className='font-bold text-3xl text-[#9041c1] my-2'>Detailed View:</h1>
            </div>
            <div className="flex p-4 border border-black shadow-xl">
                <div className="w-1/2 pr-4">
                    <img src="/Images/bg.jpg" alt="Fail to Load" className="max-w-full h-auto rounded-lg" />
                </div>
                <div className='border-l border-black'></div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className=''>
                    <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>{propertyDetails.title}</h1>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Seller:</h1>
                            <h1 className='text-2xl'>{owner}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Location:</h1>
                            <h1 className='text-2xl'>{propertyDetails.location}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Description:</h1>
                            <h1 className='text-2xl'>{propertyDetails.description}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>For:</h1>
                            <h1 className='text-2xl'>{propertyDetails.listing_type}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Availability:</h1>
                            <h1 className='text-2xl'>{propertyDetails.status}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Date of Listing:</h1>
                            <h1 className='text-2xl'>{propertyDetails.dateOfListing}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Price:</h1>
                            <h1 className='text-2xl'>$ {propertyDetails.price}</h1>
                        </div>
                        <div className='flex mt-8'>
                            <button className='rounded-lg bg-[#9041c1] py-2 px-4 text-white mr-3'>
                                Book
                            </button>
                            <button className='rounded-lg bg-[#9041c1] py-2 px-4 text-white'>
                                Report Seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
    );
}

export default DetailedView;
