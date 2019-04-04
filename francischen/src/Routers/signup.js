import React, { Component } from 'react';
import axios from 'axios';

export default class SignUp extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
        }
    }

    onSubmit = e => {

    }

    handleChange = e => {

    }

    render() {    
        
        return(
        <div className="SignUp">
            <form onSubmit={this.onSubmit}>
                <label>Username:</label>
                <input type="text" name="username" onChange={this.handleChange}></input>
                
                <label>Password:</label>
                <input type="text" name="password" onChange={this.handleChange}></input>
            
                <button type="submit">Register</button>
            </form>
        </div>
        )

    }
}
 