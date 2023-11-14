const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const Property = require('../models/Property');
const User = require('../models/Users');

const JWT_SECRET = 'armoni@Yu';
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
require("dotenv").config();



router.post("/payments", async (req, res) => {
    const session=await stripe.checkout.session.create({
        line_item:[
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                      name: "plot",
                    },
                    unit_amount: 2000,
                  },
                  quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: '',
        cancel_url: '',

    });
    temp={
        "status":'success'
    }
    res.send(temp);
});

module.exports = router;

