import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyBUOQUbMp5p_aVDybr1QcEOetgY_2PJD-k",
  authDomain: "crwn-ecom-42819.firebaseapp.com",
  projectId: "crwn-ecom-42819",
  storageBucket: "crwn-ecom-42819.appspot.com",
  messagingSenderId: "432247526117",
  appId: "1:432247526117:web:e78c9e6b85e28b7deffa0c",
  measurementId: "G-ZHKZXENPLE"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//gives access to GoogleAuthProvider class from auth library
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
