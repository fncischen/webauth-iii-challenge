import React, { Component } from 'react';
import axios from 'axios';

export default class SignIn extends Component {
    
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
        <div className="SignIn">
            <form onSubmit={this.onSubmit}>
                <label>Username:</label>
                <input text="text" name="username" onChange={this.handleChange}></input>

                <label>Password:</label>
                <input text="text" name="password" onChange={this.handleChange}></input>
                <button type="submit">Sign In</button>
            </form>
        </div>
        )

    }
}
 