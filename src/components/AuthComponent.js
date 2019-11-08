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
        const { email, password, firstName, lastName, register } = this.state;
        return this.props.user ? ( <Redirect to="/my_orders" /> ) : (
            <div className='auth-container'>
                <form onSubmit={e => {
                    e.preventDefault();
                    if(register) {
                        this.register();
                    } else {
                        this.login();
                    }
                }}
                >
                    {register && (
                        <div className='input-container'>
                            <label>First Name: </label>
                            <input value={firstName} onChange={(e) => this.setState({
                                firstName: e.target.value
                            })
                        }
                        />
                        </div>
                        )}
                        <div className='input-container'>
                            <label>Last Name: </label>
                            <input value={lastName} onChange={(e) => this.setState({
                                lastName: e.target.value
                            })
                        }
                        />
                        </div>
                        <div className='input-container'>
                            <label>Email: </label>
                            <input type="email" value={email} onChange={(e) => this.setState ({
                                email: e.target.value
                            })}
                        />
                        </div>
                        <div className='input-container'>
                            <label>Password: </label>
                            <input type="password" value={password} onChange={(e) => this.setState({
                                password: e.target.value
                            })}
                        />
                        </div>
                    <button>{register ? "Register" : "Login"}</button>
                </form>
                <form onSubmit={e => {
                    e.preventDefault();
                    if(register) {
                        this.register();
                    } else {
                        this.login();
                    }
                }}
                >
                    <div className="login-input-container">
                        <label>Email: </label>
                        <input type="email" value={email} onChange={(e) => this.setState({
                            email: e.target.value
                        })} />
                    </div>
                    <div className="login-input-container">
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(e) => this.setState({
                            password: e.target.value
                        })} />
                    </div>
                    <button>Login</button>
                </form>
            </div>
            
        )
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