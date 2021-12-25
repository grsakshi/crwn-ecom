import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ShopPage from './pages/shop/shop.component';
import { checkUserSession } from './redux/user/user.actions';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(checkUserSession()), [dispatch]);

  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <div>
      <Header />
      <Switch>
        {/* switch will stop after one route is matched and not check after that */}
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route 
          exact 
          path='/signin' 
          render={ () => currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />} 
        />
      </Switch>
    </div>
  );
}

export default App;
