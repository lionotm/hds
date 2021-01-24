import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/nav/Navbar';
import Home from './components/Home';
import Booking from './components/Booking';
import Admin from './components/Admin';
import { Auth, Hub } from 'aws-amplify';


function App() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false)

  const checkUser = () => {
    Auth.currentAuthenticatedUser()
      .then(user => console.log(user))
      .catch(err => console.log(err))
  }

  const signOut = () => {
    Auth.signOut()
      .then(data => {
        console.log(data)
        setSignedIn(false)
      })
      .catch(err => console.log(err))
  }

  const signIn = () => {
    Auth.federatedSignIn()
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(user => {
            setUserId(user.attributes.sub)
            setUserName(user.username)
            setSignedIn(true)
          });
          break;
        case 'signOut':
          setUserId("")
          setUserName("")
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }


  return (
    <div className="bgimage">
      <div>
        <button onClick={checkUser}>Check User</button>
        <Router>
          <Navbar
            signIn={signIn}
            signOut={signOut}
            userId={userId}
            userName={userName}
            signedIn={signedIn}
          />
          <Switch>
            <Route path='/' exact component={() =>
              <Home userName={userName} signedIn={signedIn} />} />
            <Route path='/bookings' exact component={() =>
              <Booking userId={userId} userName={userName} />}
            />
            <Route path='/admin' exact component={Admin} />
          </Switch>
        </Router>
      </div >

    </div>
  );
}

export default App;

