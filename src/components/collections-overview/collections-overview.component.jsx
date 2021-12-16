import React from 'react';

import { useSelector } from 'react-redux';

import CollectionPreview from '../collection-preview/collection-preview.component'; 

import './collections-overview.styles.css';

const CollectionOverview = () =>{ 
    const collections = useSelector(state => Object.keys(state.shop.collections).map(key => state.shop.collections[key]));
    return(
        <div className='collection-overview'>
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                ))
            }
        </div>
    );
}


export default CollectionOverview;

