import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, logOutUser } from '../../redux/reducer';
import logo from '../../photos/FurnLogo.png';
import axios from 'axios';
import './Header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: false
        }
    this.logout = this.logout.bind(this);
    this.toggler = this.toggler.bind(this);
}

    toggler() {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle
            };
        });
    }

    logout() {
        axios.delete('/api/logout').then(res => {
            this.props.logOutUser();
        });
    }

    render() {
        return (
            <header className='header'>
                <div className='divider'>
                <div className='head'>
                    <NavLink to='/'>
                        <img className='logo' src={logo} alt='logo'></img>
                    </NavLink>

                    {!this.props.user ? (
                        <nav className={this.state.toggle ? 'show' : ''}>
                            <NavLink className='navlink' to='/products'>Products</NavLink>
                            <NavLink className='navlink' to='/cart'>Cart</NavLink>
                            <NavLink className='navlink' to='/login-register'>Login</NavLink>
                        </nav>
                    ) : (
                        <nav className={this.state.toggle ? 'show' : ''}>
                            <NavLink className='navlink' to='/products'>Products</NavLink>
                            <NavLink className='cart' to='/cart'>Cart</NavLink>
                            <NavLink className='navlink' to='/purchase_history'>Purchase History</NavLink>
                            <NavLink className='navlink' onClick={() => this.logout()} to='/logout'>Logout</NavLink>
                        </nav>
                    )}
                </div>
                </div>
            </header>
        );
    }

}

function mapReduxStateToProps(reduxState) {
    return reduxState;
}

const mapDispatchToProps = {
    setUser,
    logOutUser
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Header);