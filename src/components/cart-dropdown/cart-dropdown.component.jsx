import React from 'react';
// import {withRouter} from 'react-router-dom';

import CartItem from "../cart-item/cart-item.component";
import CustomButton from '../custom-button/custom-button.component';
// import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {useSelector} from 'react-redux';

import './cart-dropdown.styles.css';


const CartDropdown = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    // const dispatch = useDispatch()
    return(
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems.length 
                    ? cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                    : (<span className='empty-message'>Your cart is empty</span>)
                }
            </div>
            <CustomButton 
                // onClick={() => {
                // history.push('/checkout');
                // dispatch(toggleCartHidden);
                // }}
            >GO TO CHECKOUT</CustomButton>
        </div>
    );
}

export default CartDropdown;