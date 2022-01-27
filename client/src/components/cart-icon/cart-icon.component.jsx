import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

import './cart-icon.styles.css';


const CartIcon = () => {
    const itemCount = useSelector(state => state.cart.cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,0));
    const dispatch = useDispatch();
    return(
        <div className='cart-icon' onClick={() => dispatch(toggleCartHidden())}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{itemCount}</span>
        </div>
    )
};

export default CartIcon;

