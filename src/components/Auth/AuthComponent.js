import React, { Component } from 'react';
import axios from 'axios';
import API from '../../api';
import { connect } from 'react-redux';
import { setUser, setRegisterMessage, setLoginMessage } from '../../redux/reducer';
import { Redirect } from 'react-router-dom';
import './AuthComponent.scss';

class AuthComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: "",
			registerPassword: "",
			loginEmail: "",
			loginPassword: "",
			session: {
				email: "",
				user_id: null
			}
        }
        this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
    }

    async register() {
        const { registerEmail, registerPassword } = this.state;
        var loggedInUser
        try {
            loggedInUser = await axios.post(API.register, {
                email: registerEmail,
                password: registerPassword
            });
            this.props.setUser(loggedInUser.data);
            // clear the registration message
            this.props.setRegisterMessage("");
        } catch (err) {
            // inform the user why the registration attempt failed
            this.props.setRegisterMessage(loggedInUser);
        }
    }
    
    async login() {
        const { loginEmail, loginPassword } = this.state;
        var loggedInUser;
        try {
            loggedInUser = await axios.post(API.login, {
                email: loginEmail,
                password: loginPassword
            });
            this.props.setUser(loggedInUser.data);
            this.props.setLoginMessage("");
        } catch (err) {
            this.props.setLoginMessage(loggedInUser);
        }
    }
    
    async logout() {
        const loggedInUser = await axios.post(API.logout, {});
        this.props.setUser(loggedInUser);
    }
    

    render() {
        const { loginEmail, loginPassword, registerEmail, registerPassword, loginMessage, registerMessage } = this.state;
        return this.props.user ? (
            <Redirect to='/products' />
        ) : (
            <div className="main-area">
                <div className='auth-container'>
                    <div className='input-container'>
                        <form onSubmit={e => { e.preventDefault(); this.login(); }}>
                                <h2 className='title'>Sign In</h2>
                                <h3 className='subtext'>Sign in below to access your account.</h3>
                                <label htmlFor="email">Email: </label>
                                <input id="login-email" autoComplete="username" type="email" value={loginEmail} onChange={(e) => this.setState({ loginEmail: e.target.value })} />
                                <label htmlFor="password">Password: </label>
                                <input id="login-password" autoComplete="current-password" type="password" value={loginPassword} onChange={(e) => this.setState({ loginPassword: e.target.value })} />
                            <button className="input-button">Login</button>
                        </form>
                        {loginMessage}
                    </div>
                    <div className='input-container'>
                        <form onSubmit={e => { e.preventDefault(); this.register(); }}>
                                <h2 className='title'>Register</h2>
                                <h3 className='subtext'>Don't have an account? Register below.</h3>
                                <label htmlFor="email">Email: </label>
                                <input id="register-email" autoComplete="username" type="email" value={registerEmail} onChange={(e) => this.setState({ registerEmail: e.target.value })} />
                                <label htmlFor="password">Password: </label>
                                <input id="register-password" autoComplete="new-password" type="password" value={registerPassword} onChange={(e) => this.setState({ registerPassword: e.target.value })} />
                            <button className="input-button">Register</button>
                            {registerMessage}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapReduxStateToProps(reduxState) {
	return reduxState
}

const mapDispatchToProps = {
    setUser,
    setRegisterMessage,
    setLoginMessage
};

const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps)

export default invokedConnect(AuthComponent);
