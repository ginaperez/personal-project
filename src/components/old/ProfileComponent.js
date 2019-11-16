import React, { Component } from 'react';
import Axios from 'axios';

class ProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myOrders: []
        }
    }
    componentDidMount(){
        if(this.props.user){
            Axios.get('/api/view_cart').then(res => {
                console.log(res.data)
            })
        } else {
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <div>My Orders</div>
        )
    }
}

export default ProfileComponent;