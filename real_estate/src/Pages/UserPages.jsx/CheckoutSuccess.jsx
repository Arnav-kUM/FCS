import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/authContext';

const CheckoutSuccess = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('propertyId');

    if (propertyId) {
      
      // Make a request to your newtransaction API here, passing propertyId and user.id in the request body
      // Example using fetch:
      fetch('http://localhost:3000/api/transaction/newtransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId, userId: user.id }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
          // Handle error if needed
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false once the request is complete
        });
    } else {
      setIsLoading(false); // Set loading to false if propertyId is not available
    }
  }, [user.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-lg mx-auto bg-green-100 p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-green-800 mb-4">
          Payment Successful
        </h2>
        <p className="text-gray-700 mb-4">
          Thank you for your payment! Your transaction was successful.
        </p>
        <p className="text-gray-700 mb-4">
          An email confirmation has been sent to your registered email address.
        </p>
        <p className="text-gray-700">
          If you have any questions or concerns, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
