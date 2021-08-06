import React,{useState,useEffect} from 'react';
import {Route} from 'react-router-dom'

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCollections,selectIsFetching } from '../../redux/shop/shop.selectors'
import { updateShopCollection,fetchCollectionStartAsync } from '../../redux/shop/shop.actions'



import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collectionpage/collectionpage.component';


import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


const Shop = ({match,fetchCollections,isLoading}) => {
    console.log(match)
    // const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        fetchCollections();
        // const collectionRef = firestore.collection('collections');
        
    //    const unsubscribeFromCollections =  collectionRef.onSnapshot(snapshot=>{
    //         // console.log(snapshot.docs);
    //         const updatedCollection  = convertCollectionsSnapshotToMap(snapshot);
    //         // console.log(updatedCollection)
    //         updateCollection(updatedCollection);
    //         setIsLoading(false);

    //     });
    //     return unsubscribeFromCollections;
        // collectionRef.get()
        // .then(snapshot=>{
        //      console.log(snapshot.docs);
        //     const updatedCollection  = convertCollectionsSnapshotToMap(snapshot);
        //     // console.log(updatedCollection)
        //     updateCollection(updatedCollection);
        //     setIsLoading(false);
        // })

    },[]);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} render={props=>(<CollectionOverviewWithSpinner isLoading={isLoading} {...props} />)} />
            <Route path={`${match.path}/:collectionId` } render={props=>(<CollectionPageWithSpinner isLoading={isLoading} {...props} />)} />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    collections:selectCollections,
    isLoading:selectIsFetching
})

const mapDispatchToProps = dispatch => ({
    updateCollection:(collections) => dispatch(updateShopCollection(collections)),
    fetchCollections:()=>dispatch(fetchCollectionStartAsync())
})

export default connect(mapStateToProps,mapDispatchToProps)(Shop);