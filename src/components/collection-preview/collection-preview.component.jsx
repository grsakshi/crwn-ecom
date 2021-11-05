import React from 'react';
import './collection-preview.styles.css'
import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({title, items}) => (
    <div className="collection-preview">
        <h1 className="title_c">{title.toUpperCase()}</h1>
        <div className="preview_c">
            {
                items
                .filter((item, idx) => idx < 4)
                .map(({id, ...otherProps}) => (
                    <CollectionItem key={id} {...otherProps} />
                ))
            }
        </div>
    </div>
);

export default CollectionPreview;