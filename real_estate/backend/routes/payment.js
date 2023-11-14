const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
var fetchuser = require('../middleware/fetchuser');

const Stripe = require("stripe");
const stripe = Stripe("sk_test_51OCPYhSBb3uJVSHxRyOLljTf8z4jcKjSGQQhbPvQOy1twvl9gX72SxYFoUHqoECf9UDvF7CJm4NJkysW8XQx9dLB00VYeYnEaY");


router.post("/newpayment/:id", async (req, res) => {
    console.log("aa gyi");
    let property = await Property.findById(req.params.id);
    if (!property) { return res.status(404).send("Not Found") };

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: property.title,
                description: property.description
              },
              unit_amount: property.price*100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://127.0.0.1:5173/user/checkoutSuccess',
        cancel_url: 'http://127.0.0.1:5173/user/checkoutFail',
    });
    console.log("session created");
    res.send({url:session.url,propertyid:req.params.id});
});

module.exports = router;

