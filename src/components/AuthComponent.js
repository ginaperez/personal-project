import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../ducks/reducer';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class AuthComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div>AuthComponent</div>
    }
};

export default AuthComponent;