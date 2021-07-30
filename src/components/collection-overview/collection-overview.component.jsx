import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './collection-overview.styles.scss'
import CollectionPreview from '../collection-preview/collection-preview.component'
import { selectCollections } from '../../redux/shop/shop.selectors'

const CollectionOverview = ({collections})=>(
    <div className='collection-overview'>
        {collections.map(collection=><CollectionPreview key={collection.id} title={collection.title} items={collection.items} />)}
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections:selectCollections
})

export default connect(mapStateToProps)(CollectionOverview)