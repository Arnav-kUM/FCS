import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import axios from "axios";
import AuthContext from "../../context/authContext";

const ContractsPage = () => {
  const [outgoingContracts, setOutgoingContracts] = useState([]);
  const [incomingContracts, setIncomingContracts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerification = async (contractId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contract/verify",
        { contractId } // Send contractId in the request body
      );

      console.log(response.data);
      setVerificationResult(response.data.message);
    } catch (error) {
      console.error(error);
      // Handle errors, display a message, or perform additional actions
    }
  };
  const fetchBuyerContracts = async () => {
    try {
      const userId = user.id; // Assuming your user object has an 'id' property

      const response = await axios.post(
        "http://localhost:3000/api/contract/buyer",
        { buyerId: userId } // Send user ID in the request body
      );
      console.log(response);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.data;
      console.log(data);

      if (data !== undefined) {
        setOutgoingContracts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSellerContracts = async () => {
    try {
      const userId = user.id; // Assuming your user object has an 'id' property

      const response = await axios.post(
        "http://localhost:3000/api/contract/seller",
        { sellerId: userId } // Send user ID in the request body
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.data;
      console.log(data);

      if (data !== undefined) {
        setIncomingContracts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Call these functions wherever you need to fetch buyer and seller contracts
  // e.g., useEffect, button click, etc.
  useEffect(() => {
    fetchBuyerContracts();
    fetchSellerContracts();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePayment = async (contractId) => {
    console.log(contractId)
    try {
      const response = await axios.post('http://localhost:3000/api/payment/newpayment', {
        contractId: contractId,
      });
  
      if (response.data.url) {
       
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(error.message);
      // Handle errors, display a message, or perform additional actions
    }
  };
  

  


  const handleAccept = async (contractId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contract/accept",
        { sellerId: user.id, contractId }
      );

      console.log(response.data);
      // You can update the UI or perform additional actions on success
      fetchSellerContracts(); // Refresh contracts after accepting
    } catch (error) {
      console.error(error);
      // Handle errors, display a message, or perform additional actions
    }
  };

  const handleReject = async (contractId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contract/reject",
        { sellerId: user.id, contractId }
      );

      console.log(response.data);
      // You can update the UI or perform additional actions on success
      fetchSellerContracts(); // Refresh contracts after rejecting
    } catch (error) {
      console.error(error);
      // Handle errors, display a message, or perform additional actions
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-[#9041c1] mb-6">
        My Contracts
      </h1>

      {/* Outgoing Contracts */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Outgoing Contracts</h2>
        <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg mb-4">
          {/* ... Table header */}
          <tbody>
            {outgoingContracts.map((contract, index) => (
              <tr key={index}>
                {/* Display contract details */}
                <td className="py-2 px-4">{contract.sellerName}</td>
                <td className="py-2 px-4">{contract.terms}</td>
                <td className="py-2 px-4">{contract.propertyName}</td>
                <td className="py-2 px-4">
                  {contract.status === "accepted" ? (
                    <button
                      className="bg-[#27ae60] text-white rounded-lg px-2"
                      disabled
                    >
                      Accepted
                    </button>
                  ) : contract.status === "rejected" ? (
                    <button
                      className="bg-[#27ae60] text-white rounded-lg px-2"
                      disabled
                    >
                      Rejected
                    </button>
                  ) : (
                    <>
                      <button
                        className="bg-[#45BF55] text-white rounded-lg px-2"
                        disabled
                      >
                        Outgoing
                      </button>
                    </>
                  )}
                  {contract.status === "accepted" && (
                    <button
                      className="bg-[#3498db] text-white rounded-lg px-2 ml-2"
                      onClick={() => handlePayment(contract._id)}
                    >
                      Payment
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Incoming Contracts */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Incoming Contracts</h2>
        <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
          {/* ... Table header */}
          <tbody>
            {incomingContracts.map((contract, index) => (
              <tr key={index}>
                {/* Display contract details */}
                <td className="py-2 px-4">{contract.buyerName}</td>
                <td className="py-2 px-4">{contract.terms}</td>
                <td className="py-2 px-4">{contract.propertyName}</td>
                <td className="py-2 px-4">
                  {contract.status === "accepted" ? (
                    <button
                      className="bg-[#27ae60] text-white rounded-lg px-2"
                      disabled
                    >
                      Accepted
                    </button>
                  ) : (
                    <>
                      <button
                        className="bg-[#45BF55] text-white rounded-lg px-2"
                        onClick={() => handleAccept(contract._id)}
                        disabled={contract.status === "accepted"}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-[#E53E3E] text-white rounded-lg px-2 ml-2"
                        onClick={() => handleReject(contract._id)}
                        disabled={contract.status === "accepted"}
                      >
                        Reject
                      </button>
                      <button
                        className="bg-[#3498db] text-white rounded-lg px-2 ml-2"
                        onClick={() => handleVerification(contract._id)}
                        disabled={contract.status === "accepted"}
                      >
                        Verify
                      </button>
                    </>
                  )}
                  {verificationResult && <p>{verificationResult}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractsPage;
