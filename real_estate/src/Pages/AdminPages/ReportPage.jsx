// components/ReportedPropertiesList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/authContext';

const ReportedPropertiesList = () => {
  const { user } = useContext(AuthContext);
  const [reportedProperties, setReportedProperties] = useState([]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      // Fetch reported properties only if the user is an admin
      fetchReportedProperties();
    }
  }, [user]);

  const fetchReportedProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/property/reportedproperties', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReportedProperties(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleActionButton = async (propertyId) => {
    console.log(localStorage.getItem('token'))
    try {
      // Call the deleteproperty API
      const response = await axios.delete(`http://localhost:3000/api/property/deletepropertybyadmin/${propertyId}`, {
      });

      // Log the success message and update the UI if needed
      console.log(response.data.Success);
      // You may want to update the UI or re-fetch the reported properties after deletion
      fetchReportedProperties();
    } catch (error) {
      console.error(error.response.data);
      // Handle errors if needed
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reported Properties List</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Reports</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportedProperties.map((property) => (
            <tr key={property._id}>
              <td className="py-2 px-4 border-b">{property.title}</td>
              <td className="py-2 px-4 border-b">{property.reports}</td>
              <td className="py-2 px-4 border-b">
                {/* Add a button to call an API for each property */}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleActionButton(property._id)}
                >
                  Remove Property
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Function to handle the action button click for each property

};

export default ReportedPropertiesList;
