const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const Property = require('../models/Property');
const User = require('../models/Users');

const JWT_SECRET = 'armoni@Yu';

// Route 1: create a new transaction - Login required
router.post('/newtransaction', async (req, res) => {
  try {
    const newOwner = req.body.userId;
    const propertyId = req.body.propertyId;
    console.log(newOwner)
    console.log(propertyId)
        let property = await Property.findById(propertyId);
        const CurOwner=property.owner
        if (property.status.toString() !== 'available') {
            console.log("asfsdfsdf");
            return res.status(401).send("Property not available");
        }
        const transaction = await Transaction.create({
            property: propertyId,
            prevowner: CurOwner,
            newowner: newOwner,
            amount: property.price,
            type:property.type
          });
        const newProperty = {};
        newProperty.owner=newOwner;
        newProperty.transacted = 'yes';
        if (!property) { return res.status(404).send("Not Found") }
        property = await Property.findByIdAndUpdate(req.params.id, { $set: newProperty }, { new: true })
      res.send(transaction)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

// Route 2: get all my transactions: Login required 
router.get('/gettransaction', fetchuser,  async (req, res) => {

  try {
    const transactions = await Transaction.find({$or: [{ prevowner: req.user.id }, { newowner: req.user.id }]});
    res.json(transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router