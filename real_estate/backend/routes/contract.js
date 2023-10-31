const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const User = require('../models/Users');
const crypto = require('crypto');

const verify_contract = (contract, publicKey) => {
  // Extract the contract data and signature
  console.log(publicKey)
  const { signature, ...contractData } = contract._doc; // Use _doc to access document properties

  // Serialize the contract data
  const serializedData = JSON.stringify(contractData);

  // Create a verifier using the public key
  const verifier = crypto.createVerify('SHA256');
  verifier.update(serializedData);

  // Verify the contract data with the provided signature and public key
  const isVerified = verifier.verify(publicKey, signature, 'base64');

  return isVerified;
};

// Create a new route for verifying a document
router.post('/verify/:contractId', async (req, res) => {
  try {
    const contractId = req.params.contractId;

    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    // Find the user (buyer) associated with the contract
    const buyer = await User.findById(contract.buyer);

    if (!buyer || !buyer.publicKey) {
      return res.status(400).json({ message: 'Buyer not found or public key missing' });
    }

    // Verify the contract using the buyer's public key
    const isVerified = verify_contract(contract, buyer.publicKey);

    if (isVerified) {
      res.json({ message: 'Contract is verified and authentic' });
    } else {
      res.status(400).json({ message: 'Contract verification failed' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/seller/:sellerId', async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const contracts = await Contract.find({ seller: sellerId });

    const contractsWithBuyerNames = await Promise.all(
      contracts.map(async (contract) => {
        const buyer = await User.findById(contract.buyer);
        const buyerName = buyer ? buyer.name : 'Unknown Buyer';
        return {
          ...contract._doc,
          buyerName,
        };
      })
    );

    res.json(contractsWithBuyerNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
