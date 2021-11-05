import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from "../../assets/crown.svg";

// import { auth } from '../../firebase/firebase.utils';

// import CartIcon from '../cart-icon/cart-icon.component';
// import CartDropdown from "../cart-dropdown/cart-dropdown.component";

// import { useSelector } from 'react-redux';

import './header.styles.css';


const Header = () => {
    // const currentUser = useSelector(state => state.user.currentUser);
    // const hidden = useSelector(state => state.cart.hidden);
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
                {/* {
                    currentUser? 
                    <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink> 
                    : 
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
                } */}
                {/* <CartIcon /> */}
            </div>
            {/* {
                hidden ? null: <CartDropdown />
            } */}
        </div>
    );
}

export default Header;