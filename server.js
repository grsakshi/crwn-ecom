const express = require("express");
const cors = require("cors");
const path = require("path");
const Stripe = require('stripe');

if(process.env.NODE_ENV !== 'production') require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, error => {
    if(error) throw error;
    console.log('Server running on port ' + port);
});

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd',
        description: 'Making payment request to stripe'
    };
    stripe.charges.create(body, (err, charge) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).send({ success: charge });
        }
    });
});