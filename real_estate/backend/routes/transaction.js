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
router.post('/newtransaction/:id', fetchuser,  async (req, res) => {

    try {
        const nu=req.user.id;
        const pid=req.params.id;
        let property = await Property.findById(req.params.id);
        const ou=property.owner
        if (property.status.toString() !== 'available') {
            console.log("asfsdfsdf");
            return res.status(401).send("Property not available");
        }
        const transaction = await Transaction.create({
            property: pid,
            prevowner: ou,
            newowner: nu,
            amount: property.price,
            type:property.type
          });
        const newProperty = {};
        newProperty.owner=nu;
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