import React,{useState} from 'react';

import ShopData from "./shop.data.js";
import CollectionPreview from '../../components/collection-preview/collection-preview.component';


const Shop = () => {
    const [collections,setCollections] = useState(ShopData);

    return (
        <div className="shop-page">
            {collections.map(collection=><CollectionPreview key={collection.id} title={collection.title} items={collection.items} />)}
        </div>
    );
}

export default Shop;