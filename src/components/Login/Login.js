import React from 'react';

import { connect } from 'react-redux';
import { login, register } from "../../redux/reducer";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.proceedAsGuest = this.proceedAsGuest.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login() {
        const { login, history } = this.props;
        const { email, password } = this.state;
        login({ email, password }, history);
    }

    register() {
        const { register, history } = this.props;
        const { email, password } = this.state;
        register({ email, password }, history);
    }

    proceedAsGuest() {
        const { history } = this.props;
        history.push('/shop');
    }

    handleChange( prop, val ) {
        this.setState({ [prop]: val });
    }

    render() {
        return (
            <div id="Login_parent">
                <div id="Login_child">
                    <input className="Login_input" type="text" placeholder="Email" onChange={(e) => this.handleChange('email', e.target.value)} />
                    <input className="Login_input" type="password" placeholder="Password" onChange={(e) => this.handleChange('password', e.target.value)} />
                    <div>
                        <button className="Login_btn" id="Login_loginBtn" onClick={ this.login }>Login </button>
                        <button className="Login_btn" id="Login_registerBtn" onClick={this.register}>Register </button>
                    </div>
                    <span id="Login_GuestLink" onClick={ this.proceedAsGuest }>Continue As Guest</span>
                </div>
            </div>
        )
    }
}

export default connect( state => state, {login, register})(Login);