import React, { useState } from "react";
import Modal from "react-modal";
import sellingHistoryData from "../assets/sell.json";

const SellingHistory = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: "New Property",
    price: 0,
    location: "",
    seller: "",
    dateOfListing: new Date().toISOString().substring(0, 10),
    listingType: "sale", // Default listing type
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddProperty = () => {
    // Add the new property to your data source or send it to your backend
    console.log("New Property:", newProperty);
    // You can add your logic to update the data source here
    closeModal();
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
            <th className="py-2 px-4 text-left">Buyer</th>
            <th className="py-2 px-4 text-left">Date of Listing</th>
            <th className="py-2 px-4 text-left">Date of Selling</th>
          </tr>
        </thead>
        <tbody>
          {sellingHistoryData.map((property, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{property.title}</td>
              <td className="py-2 px-4">{property.price}</td>
              <td className="py-2 px-4">{property.location}</td>
              <td className="py-2 px-4">{property.buyer}</td>
              <td className="py-2 px-4">{property.dateOfListing}</td>
              <td className="py-2 px-4">{property.dateOfSale}</td>
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
        <form>
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
          <div>
            <label>
              Listing Type:
              <select
                value={newProperty.listingType}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    listingType: e.target.value,
                  })
                }
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </label>
          </div>
          <button onClick={handleAddProperty}>Add Property</button>
          <button onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default SellingHistory;
