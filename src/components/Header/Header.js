import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import axios from 'axios';
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
            </div>
        </div>
    )
}

function mapReduxStateToProps(reduxState) {
    return reduxState;
}

const mapDispatchToProps = {
    setUser,
};

const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

export default invokedConnect(Header);