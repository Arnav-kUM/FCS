import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from 'axios';

const SellingHistory = () => {
  const [userProperties, setUserProperties] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // Define isModalOpen state
  const [newProperty, setNewProperty] = useState({
    title: "",
    price: 0,
    location: "",
    listing_type: "sell",
    description: "",
    status: ""
  });
  const fetchUserProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/property/fetchmylistings', {
        method: 'GET',
        headers: {
          'auth-token': token
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // Convert the response to JSON
      setUserProperties(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }; 

// Call the fetchUserProperties function when the component mounts or whenever the user logs in
useEffect(() => {
    fetchUserProperties();
}, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddProperty = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:3000/api/property/addnew",
        {
          title: newProperty.title,
          description: newProperty.description,
          location: newProperty.location,
          price: newProperty.price,
          listing_type: newProperty.listing_type,
          status: newProperty.status,
        },
        {
          headers: {
            'auth-token': token,
          },
        }
      );
      console.log("New Property added:", response.data);
      // Update user properties after adding a new property
      // fetchUserProperties();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  }; 

  const handleDeleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.delete(`http://localhost:3000/api/property/deleteproperty/${propertyId}`,
      {
        headers: {
          'auth-token': token,
        },
      }
      );
  
      console.log("Property deleted:", response.data);
      // Refresh user properties after deleting a property
      fetchUserProperties();
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-[#9041c1] mb-6">
        Selling History
      </h1>
      <button
        className="bg-[#9041c1] text-white py-2 px-4 rounded-lg shadow-md mb-4"
        onClick={openModal}
      >
        Add Property
      </button>
      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-[#9041c1] text-white">
          <tr>
            <th className="py-2 px-4 text-left">Property Name</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Date of Listing</th>
            <th className="py-2 px-4 text-left">Listing Type</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {userProperties.map((property, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{property.title}</td>
              <td className="py-2 px-4">{property.price}</td>
              <td className="py-2 px-4">{property.location}</td>
              <td className="py-2 px-4">{property.description}</td>
              <td className="py-2 px-4">{property.dateOfListing}</td>
              <td className="py-2 px-4">{property.listing_type}</td>
              <td className="py-2 px-4">
                <button className="bg-blue-500 text-white rounded-lg px-2" onClick={() => handleEdit(property)}>Edit</button>
                <button className="bg-red-500 text-white rounded-lg px-2 ml-2" onClick={() => handleDeleteProperty(property._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Property Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Add Property</h2>
        <form className="mt-2">
          <input
            type="text"
            placeholder="Title"
            value={newProperty.title}
            onChange={(e) =>
              setNewProperty({ ...newProperty, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Price"
            value={newProperty.price}
            onChange={(e) => {
              // Ensure that the input contains only numeric characters
              const numericValue = e.target.value.replace(/\D/g, "");

              setNewProperty({ ...newProperty, price: numericValue });
            }}
          />

          <input
            type="text"
            placeholder="Location"
            value={newProperty.location}
            onChange={(e) =>
              setNewProperty({ ...newProperty, location: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newProperty.description}
            onChange={(e) =>
              setNewProperty({ ...newProperty, description: e.target.value })
            }
          />
          <div className="flex mt-2">
            <div className="mr-4">
              <label>
                Listing Type:
                <select
                  value={newProperty.listing_type}
                  onChange={(e) => 
                    setNewProperty({
                      ...newProperty,
                      listing_type: e.target.value,
                    })
                  }
                >
                  <option value="sell">sell</option>
                  <option value="rent">rent</option>
                </select>
              </label>
            </div>
            <div>
            <label>
              Status:
              <select
                value={newProperty.status}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    status: e.target.value,
                  })
                }
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </label>
            </div>
          </div>
          <button className="bg-green-500 rounded-lg p-2 m-2" onClick={handleAddProperty}>Add Property</button>
          <button className="bg-red-500 rounded-lg p-2 m-2" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default SellingHistory;