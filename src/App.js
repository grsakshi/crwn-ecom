import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        // we return userRef object from createUserProfileDocument function to see if data is modified in that document or not
        const userRef = await createUserProfileDocument(userAuth);
        
        // // This onSnapshot is basically like onAuthStateChanged
        userRef.onSnapshot(snapShot => {
          setCurrentUser(state => ({
            ...state,
            id: snapShot.id,
            ...snapShot.data()
          }));
        });
      } else {
        setCurrentUser(null);
      }
    });
    
    // what does cleanup do?
    return () => unsubscribeFromAuth();
  }, []);

  console.log(currentUser);

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
