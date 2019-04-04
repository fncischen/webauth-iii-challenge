import React, { Component } from 'react';
import axios from 'axios';
import {User} from "./users.js";

export default class Users extends Component  {

    constructor() {
        this.state = {
            users: []
        }
    }

    onSignOut = e => {
        
    }

    componentDidMount() {

        axios.get("https://localhost:5000/api/users")
            .then(listOfUsers => {this.setState({ users: listOfUsers })})
            .catch(err => console.log("We cannot retrieve users!"));
    }

    render() {
        return(
            <div className="Users">
                Welcome to the restricted users section!
                {
                    this.state.users.map(a_user => {
                        <User user={a_user} />
                    })
                }  

                <button onClick={this.onSignOut}>Sign Out</button>
            </div>
        )
    }
}
