import React from 'react';

import UserIcon from 'recct-icons/lib/fa/user';

import { connect } from 'react-redux';

function User({ user }) {
    return (
        <div id="User_parent">
            <UserIcon id="User)icon" />
            <span>{ user || 'Guest' }</span>
        </div>
    )
}

export default connect(state => state)(User);