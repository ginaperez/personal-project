import React, { Component } from 'react';
import axios from 'axios';
import API from '../../api';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import App from '../../App';
import { withRouter } from 'react-router-dom';
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
        const loggedInUser = await axios.post(API.register, {
            email: registerEmail,
            password: registerPassword
        });
        this.props.setUser(loggedInUser.data);
        console.log(loggedInUser);
    }
    
    async login() {
        const { loginEmail, loginPassword } = this.state;
        const loggedInUser = await axios.post(API.login, {
            email: loginEmail,
            password: loginPassword
        });
        this.props.setUser(loggedInUser.data);
        console.log(loggedInUser)
    }
    
    async logout() {
        // const { email, user_id } = this.state;
        const loggedInUser = await axios.post(API.logout, {});
    
        this.props.setUser(loggedInUser);
        console.log(loggedInUser);
    }
    

    render() {
        const { loginEmail, loginPassword, registerEmail, registerPassword, } = this.state;
        return (
            <div className="main-area">
                <div className='auth-container'>
                    <div className='login-input-container'>
                        <form onSubmit={e => { e.preventDefault(); this.login(); }}>
                                <h2 className='title'>Sign In</h2>
                                <h3 className='subtext'>Text</h3>
                                <label for='email'>Email: </label>
                                <input type="email" value={loginEmail} onChange={(e) => this.setState({ loginEmail: e.target.value })} />
                                <label for='password'>Password: </label>
                                <input type="password" value={loginPassword} onChange={(e) => this.setState({ loginPassword: e.target.value })} />
                            <button className="login-input-button">Login</button>
                        </form>
                    </div>
                    <div className='register-input-container'>
                        <form onSubmit={e => { e.preventDefault(); this.register(); }}>
                                <h2 className='title'>Register</h2>
                                <h3 className='subtext'>Text</h3>
                                <label for='email'>Email: </label>
                                <input type="email" value={registerEmail} onChange={(e) => this.setState({ registerEmail: e.target.value })} />
                                <label for='password'>Password: </label>
                                <input type="password" value={registerPassword} onChange={(e) => this.setState({ registerPassword: e.target.value })} />
                            <button className="register-input-button">Register</button>
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
	setUser
};

const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps)

export default invokedConnect(AuthComponent);
