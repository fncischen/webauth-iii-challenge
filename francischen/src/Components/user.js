import React, { Component } from 'react';

export default class User extends Component  {

    render() {
        return(
            <div className="User">
                {this.props.user.username}
            </div>
        )
    }
}