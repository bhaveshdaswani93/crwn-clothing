import { Route,Switch } from 'react-router-dom'
import {useEffect,useState} from 'react'
import {connect} from 'react-redux'

import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth,createUserProfileDocument } from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.actions'




function App(props) {

  let {setCurrentUser} = props;

  // const [appAuth,setAppAuth] = useState(null);

  useEffect(()=>{
    
  let unsubscribeFromAuth = auth.onAuthStateChanged(authUser=>{
      // setAppAuth(user);
      if(authUser) {
        createUserProfileDocument(authUser)
        .then(userRef=>{
          userRef.onSnapshot(snapshot=>{
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
          })
        })

     
      } else {
        setCurrentUser(authUser);
      }
    
      // console.log(user);
    });

    return unsubscribeFromAuth;

  },[])


  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={Shop} />
        <Route path='/sign-in' component={SignInAndSignUpPage} />
      </Switch>
      
    </div>
  );
}

const mapDispatchToProps = dispatch=>({
  setCurrentUser:(user)=>dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);
