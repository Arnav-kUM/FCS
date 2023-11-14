const express = require('express');
const router = express.Router();

const Stripe = require("stripe");
const stripe = Stripe("sk_test_51OCPYhSBb3uJVSHxRyOLljTf8z4jcKjSGQQhbPvQOy1twvl9gX72SxYFoUHqoECf9UDvF7CJm4NJkysW8XQx9dLB00VYeYnEaY");


router.post("/newpayment", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://127.0.0.1:5173/user/checkoutSuccess',
        cancel_url: 'http://127.0.0.1:5173/user/checkoutFail',
    });
    res.send({url:session.url});
});

module.exports = router;

