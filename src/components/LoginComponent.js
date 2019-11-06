import React, { Component } from 'react';
import axios from 'axios';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    render() {
        const { email, password } = this.state;
        return (<div>Login</div>)
    }
};


export default LoginComponent;