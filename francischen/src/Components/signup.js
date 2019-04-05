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

    // https://tylermcginnis.com/react-router-programmatically-navigate/
    onSubmit = e => {
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(`https://localhost:5000/api/register`, { user })
        .then(() => console.log("You have successfully registered"))
        .catch(err => console.log(err));
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
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
 