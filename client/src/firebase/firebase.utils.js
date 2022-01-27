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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`); 
    const snapShot = await userRef.get(); 

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});

    // this function return an object like:
    // {
    //     mens: mensCollection, 
    //     womens: womensCollection,
    //     .....
    // }

}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })
    return await batch.commit();
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// for persistance
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    })
}

//gives access to GoogleAuthProvider class from auth library
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
