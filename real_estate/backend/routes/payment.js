const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const Property = require('../models/Property');
const User = require('../models/Users');

const JWT_SECRET = 'armoni@Yu';
const express = require("express");
const Stripe = require("stripe");
const { Order } = require("../models/Order");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/payments",fetchuser, async (req, res) => {
    
});

module.exports = router;

