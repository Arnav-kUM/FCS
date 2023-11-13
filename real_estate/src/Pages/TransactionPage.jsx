// import React from 'react';
// import buyingHistoryData from '../assets/buy.json'

// const transaction = () => {
//   return (
//     <div className="container mx-auto py-6">
//       <h1 className="text-2xl font-semibold text-[#9041c1] mb-6">Buying History</h1>
//       <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
//         <thead className="bg-[#9041c1] text-white">
//           <tr>
//             <th className="py-2 px-4 text-left">Property Name</th>
//             <th className="py-2 px-4 text-left">Location</th>
//             <th className="py-2 px-4 text-left">Price</th>
//             <th className="py-2 px-4 text-left">Seller</th>
//             <th className="py-2 px-4 text-left">Buying Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {buyingHistoryData.map((property, index) => (
//             <tr key={index}>
//               <td className="py-2 px-4">{property.title}</td>
//               <td className="py-2 px-4">{property.location}</td>
//               <td className="py-2 px-4">{property.price}</td>
//               <td className="py-2 px-4">{property.seller}</td>
//               <td className="py-2 px-4">{property.dateOfSale}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default transaction;


// 

import React, { useState, useEffect } from 'react';

const Transaction = () => {
  const [buyingHistoryData, setBuyingHistoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/transaction/newtransaction/65527bcf026395692085c47f');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBuyingHistoryData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

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

export default Transaction;
