const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'armoni@Yu';

router.post('/newtransaction/:id', fetchuser,  async (req, res) => {
    
    try {
        const nu=req.user.id;
        const pid=req.params.id;
        let property = await Property.findById(req.params.id);
        const ou=property.owner
        if (property.status.toString() !== 'available') {
            return res.status(401).send("Property not available");
        }
        const transaction = await Transaction.create({
            prevowner: ou,
            newowner: nu,
            amount: property.price,
            type:req.body.type
          });
      res.send(transaction)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
