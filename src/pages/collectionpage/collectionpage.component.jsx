import React from 'react'
import {connect} from 'react-redux'

import './collectionpage.styles.scss'
import { selectCollection } from '../../redux/shop/shop.selectors'
import CollectionItem from '../../components/collection-item/collection-item.component'



const CollectionPage = ({match,collection})=>{
    console.log(match.params);
    console.log(collection);
    const {title,items} = collection

    return (
        <div className='collection-page'>
            <h2 className="title">{title}</h2>
            <div className='items'>
                {items.map(item=><CollectionItem key={item.id} item={item} />)}
            </div>
            
        </div>
    )
}

const mapStateToProps = (state,ownProps) => {
    return {
        collection:selectCollection(ownProps.match.params.collectionId)(state)
    }
}

export default connect(mapStateToProps)(CollectionPage);