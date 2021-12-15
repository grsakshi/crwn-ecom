import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Whenever we call the onAuthStateChanged or onSnapshot methods from auth library or referenceObject, we get back a function that lets us unsubscribe from the listener we just instantiated
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        // we return userRef object from createUserProfileDocument function to see if data is modified in that document or not
        const userRef = await createUserProfileDocument(userAuth);
        
        // // This onSnapshot is basically like onAuthStateChanged
        userRef.onSnapshot(snapShot => 
          dispatch(
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          )
        );
      }
      dispatch(setCurrentUser(userAuth));
    });
    
    // what does cleanup do?
    return () => unsubscribeFromAuth();
  }, [dispatch]);

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
