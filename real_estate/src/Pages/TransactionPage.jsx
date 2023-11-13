import React from 'react';
import buyingHistoryData from '../assets/buy.json'

const BuyingHistory = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-[#9041c1] mb-6">Buying History</h1>
      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-[#9041c1] text-white">
          <tr>
            <th className="py-2 px-4 text-left">Property Name</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Seller</th>
            <th className="py-2 px-4 text-left">Buying Date</th>
          </tr>
        </thead>
        <tbody>
          {buyingHistoryData.map((property, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{property.title}</td>
              <td className="py-2 px-4">{property.location}</td>
              <td className="py-2 px-4">{property.price}</td>
              <td className="py-2 px-4">{property.seller}</td>
              <td className="py-2 px-4">{property.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyingHistory;
