import ShopActionTypes from "./shop.types"
import { firestore,convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

export const updateShopCollection = (collections) => ({
    type:ShopActionTypes.UPDATE_COLLECTIONS,
    collections
})

export const fetchCollectionStart = () => ({
  type:ShopActionTypes.FETCH_COLLECTION_START  
})

export const fetchCollectionSuccess = (collections) => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload:collections
})

export const fetchCollectionError = (errorMessage) => ({
    type:ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload:errorMessage
})

export const fetchCollectionStartAsync = (()=>{
    return dispatch =>{
        dispatch(fetchCollectionStart());
        const collectionRef = firestore.collection('collections');
        collectionRef.get()
        .then(snapshot=>{
             console.log(snapshot.docs);
            const updatedCollection  = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionSuccess(updatedCollection));
            // console.log(updatedCollection)
            // updateCollection(updatedCollection);
            // setIsLoading(false);
        }).catch(e=>dispatch(fetchCollectionError(e.errorMessage)));
    }
});