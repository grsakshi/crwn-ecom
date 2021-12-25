import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from "../../assets/crown.svg";

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { signOutStart } from '../../redux/user/user.actions';

import { useSelector, useDispatch } from 'react-redux';

import './header.styles.css';


const Header = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const hidden = useSelector(state => state.cart.hidden);
    return(
        <div className="header">
            <Link className="logo-container" to='/'>
                <Logo className='logo' />
            </Link>
            <div className="options-container">
                <Link className="option" to='/shop'>
                    SHOP
                </Link>
                <Link className="option" to='/shop'>
                    CONTACT
                </Link>
                {
                    currentUser? 
                    <div className='option' onClick={() => dispatch(signOutStart())}>SIGN OUT</div> 
                    : 
                    <Link className='option' to='/signin'>SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown />
            }
        </div>
    );
}

export default Header;