import React, { Component } from 'react';

class ProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myOrders: []
        }
    }
    render() {
        return (
            <div>My Orders</div>
        )
    }
}

export default ProfileComponent;