import React,{useState,useEffect} from 'react';
import {Route} from 'react-router-dom'

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCollections,selectIsFetching,selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
import { updateShopCollection,fetchCollectionStartAsync } from '../../redux/shop/shop.actions'
import CollectionOverViewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collectionpage/collectionpage.container';


const Shop = ({match,fetchCollections}) => {
    // console.log(match)
    useEffect(()=>{
        fetchCollections();
    },[]);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionOverViewContainer} />
            <Route path={`${match.path}/:collectionId` } component={CollectionPageContainer} />
        </div>
    );
}
const mapDispatchToProps = dispatch => ({
     fetchCollections:()=>dispatch(fetchCollectionStartAsync()),
    
})

export default connect(null,mapDispatchToProps)(Shop);