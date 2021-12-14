import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  let unsubscribeFromAuth = () => null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.log(user);
    });
    return () => {
      unsubscribeFromAuth();
    }
  }, [currentUser]);

  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        {/* switch will stop after one route is matched and not check after that */}
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
