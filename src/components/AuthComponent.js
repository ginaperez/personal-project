import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../ducks/reducer';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class AuthComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            register: true
        };
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    async register() {
        const { email, password, firstName, lastName } = this.state;
        const registeredUser = await axios.post('/auth/login', {
            firstName,
            lastName,
            email,
            password
        });
        this.props.setUser(registeredUser.data);
    }
    async login() {
        const { email, password } = this.state;
        const loggedInUser = await axios.post('/auth/login', {
            email,
            password
        });
        this.props.setUser(loggedInUser.data);
    }

    render() {
        return <div>AuthComponent</div>
    }
};

function mapReduxStateToProps(reduxState) {
    return reduxState;
}

const mapDispatchToProps = {
    setUser
}

const enhancedComponent = connect(mapReduxStateToProps, mapDispatchToProps);

export default enhancedComponent(AuthComponent);