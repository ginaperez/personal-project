import React, { Component } from 'react';

import { FaSignOutAlt } from 'react-icons/fa';

import { connect } from 'react-redux';
import { signout } from '../../src/redux/reducer';

class SignOut extends Component {
    render() {
        const { signout, history } = this.props;
        return (
            <div id="SignOut_parent" onClick={() => signout(history)}>
                <span><FaSignOutAlt id="SignOutIcon" /> Sign Out</span>
            </div>
        )
    }
}

export default connect(state => state, { signout })(SignOut);
