import React, { Component } from 'react';

// import SignOutIcon from 'react-icons/lib/fa/sign-out';

import { connect } from 'react-redux';
import { signout } from '../../redux/reducer';

class SignOut extends Component {
    render() {
        const { signout, history } = this.props;
        return (
            <div id="SignOut_parent" onClick={() => signout(history)}>
                {/* <SignOutIcon id="SignOutIcon" /> */}
                <span>Sign Out</span>
            </div>
        )
    }
}

export default connect(state => state, { signout })(SignOut);