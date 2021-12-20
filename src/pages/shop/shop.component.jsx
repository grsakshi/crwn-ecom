import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { updateCollections } from '../../redux/shop/shop.actions.js';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component.jsx';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';

const ShopPage = ({match}) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const collectionRef = firestore.collection('collections');
        const unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(updateCollections(collectionMap));
            setIsLoading(false);
        })
        return () => unsubscribeFromSnapshot();
    }, [dispatch]);
    return (
        <div className="shop-page">
            <Route 
                exact 
                path={`${match.path}`} 
                component={
                    isLoading 
                    ? WithSpinner 
                    : CollectionOverview
                } 
            />
            <Route 
                path={`${match.path}/:collectionId`} 
                component={
                    isLoading
                    ? WithSpinner
                    : CollectionPage
                } 
            />
        </div>
    )
}

export default ShopPage
