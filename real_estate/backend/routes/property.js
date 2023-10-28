const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const Property = require('../models/Property');
const JWT_SECRET = 'armoni@Yu';

// ROUTE 1: Get loggedin User to add property Details using: POST "/api/property/addnew" || Login required
router.post('/addnew', fetchuser, [
    body('title', 'Title should be at least 3 characters long.')
      .isLength({ min: 3 })
      .exists(),
  
    body('description', 'Description should not exceed 50 characters.')
      .isLength({ max: 50 })
      .optional(),
  
    body('images', 'Upload an Image')
      .optional(),
  
    body('location', 'Location should be at least 5 characters long.')
      .isLength({ min: 5 })
      .exists(),
  
    body('price', 'Enter a valid price')
      .isNumeric()
      .exists(),
  
    body('listing_type', 'Listing type should be either "rent" or "sell."')
      .isIn(['rent', 'sell'])
      .exists(),
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
        status: req.body.status
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
    console.log(req.user.id);
    console.log(properties)
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

  module.exports = router
