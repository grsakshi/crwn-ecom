import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import './strip.styles.css';
//stripe wants price in cents not usd

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IZGTBSDWky9aSMXUOm8usq6ZmsA5NuTU1gN73mmY9UjQ8rf5HstvWBRoqgzckW84ZZzsLY8Ongjjh0MiF7RA5o600NTWJg0Po';

    const onToken = token => {
        axios({
            url: 'http://localhost:5000/payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        })
        .then(response => {
            alert("Payment Successful");
        })
        .catch(error => {
            console.log('Payment Error: ', error);
            alert("There was an issue with your payment. Please make sure you use the provided credit card.")
        });
    }

    return(
        <StripeCheckout
            className="checkout-button"
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://www.flaticon.com/svg/vstatic/svg/30/30114.svg?token=exp=1616771833~hmac=c8032867fb1fbecf1f09604ddcf5628f'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;