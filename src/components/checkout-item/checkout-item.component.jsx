import React from 'react';
import './checkout-item-style.css'; 

import { useDispatch } from 'react-redux';
import {clearItemFromCart, addItem, removeItem} from '../../redux/cart/cart.actions';


const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const {name, imageUrl, price, quantity} = cartItem;
    return(
        <div className='checkout-item'>
            <div className='image-container'>
                <img className='checkout-image' src={imageUrl} alt="item"/>
            </div>
            <span className='checkout-name'>{name}</span>
            <span className='checkout-quantity'>
                <div className='arrow' onClick={() => dispatch(removeItem(cartItem))}>
                    &#10094;
                </div>
                <span className='checkout-item-value'>{quantity}</span>
                <div className='arrow' onClick={() => dispatch(addItem(cartItem))}>
                    &#10095;
                </div>
            </span>
            <span className='checkout-price'>{price}</span>
            <div 
                className='remove-checkout-button'
                onClick={() => dispatch(clearItemFromCart(cartItem))}
            >
                &#10005;
            </div>
        </div>
    )};

export default CheckoutItem;