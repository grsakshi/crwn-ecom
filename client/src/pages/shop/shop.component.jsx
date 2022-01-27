import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component.jsx';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';

const ShopPage = ({match}) => {
    const isFetching = useSelector(state => state.shop.isFetching);
    const isCollectionLoaded = useSelector(state => !!state.shop.collections);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCollectionsStart());
    }, [dispatch]);
    return (
        <div className="shop-page">
            {/* doubt: should I use container pattern here for these routes or not to separate the loading 
            states from shop component as we need it to not be concerned about stuff like that */}
            <Route 
                exact 
                path={`${match.path}`} 
                component={
                    isFetching 
                    ? WithSpinner 
                    : CollectionOverview
                } 
            />
            <Route 
                path={`${match.path}/:collectionId`} 
                component={
                    // why we used this instead of isFetching? Because collection page component directly takes the state to display it. If it is rendered before the shop component
                    // and there is delay in loading due to async then our component will give error as it takes fetching value as false. So we need to know if collection is actually loaded or not 
                    isCollectionLoaded
                    ? CollectionPage
                    : WithSpinner
                } 
            />
        </div>
    )
}

export default ShopPage
