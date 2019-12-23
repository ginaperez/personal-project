import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import axios from 'axios';
import logo from '../../../src/logo';
import './Header.scss';

function Header(props) {
    const [ show, setShow ] = useState(false);

    const toggler = () => {
        setShow(!show);
    };

    return (
        <div className='header-main'>
            <div className='header-contents'>
                <NavLink to='/' onClick={() => {props.setSidebar(false)}}>
                    <img className={props.sidebar ? 'moved' : 'logo'} src={logo} alt='logo'/>
                </NavLink>
                <span className='navbar'>
                    {props.user ? (
                        <button className='toggler' onClick={toggler}>
                            <img className='toggle-img' src={props.user.image} alt={`${props.user.username} Image`} />
                        </button>
                    ) : (
                        <NavLink className='nav' to='/login-register'>
                            {props.title}
                        </NavLink>
                    )}

                    {props.user && (
                        <div className={show ? 'show' : ""}>
                            <NavLink className='nav' onClick={() => toggler()} to='/dashboard'>
                                Dashboard
                            </NavLink>
                            <NavLink className='nav' onClick={() => {
                                toggler();
                                props.setSidebar(false);
                            }}
                            to='/profile'>
                                My Account
                            </NavLink>
                            <button className='logout' onClick={() => {
                                axios.delete('/auth/logout').then(() => {
                                    props.setUser(null);
                                });
                                toggler();
                            }}>
                            Logout
                        </button>
                        </div>
                    )}
                </span>
            </div>
        </div>
    );
}

function mapReduxStateToProps(reduxState) {
    return reduxState;
}

const mapDispatchToProps = {
    setUser,
};

const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

export default invokedConnect(Header);