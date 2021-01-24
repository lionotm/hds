import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/nav/Navbar';
import Home from './components/Home';
import Booking from './components/Booking';
import AdminCreateResource from './components/AdminCreateResource';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/bookings' exact component={Booking} />
          <Route path='/admin-create-resources' exact component={AdminCreateResource} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
