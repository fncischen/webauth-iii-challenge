import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {SignIn} from "./Components/signin.js";
import {SignUp} from "./Components/signup.js";
import {Users} from "./Components/users.js";
import {Home} from "./Components/home.js";

class App extends Component {

  constructor(props) {
    
  }

  render() {
    return (
      <div className="App">

        <nav>
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/users">Users</Link>
        </nav>


        <Route path="/" exact Component={Home}/>
        <Route path="/signin" exact Component={SignIn}/>
        <Route path="/signup" exact Component={SignUp}/>
        
        <Route path="/users" exact Component={Users}/>
      </div>
    );
  }
}

export default App;
