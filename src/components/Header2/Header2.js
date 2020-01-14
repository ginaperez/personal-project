import React from 'react';
import '.Header2.scss';
import logo from '../../photos/FurnLogo';
import { connect } from 'react-redux';
import { setUser, logOutUser } from '../../redux/reducer';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';

class Header2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
        this.toggler = this.toggler.bind(this);
        this.logout = this.logout.bind(this);
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
            <header className='header2'>
                <div className='head2'>
                    <NavLink to='/'>
                        <img className='logo2' src={logo} alt='logo'></img>
                    </NavLink>
                    <button onClick={this.toggler} className='menu2'>
                        <FaBars className='menu-icon2' />
                    </button>

                    {!this.props.user ? (
                        <nav className={this.state.toggle ? "show2" : ""}>
                            <NavLink activeClassName="active" to='/products'>Products</NavLink>
                            <NavLink activeClassName="active" to='/cart'>Cart</NavLink>
                            <NavLink activeClassName="active" to='/login-register'>Login</NavLink>
                        </nav>
                    ) : (
                        <nav className={this.state.toggle ? "show2" : ""}>
                            <NavLink activeClassName="active" to="/products">Products</NavLink>
                            <NavLink activeClassName="active" to="/cart">Cart</NavLink>
                            <NavLink activeClassName="active" to="/purchase_history">Purchase History</NavLink>
                            <NavLink onClick={() => this.logout()} activeClassName="none" to="/">Logout</NavLink>
                        </nav>
                    )
                }
                </div>
            </header>
        );
    }
}

function mapReduxStateToProps(reduxState) {
    return reduxState;
};

const mapDispatchToProps = {
    setUser,
    logOutUser
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Header2); 