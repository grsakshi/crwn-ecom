import React from 'react';

import { useSelector } from 'react-redux';

// import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
// import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.style.css';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const total = useSelector(state => state.cart.cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0
    ));

    return(
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {/* {
                cartItems.map(cartItem => (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))
            } */}
            <div className='total'>
                <span>TOTAL: ${total}</span>
            </div>
            <div className='test-warning'>
                *Please use the following test credit card for payments*
                <br/>
                4242 4242 4242 4242 - Exp: Any future date Eg. 01/25 - CVV: 123
            </div>
            {/* <StripeCheckoutButton className="checkout-button" price={total}/> */}
        </div>
    );
}


export default CheckoutPage;