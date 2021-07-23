import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDSIDfZXjN7AT_orWbFh8B9XFhi4uZ8VSE",
    authDomain: "crwn-db-2efc5.firebaseapp.com",
    projectId: "crwn-db-2efc5",
    storageBucket: "crwn-db-2efc5.appspot.com",
    messagingSenderId: "828121009384",
    appId: "1:828121009384:web:40d6b5013b7767bf5d4d5d",
    measurementId: "G-TYG8PQN1NJ"
  };

  firebase.initializeApp(config);

  export const auth =  firebase.auth();
  export const firestore = firebase.firestore();

  export const createUserProfileDocument = async(authUser,additionalData) => {
    if(!authUser) return false;

    const userRef = firestore.doc(`users/${authUser.uid}`);
    const userSnap = await userRef.get();

    if(!userSnap.exists) {

      try  {
        const {displayName,email} = authUser;
        const createdAt = new Date();

        const data = {
          displayName,
          email,
          createdAt,
          ...additionalData
        }
        await userRef.set(data);
      } catch(e) {
        console.log('error creating new user',e.message)
      }
      
    }

    return userRef;
    

  }

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

