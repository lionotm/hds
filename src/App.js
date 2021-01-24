import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/nav/Navbar';
import Home from './components/Home';
import Booking from './components/Booking';
import Admin from './components/Admin';

import { Auth } from 'aws-amplify';

function App() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [signedIn, setSignedIn] = useState(false)

  const checkUser = () => {
    Auth.currentAuthenticatedUser()
      .then(user => console.log(user.attributes.sub))
      .catch(err => console.log(err))
  }

  const signOut = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  const signIn = () => {
    Auth.federatedSignIn()
      .then(user => {
        setUserId(user.attributes.sub)
        setUserName(user.username)
        console.log(userId)
      })
      .catch(err => console.log(err))
  }


  return (
    <div>
      <button onClick={signIn}>Sign In</button>
      <button onClick={checkUser}>Check User</button>
      <button onClick={signOut}>Sign Out</button>
      <Router>
        <Navbar
          signOut={signOut}
          userId={userId}
          userName={userName}
        />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/bookings' exact component={() =>
            <Booking userId={userId} userName={userName} />}
          />
          <Route path='/admin' exact component={Admin} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;

