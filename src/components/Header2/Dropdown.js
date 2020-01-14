import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import { FaAngleDown } from 'reac-icons/fa';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: false
        };
    }

    logout() {
        axios.delete('/api/logout').then(res => {
            this.props.logOutUser();
        })
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu)
        });
    }

    closeMenu() {
        this.setState({showMenu: false}, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.showMenu} className='user-profile'>
                    {this.props.user.email}
                    <FaAngleDown className="arrow-down" />
                </NavLink>

                {this.state.showMenu ? (
                    <div>
                        <NavLink activeClassName="none" to="/purchase_history">Purchase History</NavLink>
                        <NavLink onClick={() => this.logout()} activeClassName="none" to="/">Logout</NavLink>
                    </div>
                ) : null}
            </div>
        );
    }
}

function mapReduxStateToProps(reduxState) {
    return reduxState;
};

const mapDispatchToProps = {
    setUser,
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Dropdown);