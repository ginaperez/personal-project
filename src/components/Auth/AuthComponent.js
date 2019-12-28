import React, { Component } from 'react';
import axios from 'axios';
import API from '../../api';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import App from '../../App';
import { withRouter } from 'react-router-dom';

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
        const session = await axios.post(API.register, {
            email: registerEmail,
            password: registerPassword
        });
        this.setState({ session: session.data });
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
        const { session } = this.state;
        const destroyedSession = await axios.post(API.logout, {});
    
        this.setState({ session: { email: "", user_id: null } });
    }
    

    render() {
        const { loginEmail, loginPassword, registerEmail, registerPassword, } = this.state;
        return (
            <div className="main-area">
            <div className='auth-container'>
                <form onSubmit={e => { e.preventDefault(); this.login(); }}>
                    <div className='login-input-container'>
                        <label>Email: </label>
                        <input type="email" value={loginEmail} onChange={(e) => this.setState({ loginEmail: e.target.value })} />
                    </div>
                    <div className='login-input-container'>
                        <label>Password: </label>
                        <input type="password" value={loginPassword} onChange={(e) => this.setState({ loginPassword: e.target.value })} />
                    </div>
                    <button className="login-input-button">Login</button>
                </form>
                <form onSubmit={e => { e.preventDefault(); this.register(); }}>
                    <div className="register-input-container">
                        <label>Email: </label>
                        <input type="email" value={registerEmail} onChange={(e) => this.setState({ registerEmail: e.target.value })} />
                    </div>
                    <div className="register-input-container">
                        <label>Password: </label>
                        <input type="password" value={registerPassword} onChange={(e) => this.setState({ registerPassword: e.target.value })} />
                    </div>
                    <button className="register-input-button">Register</button>
                </form>
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
