const express = require('express');
const User = require('../models/Users');
const Contract = require('../models/Contract')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const Property = require('../models/Property');
const JWT_SECRET = 'armoni@Yu';

// ROUTE 1: Get loggedin User to add property Details using: POST "/api/property/addnew" || Login required
router.post('/addnew', fetchuser, [
    body('title').custom((value, { req }) => {
        if (!value || value.length < 3) {
          throw new Error('Title should be at least 3 characters long.');
        }
        return true;
      }),
    
      body('description').custom((value, { req }) => {
        if (value && value.length > 50) {
          throw new Error('Description should not exceed 50 characters.');
        }
        return true;
      }),
    
      body('images', 'Images should be an array if provided.')
        .optional(),

      body('location').custom((value, { req }) => {
        if (!value || value.length < 3) {
          throw new Error('Location should be at least 5 characters long.');
        }
        return true;
      }),
    
      body('price').custom((value, { req }) => {
        if (!value || isNaN(value)) {
          throw new Error('Enter a valid price');
        }
        return true;
      }),
      
      body('listing_type').custom((value, { req }) => {
        if (!['rent', 'sell'].includes(value)) {
          throw new Error('Listing type should be either: rent OR sell');
        }
        return true;
      }),
  ],  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
      const property = await Property.create({
        title: req.body.title,
        description: req.body.description || null,
        images:req.body.images || null,
        location:req.body.location,
        price: req.body.price,
        owner: req.user.id,
        listing_type: req.body.listing_type,
        status: "available"
      });
      res.send(property)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

// Route 2 fetch the listings of the logged in user || logged in required
router.get('/fetchmylistings', fetchuser, async (req, res) => {
try {
    const properties = await Property.find({ owner: req.user.id });
    res.json(properties)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})

// Route 3 delete the listings of the logged in user || logged in required
router.delete('/deleteproperty/:id', fetchuser, async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        if (!property) { return res.status(404).send("Not Found") }

        if (property.owner.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        property = await Property.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Property has been deleted", property: property });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 4 update the listings of the logged in user || logged in required
router.put('/updateproperty/:id', fetchuser, async (req, res) => {
    const { title, description, image,price,listing_type,location } = req.body;
    // const title = req.body
    // console.log(description);
    try {
        // Create a newProperty object
        const newProperty = {};

        if (title) { newProperty.title = title };
        if (description) { newProperty.description = description };
        if (image) { newProperty.image = image };
        if (price) { newProperty.price = price };
        if (listing_type) { newProperty.listing_type = listing_type };
        
        // Find the Property to be updated and update it
        let property = await Property.findById(req.params.id);
        if (!property) { return res.status(404).send("Not Found") }
        if (property.owner.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        property = await Property.findByIdAndUpdate(req.params.id, { $set: newProperty }, { new: true })
        res.json({ property });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchavailablelistings', async (req, res) => {
  const { type } = req.query;
  try {
    let query = { status: 'available' };

    if (type) {
      query.listing_type = type;
    }

    const properties = await Property.find(query);
    res.json(properties);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/fetchproperty/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.json({ message: 'Property not found' });
    }

    const owner = await User.findById(property.owner);

    if (owner) {
      // Create a new object with the owner's name
      const propertyWithOwnerName = {
        ...property.toObject(),
        ownerName: owner.name,
      };

      res.json(propertyWithOwnerName);
    } else {
      // Fallback to 'Unknown' if owner not found
      property.ownerName = 'Unknown';
      res.json(property);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

const sign_function = (data, privateKey) => {
  privateKey = crypto.createPrivateKey({
      key: Buffer.from(privateKey, 'base64'),
      format: 'pem',
      type: 'pkcs8'
  });
  const signer = crypto.createSign('SHA256');
  signer.update(data);
  signer.end();

  const signature = signer.sign(privateKey, 'base64');
  return signature;
};

// Route 7: Book a property with signing
router.post('/bookproperty/:id', async (req, res) => {
  try {
      const property = await Property.findById(req.params.id);

      if (!property) {
          return res.json({ message: 'Property not found' });
      }

      // Fetch the buyer's private key based on their user ID (assumes you have implemented this logic)
      const buyerId = req.body.buyer; // Get the buyer's user ID from the request
      const buyer = await User.findById(buyerId);

      if (!buyer || !buyer.privateKey) {
          return res.json({ message: 'Buyer not found or private key missing' });
      }

      const buyerPrivateKey = buyer.privateKey; // Get the buyer's private key

      // Create the contract data
      const contractData = {
          seller: property.owner, // Set the seller to the property's owner
          buyer: req.body.buyer, // Set the buyer based on your authentication or request data
          property: property._id, // Set the property to the booked property
          type: req.body.type, // Set the type (rent or buy) based on your form or request data
          terms: req.body.terms, // Set the contract terms based on your form or request data
      };

      // Use the private key to sign the contract data
      const signature = sign_function(JSON.stringify(contractData), buyerPrivateKey);

      // Include the contract data and the signature in the contract object
      const contract = new Contract({
          ...contractData,
          signature: signature, // Include the signature in the contract
      });
      // Save the signed contract to the database
      await contract.save();

      // You can perform additional actions, such as updating the property's status here
      res.json({ message: 'Property booked successfully', contract });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
});


module.exports = router
