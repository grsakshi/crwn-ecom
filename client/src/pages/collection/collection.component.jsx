import CollectionItem from "../../components/collection-item/collection-item.component";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './collection.styles.css';

const CollectionPage = () => {
    const {collectionId} = useParams();
    //this selector returns the item matching the params and we destructure it directly
    const { title, items } = useSelector(state => state.shop.collections[collectionId]); 

    return (
        <div className="collection-page">
            <h2 className='collection-title'>{title}</h2>
            <div className='collection-items'>
                {
                    items.map(item => (
                        <CollectionItem specific key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default CollectionPage;
