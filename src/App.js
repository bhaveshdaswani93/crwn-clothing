import { Route,Switch } from 'react-router-dom'
import {useEffect,useState} from 'react'

import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth,createUserProfileDocument } from './firebase/firebase.utils'




function App() {

  const [appAuth,setAppAuth] = useState(null);

  useEffect(()=>{
    
  let unsubscribeFromAuth = auth.onAuthStateChanged(authUser=>{
      // setAppAuth(user);
      if(authUser) {
        createUserProfileDocument(authUser)
        .then(userRef=>{
          userRef.onSnapshot(snapshot=>{
            setAppAuth({
              id: snapshot.id,
              ...snapshot.data()
            })
          })
        })

     
      } else {
        setAppAuth(authUser);
      }
    
      // console.log(user);
    });

    return unsubscribeFromAuth;

  },[])


  return (
    <div>
      <Header  currentUser={appAuth} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={Shop} />
        <Route path='/sign-in' component={SignInAndSignUpPage} />
      </Switch>
      
    </div>
  );
}

export default App;
