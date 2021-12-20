import React from 'react';
import { withRouter } from 'react-router-dom';
import './collection-preview.styles.css'
import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({title, items, history, match}) => (
    <div className="collection-preview">
        <h1 className="title_c" onClick={() => history.push(`${match.path}/${title.toLowerCase()}`)}>{title.toUpperCase()}</h1>
        <div className="preview_c">
            {
                items
                .filter((item, idx) => idx < 4)
                .map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))
            }
        </div>
    </div>
);

export default withRouter(CollectionPreview);