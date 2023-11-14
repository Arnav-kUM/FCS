import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProperties = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/transaction/gettransaction',
        {
          headers: {
            'auth-token': token,
          },
        }
        );
        const transactionData = response.data;
        
        await fetchPropertyDetails(transactionData);
        await sellerDetails(transactionData);
        await buyerDetails(transactionData);

        setTransactions(transactionData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const fetchPropertyDetails = async (transactions) => {
    try {
      const transactionsWithDetails = await Promise.all(
        transactions.map(async (transact) => {
          const propertyDetails = await axios.get(`http://localhost:3000/api/property/fetchproperty/${transact.property}`);
          return {
            ...transact,
            property: propertyDetails.data.title,
          };
        })
      );

      setTransactions(transactionsWithDetails);
    } catch (error) {
      console.error("Error fetching property details:", error.message);
    }
  };

  const sellerDetails = async (transactions) => {
    try {
      const transactionsWithDetails = await Promise.all(
        transactions.map(async (transact) => {
          const userDetails = await axios.get(`http://localhost:3000/api/auth/getuser/${transact.prevowner}`);
          return {
            ...transact,
            prevowner: userDetails.data.name,
          };
        })
      );

      setTransactions(transactionsWithDetails);
    } catch (error) {
      console.error("Error fetching seller details:", error.message);
    }
  };

  const buyerDetails = async (transactions) => {
    try {
      const transactionsWithDetails = await Promise.all(
        transactions.map(async (transact) => {
          const userDetails = await axios.get(`http://localhost:3000/api/auth/getuser/${transact.newowner}`);
          return {
            ...transact,
            newowner: userDetails.data.name,
          };
        })
      );

      setTransactions(transactionsWithDetails);
    } catch (error) {
      console.error("Error fetching buyer details:", error.message);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-[#9041c1] mb-6">Buying History</h1>
      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-[#9041c1] text-white">
          <tr>
            <th className="py-2 px-4 text-left">Property Name</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Seller</th>
            <th className="py-2 px-4 text-left">Buyer</th>
            <th className="py-2 px-4 text-left">Listed For</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transact, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{transact.property}</td>
              <td className="py-2 px-4">None</td>
              <td className="py-2 px-4">None</td>
              <td className="py-2 px-4">{transact.prevowner}</td>
              <td className="py-2 px-4">{transact.newowner}</td>
              <td className="py-2 px-4">{transact.type}</td>
              <td className="py-2 px-4">{transact.amount}</td>
              <td className="py-2 px-4">{transact.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProperties;
