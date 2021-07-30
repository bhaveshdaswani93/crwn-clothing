import React,{useState} from 'react';
import {Route} from 'react-router-dom'

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCollections } from '../../redux/shop/shop.selectors'


import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collectionpage/collectionpage.component';


const Shop = ({match}) => {
    console.log(match)

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionOverview} />
            <Route path={`${match.path}/:collectionId` } component={CollectionPage} />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    collections:selectCollections
})

export default connect(mapStateToProps)(Shop);